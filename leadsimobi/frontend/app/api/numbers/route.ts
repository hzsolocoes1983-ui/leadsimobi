import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { listInstances, createInstance, connectInstance, disconnectInstance, getInstanceStatus } from '@/lib/api/evolution'

// GET - Listar todos os números
export async function GET() {
  try {
    const dbNumbers = await query(
      'SELECT * FROM whatsapp_numbers ORDER BY created_at DESC'
    )

    // Buscar status atual da Evolution API
    try {
      const evolutionInstances = await listInstances()
      
      // Atualizar status no banco
      for (const dbNumber of dbNumbers.rows) {
        const evolutionInstance = evolutionInstances.find(
          (inst: any) => inst.instanceName === dbNumber.instance_id
        )
        
        if (evolutionInstance) {
          const status = evolutionInstance.status === 'open' ? 'connected' : 'disconnected'
          if (dbNumber.status !== status) {
            await query(
              'UPDATE whatsapp_numbers SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
              [status, dbNumber.id]
            )
          }
        }
      }
    } catch (error) {
      console.error('Error syncing with Evolution API:', error)
    }

    const updatedNumbers = await query(
      'SELECT * FROM whatsapp_numbers ORDER BY created_at DESC'
    )

    return NextResponse.json(updatedNumbers.rows)
  } catch (error) {
    console.error('Error fetching numbers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch numbers' },
      { status: 500 }
    )
  }
}

// POST - Criar novo número
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, instanceId } = body

    if (!name || !phone || !instanceId) {
      return NextResponse.json(
        { error: 'Missing required fields: name, phone, instanceId' },
        { status: 400 }
      )
    }

    // Criar instância na Evolution API
    try {
      await createInstance(instanceId)
    } catch (error) {
      console.error('Error creating Evolution instance:', error)
    }

    // Salvar no banco
    const result = await query(
      `INSERT INTO whatsapp_numbers (instance_id, name, phone, status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [instanceId, name, phone, 'connecting']
    )

    return NextResponse.json(result.rows[0], { status: 201 })
  } catch (error) {
    console.error('Error creating number:', error)
    return NextResponse.json(
      { error: 'Failed to create number' },
      { status: 500 }
    )
  }
}

