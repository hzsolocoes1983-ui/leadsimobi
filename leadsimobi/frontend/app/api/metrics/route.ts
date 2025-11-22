import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// GET - Obter métricas
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || 'today' // today, week, month

    let dateFilter = ''
    const params: any[] = []

    if (period === 'today') {
      dateFilter = "WHERE date = CURRENT_DATE"
    } else if (period === 'week') {
      dateFilter = "WHERE date >= CURRENT_DATE - INTERVAL '7 days'"
    } else if (period === 'month') {
      dateFilter = "WHERE date >= CURRENT_DATE - INTERVAL '30 days'"
    }

    // Métricas do dia
    const todayMetrics = await query(
      `SELECT * FROM metrics WHERE date = CURRENT_DATE`
    )

    // Leads de hoje
    const todayLeads = await query(
      `SELECT COUNT(*) as count FROM leads WHERE DATE(created_at) = CURRENT_DATE`
    )

    // Números ativos
    const activeNumbers = await query(
      `SELECT COUNT(*) as count FROM whatsapp_numbers WHERE status = 'connected'`
    )

    // CPA médio (últimos 7 dias)
    const cpaData = await query(
      `SELECT AVG(cpa) as avg_cpa FROM metrics 
       WHERE date >= CURRENT_DATE - INTERVAL '7 days' AND cpa IS NOT NULL`
    )

    // ROI do mês
    const roiData = await query(
      `SELECT AVG(roi) as avg_roi FROM metrics 
       WHERE date >= DATE_TRUNC('month', CURRENT_DATE) AND roi IS NOT NULL`
    )

    // Gráfico de leads (últimos 7 dias)
    const leadsChart = await query(
      `SELECT 
        DATE(created_at) as date,
        COUNT(*) as leads
       FROM leads
       WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
       GROUP BY DATE(created_at)
       ORDER BY date ASC`
    )

    // Leads por bairro
    const leadsByBairro = await query(
      `SELECT 
        bairro,
        COUNT(*) as leads
       FROM leads
       WHERE bairro IS NOT NULL
       GROUP BY bairro
       ORDER BY leads DESC
       LIMIT 5`
    )

    return NextResponse.json({
      today: {
        leads: parseInt(todayLeads.rows[0]?.count || '0'),
        activeNumbers: parseInt(activeNumbers.rows[0]?.count || '0'),
        cpa: parseFloat(cpaData.rows[0]?.avg_cpa || '0'),
        roi: parseFloat(roiData.rows[0]?.avg_roi || '0'),
      },
      charts: {
        leads: leadsChart.rows,
        byBairro: leadsByBairro.rows,
      },
    })
  } catch (error) {
    console.error('Error fetching metrics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch metrics' },
      { status: 500 }
    )
  }
}

