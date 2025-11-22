import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// GET - Listar leads
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    let sql = 'SELECT * FROM leads WHERE 1=1'
    const params: any[] = []
    let paramCount = 1

    if (status && status !== 'all') {
      sql += ` AND status = $${paramCount}`
      params.push(status)
      paramCount++
    }

    if (search) {
      sql += ` AND (
        name ILIKE $${paramCount} OR 
        phone ILIKE $${paramCount} OR 
        email ILIKE $${paramCount} OR 
        bairro ILIKE $${paramCount}
      )`
      params.push(`%${search}%`)
      paramCount++
    }

    sql += ' ORDER BY created_at DESC'

    const result = await query(sql, params)
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    )
  }
}

// POST - Criar novo lead
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      phone,
      name,
      email,
      bairro,
      orcamento_min,
      orcamento_max,
      tipo_imovel,
      origem,
      conversation_id,
    } = body

    if (!phone) {
      return NextResponse.json(
        { error: 'Phone is required' },
        { status: 400 }
      )
    }

    const result = await query(
      `INSERT INTO leads (
        phone, name, email, bairro, orcamento_min, orcamento_max, 
        tipo_imovel, origem, conversation_id, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (phone) 
      DO UPDATE SET 
        name = EXCLUDED.name,
        email = EXCLUDED.email,
        bairro = EXCLUDED.bairro,
        orcamento_min = EXCLUDED.orcamento_min,
        orcamento_max = EXCLUDED.orcamento_max,
        tipo_imovel = EXCLUDED.tipo_imovel,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *`,
      [
        phone,
        name || null,
        email || null,
        bairro || null,
        orcamento_min || null,
        orcamento_max || null,
        tipo_imovel || null,
        origem || 'WhatsApp',
        conversation_id || null,
        'novo',
      ]
    )

    return NextResponse.json(result.rows[0], { status: 201 })
  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    )
  }
}

