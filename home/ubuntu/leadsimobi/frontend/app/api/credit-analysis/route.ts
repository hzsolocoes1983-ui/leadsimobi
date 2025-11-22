import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Tipos
interface CreditAnalysisRequest {
  clientId: string;
  declaredIncome: number;
  verifiedIncome: number;
  monthlyExpenses: number;
  monthlyCommitments: number;
  downPaymentAvailable: number;
  hasRestrictions: boolean;
  restrictionsDetails?: any[];
  totalDebt?: number;
  creditScore?: number;
}

interface PaymentCapacity {
  availableIncome: number;
  maxInstallment: number;
  maxPropertyValue: number;
  debtToIncomeRatio: number;
}

// Calcular capacidade de pagamento
function calculatePaymentCapacity(
  monthlyIncome: number,
  monthlyExpenses: number,
  monthlyCommitments: number,
  maxCommitmentPercentage: number = 30
): PaymentCapacity {
  const availableIncome = monthlyIncome - monthlyExpenses - monthlyCommitments;
  const maxInstallment = (monthlyIncome * maxCommitmentPercentage / 100) - monthlyCommitments;
  
  // Estimativa: 120x o valor da parcela (financiamento de 30 anos)
  const maxPropertyValue = maxInstallment * 120;
  
  const debtToIncomeRatio = monthlyIncome > 0 
    ? ((monthlyExpenses + monthlyCommitments) / monthlyIncome * 100)
    : 0;
  
  return {
    availableIncome: Math.max(0, availableIncome),
    maxInstallment: Math.max(0, maxInstallment),
    maxPropertyValue: Math.max(0, maxPropertyValue),
    debtToIncomeRatio: parseFloat(debtToIncomeRatio.toFixed(2))
  };
}

// Determinar resultado da análise
function determineAnalysisResult(
  capacity: PaymentCapacity,
  creditScore: number,
  hasRestrictions: boolean,
  totalDebt: number
): {
  result: 'approved' | 'approved_with_conditions' | 'rejected';
  riskLevel: 'low' | 'medium' | 'high';
  conditions?: string;
  rejectionReason?: string;
} {
  // Critérios de aprovação
  const hasGoodIncome = capacity.availableIncome > 0;
  const hasReasonableDebt = capacity.debtToIncomeRatio < 50;
  const hasGoodScore = creditScore >= 600;
  const noRestrictions = !hasRestrictions;
  
  // Aprovado
  if (hasGoodIncome && hasReasonableDebt && hasGoodScore && noRestrictions) {
    return {
      result: 'approved',
      riskLevel: 'low'
    };
  }
  
  // Aprovado com condições
  if (hasGoodIncome && hasReasonableDebt && (hasGoodScore || noRestrictions)) {
    let conditions = [];
    
    if (creditScore < 600) {
      conditions.push('Score de crédito abaixo do ideal');
    }
    if (hasRestrictions) {
      conditions.push('Possui restrições no nome');
    }
    if (capacity.debtToIncomeRatio > 35) {
      conditions.push('Comprometimento de renda acima de 35%');
    }
    
    return {
      result: 'approved_with_conditions',
      riskLevel: creditScore >= 500 ? 'medium' : 'high',
      conditions: conditions.join('; ')
    };
  }
  
  // Reprovado
  let rejectionReasons = [];
  
  if (!hasGoodIncome) {
    rejectionReasons.push('Renda insuficiente');
  }
  if (capacity.debtToIncomeRatio >= 50) {
    rejectionReasons.push('Comprometimento de renda muito alto');
  }
  if (creditScore < 400) {
    rejectionReasons.push('Score de crédito muito baixo');
  }
  if (hasRestrictions && totalDebt > capacity.availableIncome * 12) {
    rejectionReasons.push('Dívidas muito altas');
  }
  
  return {
    result: 'rejected',
    riskLevel: 'high',
    rejectionReason: rejectionReasons.join('; ')
  };
}

// POST - Criar análise de crédito
export async function POST(request: NextRequest) {
  try {
    const data: CreditAnalysisRequest = await request.json();
    
    // Validações
    if (!data.clientId || !data.declaredIncome || !data.verifiedIncome) {
      return NextResponse.json(
        { error: 'Dados obrigatórios faltando' },
        { status: 400 }
      );
    }
    
    // Calcular capacidade de pagamento
    const capacity = calculatePaymentCapacity(
      data.verifiedIncome,
      data.monthlyExpenses,
      data.monthlyCommitments
    );
    
    // Determinar resultado
    const creditScore = data.creditScore || 500; // Score padrão se não informado
    const analysis = determineAnalysisResult(
      capacity,
      creditScore,
      data.hasRestrictions,
      data.totalDebt || 0
    );
    
    // Calcular recomendações
    const recommendedDownPaymentPercentage = analysis.riskLevel === 'low' ? 20 : 30;
    const recommendedPropertyValueMin = capacity.maxPropertyValue * 0.5;
    const recommendedPropertyValueMax = capacity.maxPropertyValue;
    const recommendedFinancingTerm = analysis.riskLevel === 'low' ? 360 : 300; // meses
    
    // Validade da análise (90 dias)
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 90);
    
    // Inserir no banco
    const result = await query(
      `INSERT INTO credit_analysis (
        client_id,
        credit_score,
        credit_status,
        has_restrictions,
        restrictions_details,
        total_debt,
        declared_income,
        verified_income,
        monthly_expenses,
        monthly_commitments,
        available_income,
        debt_to_income_ratio,
        max_installment_value,
        max_property_value,
        down_payment_available,
        analysis_result,
        approval_conditions,
        rejection_reason,
        risk_level,
        recommended_property_value_min,
        recommended_property_value_max,
        recommended_down_payment_percentage,
        recommended_financing_term,
        valid_until
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
      RETURNING *`,
      [
        data.clientId,
        creditScore,
        data.hasRestrictions ? 'restricted' : 'clean',
        data.hasRestrictions,
        JSON.stringify(data.restrictionsDetails || []),
        data.totalDebt || 0,
        data.declaredIncome,
        data.verifiedIncome,
        data.monthlyExpenses,
        data.monthlyCommitments,
        capacity.availableIncome,
        capacity.debtToIncomeRatio,
        capacity.maxInstallment,
        capacity.maxPropertyValue,
        data.downPaymentAvailable,
        analysis.result,
        analysis.conditions || null,
        analysis.rejectionReason || null,
        analysis.riskLevel,
        recommendedPropertyValueMin,
        recommendedPropertyValueMax,
        recommendedDownPaymentPercentage,
        recommendedFinancingTerm,
        validUntil.toISOString().split('T')[0]
      ]
    );
    
    return NextResponse.json({
      success: true,
      analysis: result.rows[0],
      capacity
    });
    
  } catch (error) {
    console.error('Erro ao criar análise de crédito:', error);
    return NextResponse.json(
      { error: 'Erro ao processar análise de crédito' },
      { status: 500 }
    );
  }
}

// GET - Buscar análise de crédito
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('clientId');
    
    if (!clientId) {
      return NextResponse.json(
        { error: 'clientId é obrigatório' },
        { status: 400 }
      );
    }
    
    // Buscar análise mais recente e válida
    const result = await query(
      `SELECT * FROM credit_analysis 
       WHERE client_id = $1 
       ORDER BY created_at DESC 
       LIMIT 1`,
      [clientId]
    );
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Análise não encontrada' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      analysis: result.rows[0]
    });
    
  } catch (error) {
    console.error('Erro ao buscar análise de crédito:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar análise de crédito' },
      { status: 500 }
    );
  }
}
