import { NextRequest, NextResponse } from 'next/server';
import { query, transaction } from '@/lib/db';

// POST - Criar novo cliente
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validações básicas
    if (!data.full_name || !data.cpf || !data.phone || !data.birth_date) {
      return NextResponse.json(
        { error: 'Dados obrigatórios faltando' },
        { status: 400 }
      );
    }
    
    // Verificar se CPF já existe
    const existingClient = await query(
      'SELECT id FROM clients WHERE cpf = $1',
      [data.cpf]
    );
    
    if (existingClient.rows.length > 0) {
      return NextResponse.json(
        { error: 'CPF já cadastrado' },
        { status: 409 }
      );
    }
    
    // Inserir cliente e criar checklist de documentos
    const result = await transaction(async (client) => {
      // Inserir cliente
      const clientResult = await client.query(
        `INSERT INTO clients (
          full_name, cpf, rg, rg_issuer, rg_issue_date, birth_date,
          nationality, marital_status, gender,
          spouse_name, spouse_cpf, spouse_rg, spouse_birth_date, spouse_phone,
          email, phone, phone_secondary, whatsapp,
          address_street, address_number, address_complement, address_neighborhood,
          address_city, address_state, address_zip_code, residence_type, time_at_residence,
          occupation, company_name, company_cnpj, company_phone,
          employment_type, time_at_job, monthly_income, other_income, other_income_source,
          spouse_occupation, spouse_company, spouse_monthly_income,
          dependents_count, dependents_details, references,
          registration_status, created_by, assigned_to, notes, lead_id
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
          $21, $22, $23, $24, $25, $26, $27, $28, $29, $30,
          $31, $32, $33, $34, $35, $36, $37, $38, $39, $40,
          $41, $42, $43, $44, $45, $46
        ) RETURNING *`,
        [
          data.full_name, data.cpf, data.rg, data.rg_issuer, data.rg_issue_date, data.birth_date,
          data.nationality || 'Brasileira', data.marital_status, data.gender,
          data.spouse_name, data.spouse_cpf, data.spouse_rg, data.spouse_birth_date, data.spouse_phone,
          data.email, data.phone, data.phone_secondary, data.whatsapp,
          data.address_street, data.address_number, data.address_complement, data.address_neighborhood,
          data.address_city, data.address_state, data.address_zip_code, data.residence_type, data.time_at_residence,
          data.occupation, data.company_name, data.company_cnpj, data.company_phone,
          data.employment_type, data.time_at_job, data.monthly_income, data.other_income, data.other_income_source,
          data.spouse_occupation, data.spouse_company, data.spouse_monthly_income,
          data.dependents_count || 0, JSON.stringify(data.dependents_details || []), JSON.stringify(data.references || []),
          'incomplete', data.created_by, data.assigned_to, data.notes, data.lead_id
        ]
      );
      
      const newClient = clientResult.rows[0];
      
      // Criar checklist padrão de documentos
      await client.query(
        'SELECT create_default_document_checklist($1)',
        [newClient.id]
      );
      
      return newClient;
    });
    
    return NextResponse.json({
      success: true,
      client: result
    }, { status: 201 });
    
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    return NextResponse.json(
      { error: 'Erro ao criar cliente' },
      { status: 500 }
    );
  }
}

// GET - Listar clientes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const assignedTo = searchParams.get('assignedTo');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;
    
    let whereConditions = [];
    let params: any[] = [];
    let paramIndex = 1;
    
    if (status) {
      whereConditions.push(`c.registration_status = $${paramIndex}`);
      params.push(status);
      paramIndex++;
    }
    
    if (assignedTo) {
      whereConditions.push(`c.assigned_to = $${paramIndex}`);
      params.push(assignedTo);
      paramIndex++;
    }
    
    if (search) {
      whereConditions.push(`(
        c.full_name ILIKE $${paramIndex} OR 
        c.cpf ILIKE $${paramIndex} OR 
        c.email ILIKE $${paramIndex} OR 
        c.phone ILIKE $${paramIndex}
      )`);
      params.push(`%${search}%`);
      paramIndex++;
    }
    
    const whereClause = whereConditions.length > 0 
      ? 'WHERE ' + whereConditions.join(' AND ')
      : '';
    
    // Buscar clientes
    const result = await query(
      `SELECT 
        c.*,
        u.name as assigned_to_name,
        ca.analysis_result,
        ca.credit_score,
        ca.max_property_value,
        (SELECT COUNT(*) FROM document_checklist dc WHERE dc.client_id = c.id AND dc.is_required = true) as total_required_docs,
        (SELECT COUNT(*) FROM document_checklist dc WHERE dc.client_id = c.id AND dc.is_required = true AND dc.status = 'approved') as approved_docs
       FROM clients c
       LEFT JOIN users u ON c.assigned_to = u.id
       LEFT JOIN credit_analysis ca ON c.id = ca.client_id AND ca.is_valid = true
       ${whereClause}
       ORDER BY c.created_at DESC
       LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      [...params, limit, offset]
    );
    
    // Contar total
    const countResult = await query(
      `SELECT COUNT(*) FROM clients c ${whereClause}`,
      params
    );
    
    const total = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(total / limit);
    
    return NextResponse.json({
      success: true,
      clients: result.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    });
    
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    return NextResponse.json(
      { error: 'Erro ao listar clientes' },
      { status: 500 }
    );
  }
}
