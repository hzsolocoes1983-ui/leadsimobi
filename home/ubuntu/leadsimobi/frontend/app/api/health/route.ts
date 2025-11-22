import { NextResponse } from 'next/server'
import { testConnection } from '@/lib/db'

export async function GET() {
  try {
    const dbStatus = await testConnection()
    
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: dbStatus,
      services: {
        evolution_api: process.env.EVOLUTION_API_URL || 'http://localhost:8080',
        n8n: process.env.NEXT_PUBLIC_N8N_URL || 'http://localhost:5678',
      }
    })
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}

