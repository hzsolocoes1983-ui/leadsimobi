/**
 * Sistema de Scoring Inteligente de Leads
 * Análise automática com múltiplos critérios
 */

export interface LeadScoreFactors {
  // Dados financeiros
  income: number;
  creditScore: number;
  hasRestrictions: boolean;
  debtToIncomeRatio: number;
  downPaymentAvailable: number;
  
  // Engajamento
  responseTime: number; // em minutos
  interactionCount: number;
  lastContactDays: number;
  
  // Interesse
  interestLevel: 'low' | 'medium' | 'high';
  urgencyLevel: 'low' | 'medium' | 'high';
  propertyViewCount: number;
  
  // Documentação
  documentsCompleted: number;
  totalDocumentsRequired: number;
  
  // Qualificação
  hasStableJob: boolean;
  timeAtJob: number; // em meses
  propertyBudgetMatch: boolean;
}

export interface LeadScore {
  totalScore: number; // 0-100
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  color: 'green' | 'yellow' | 'orange' | 'red';
  status: 'hot' | 'warm' | 'cold';
  conversionProbability: number; // 0-100
  breakdown: {
    financial: number;
    engagement: number;
    interest: number;
    documentation: number;
    qualification: number;
  };
  recommendations: string[];
  nextActions: string[];
}

/**
 * Calcular score financeiro (0-25 pontos)
 */
function calculateFinancialScore(factors: LeadScoreFactors): number {
  let score = 0;
  
  // Score de crédito (0-10 pontos)
  if (factors.creditScore >= 800) score += 10;
  else if (factors.creditScore >= 700) score += 8;
  else if (factors.creditScore >= 600) score += 6;
  else if (factors.creditScore >= 500) score += 4;
  else if (factors.creditScore >= 400) score += 2;
  
  // Restrições (-5 pontos se tiver)
  if (factors.hasRestrictions) score -= 5;
  
  // Comprometimento de renda (0-5 pontos)
  if (factors.debtToIncomeRatio < 20) score += 5;
  else if (factors.debtToIncomeRatio < 30) score += 4;
  else if (factors.debtToIncomeRatio < 40) score += 3;
  else if (factors.debtToIncomeRatio < 50) score += 2;
  
  // Entrada disponível (0-5 pontos)
  if (factors.downPaymentAvailable > 0) {
    score += Math.min(5, Math.floor(factors.downPaymentAvailable / 50000));
  }
  
  // Renda (0-5 pontos)
  if (factors.income >= 20000) score += 5;
  else if (factors.income >= 10000) score += 4;
  else if (factors.income >= 5000) score += 3;
  else if (factors.income >= 3000) score += 2;
  else if (factors.income >= 1500) score += 1;
  
  return Math.max(0, Math.min(25, score));
}

/**
 * Calcular score de engajamento (0-25 pontos)
 */
function calculateEngagementScore(factors: LeadScoreFactors): number {
  let score = 0;
  
  // Tempo de resposta (0-10 pontos)
  if (factors.responseTime <= 5) score += 10;
  else if (factors.responseTime <= 15) score += 8;
  else if (factors.responseTime <= 30) score += 6;
  else if (factors.responseTime <= 60) score += 4;
  else if (factors.responseTime <= 120) score += 2;
  
  // Número de interações (0-10 pontos)
  if (factors.interactionCount >= 20) score += 10;
  else if (factors.interactionCount >= 10) score += 8;
  else if (factors.interactionCount >= 5) score += 6;
  else if (factors.interactionCount >= 3) score += 4;
  else if (factors.interactionCount >= 1) score += 2;
  
  // Último contato (0-5 pontos)
  if (factors.lastContactDays <= 1) score += 5;
  else if (factors.lastContactDays <= 3) score += 4;
  else if (factors.lastContactDays <= 7) score += 3;
  else if (factors.lastContactDays <= 15) score += 2;
  else if (factors.lastContactDays <= 30) score += 1;
  
  return Math.min(25, score);
}

/**
 * Calcular score de interesse (0-20 pontos)
 */
function calculateInterestScore(factors: LeadScoreFactors): number {
  let score = 0;
  
  // Nível de interesse (0-8 pontos)
  if (factors.interestLevel === 'high') score += 8;
  else if (factors.interestLevel === 'medium') score += 5;
  else if (factors.interestLevel === 'low') score += 2;
  
  // Urgência (0-7 pontos)
  if (factors.urgencyLevel === 'high') score += 7;
  else if (factors.urgencyLevel === 'medium') score += 4;
  else if (factors.urgencyLevel === 'low') score += 2;
  
  // Visualizações de imóveis (0-5 pontos)
  score += Math.min(5, factors.propertyViewCount);
  
  return Math.min(20, score);
}

/**
 * Calcular score de documentação (0-15 pontos)
 */
function calculateDocumentationScore(factors: LeadScoreFactors): number {
  if (factors.totalDocumentsRequired === 0) return 0;
  
  const percentage = (factors.documentsCompleted / factors.totalDocumentsRequired) * 100;
  
  if (percentage === 100) return 15;
  else if (percentage >= 80) return 12;
  else if (percentage >= 60) return 9;
  else if (percentage >= 40) return 6;
  else if (percentage >= 20) return 3;
  
  return 0;
}

/**
 * Calcular score de qualificação (0-15 pontos)
 */
function calculateQualificationScore(factors: LeadScoreFactors): number {
  let score = 0;
  
  // Emprego estável (0-7 pontos)
  if (factors.hasStableJob) {
    score += 7;
  }
  
  // Tempo no emprego (0-5 pontos)
  if (factors.timeAtJob >= 36) score += 5; // 3+ anos
  else if (factors.timeAtJob >= 24) score += 4; // 2+ anos
  else if (factors.timeAtJob >= 12) score += 3; // 1+ ano
  else if (factors.timeAtJob >= 6) score += 2; // 6+ meses
  else if (factors.timeAtJob >= 3) score += 1; // 3+ meses
  
  // Budget compatível (0-3 pontos)
  if (factors.propertyBudgetMatch) score += 3;
  
  return Math.min(15, score);
}

/**
 * Calcular score total do lead
 */
export function calculateLeadScore(factors: LeadScoreFactors): LeadScore {
  const breakdown = {
    financial: calculateFinancialScore(factors),
    engagement: calculateEngagementScore(factors),
    interest: calculateInterestScore(factors),
    documentation: calculateDocumentationScore(factors),
    qualification: calculateQualificationScore(factors)
  };
  
  const totalScore = Object.values(breakdown).reduce((sum, val) => sum + val, 0);
  
  // Determinar grade
  let grade: LeadScore['grade'];
  let color: LeadScore['color'];
  let status: LeadScore['status'];
  
  if (totalScore >= 85) {
    grade = 'A';
    color = 'green';
    status = 'hot';
  } else if (totalScore >= 70) {
    grade = 'B';
    color = 'green';
    status = 'warm';
  } else if (totalScore >= 55) {
    grade = 'C';
    color = 'yellow';
    status = 'warm';
  } else if (totalScore >= 40) {
    grade = 'D';
    color = 'orange';
    status = 'cold';
  } else {
    grade = 'F';
    color = 'red';
    status = 'cold';
  }
  
  // Calcular probabilidade de conversão
  const conversionProbability = Math.min(100, Math.round(totalScore * 1.2));
  
  // Gerar recomendações
  const recommendations = generateRecommendations(factors, breakdown);
  
  // Gerar próximas ações
  const nextActions = generateNextActions(factors, breakdown, status);
  
  return {
    totalScore,
    grade,
    color,
    status,
    conversionProbability,
    breakdown,
    recommendations,
    nextActions
  };
}

/**
 * Gerar recomendações baseadas no score
 */
function generateRecommendations(
  factors: LeadScoreFactors,
  breakdown: LeadScore['breakdown']
): string[] {
  const recommendations: string[] = [];
  
  // Recomendações financeiras
  if (breakdown.financial < 15) {
    if (factors.creditScore < 600) {
      recommendations.push('Orientar sobre melhoria de score de crédito');
    }
    if (factors.hasRestrictions) {
      recommendations.push('Regularizar restrições antes de prosseguir');
    }
    if (factors.downPaymentAvailable < 50000) {
      recommendations.push('Trabalhar para aumentar valor de entrada');
    }
  }
  
  // Recomendações de engajamento
  if (breakdown.engagement < 15) {
    if (factors.responseTime > 60) {
      recommendations.push('Lead pouco responsivo - intensificar contato');
    }
    if (factors.interactionCount < 5) {
      recommendations.push('Aumentar frequência de interações');
    }
    if (factors.lastContactDays > 7) {
      recommendations.push('Retomar contato urgentemente');
    }
  }
  
  // Recomendações de interesse
  if (breakdown.interest < 12) {
    recommendations.push('Identificar melhor as necessidades do cliente');
    recommendations.push('Apresentar mais opções de imóveis');
  }
  
  // Recomendações de documentação
  if (breakdown.documentation < 10) {
    recommendations.push('Solicitar documentação pendente');
    recommendations.push('Facilitar processo de envio de documentos');
  }
  
  // Recomendações de qualificação
  if (breakdown.qualification < 10) {
    if (!factors.hasStableJob) {
      recommendations.push('Verificar estabilidade profissional');
    }
    if (!factors.propertyBudgetMatch) {
      recommendations.push('Ajustar expectativas de valor do imóvel');
    }
  }
  
  return recommendations;
}

/**
 * Gerar próximas ações
 */
function generateNextActions(
  factors: LeadScoreFactors,
  breakdown: LeadScore['breakdown'],
  status: LeadScore['status']
): string[] {
  const actions: string[] = [];
  
  if (status === 'hot') {
    actions.push('Agendar visita ao imóvel');
    actions.push('Preparar proposta comercial');
    actions.push('Iniciar processo de financiamento');
  } else if (status === 'warm') {
    actions.push('Enviar mais opções de imóveis');
    actions.push('Agendar reunião de qualificação');
    actions.push('Solicitar documentação');
  } else {
    actions.push('Nutrir relacionamento');
    actions.push('Entender melhor as necessidades');
    actions.push('Educar sobre o processo de compra');
  }
  
  // Ações específicas
  if (factors.documentsCompleted < factors.totalDocumentsRequired) {
    actions.push('Coletar documentos pendentes');
  }
  
  if (factors.lastContactDays > 3) {
    actions.push('Fazer follow-up imediato');
  }
  
  return actions;
}

/**
 * Calcular score de diversidade (para visualização)
 */
export function calculateDiversityScore(leads: LeadScoreFactors[]): {
  hot: number;
  warm: number;
  cold: number;
  approved: number;
  total: number;
} {
  let hot = 0;
  let warm = 0;
  let cold = 0;
  let approved = 0;
  
  leads.forEach(lead => {
    const score = calculateLeadScore(lead);
    
    if (score.status === 'hot') hot++;
    else if (score.status === 'warm') warm++;
    else cold++;
    
    if (score.totalScore >= 70) approved++;
  });
  
  return {
    hot,
    warm,
    cold,
    approved,
    total: leads.length
  };
}
