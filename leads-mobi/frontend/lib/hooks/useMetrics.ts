"use client"

import { useState, useEffect } from 'react'

export interface Metrics {
  today: {
    leads: number
    activeNumbers: number
    cpa: number
    roi: number
  }
  charts: {
    leads: Array<{ date: string; leads: number }>
    byBairro: Array<{ bairro: string; leads: number }>
  }
}

export function useMetrics(period: 'today' | 'week' | 'month' = 'today') {
  const [metrics, setMetrics] = useState<Metrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMetrics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/metrics?period=${period}`)
      if (!response.ok) {
        throw new Error('Failed to fetch metrics')
      }
      const data = await response.json()
      setMetrics(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      console.error('Error fetching metrics:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMetrics()
    // Atualizar a cada 60 segundos
    const interval = setInterval(fetchMetrics, 60000)
    return () => clearInterval(interval)
  }, [period])

  return {
    metrics,
    loading,
    error,
    refetch: fetchMetrics,
  }
}

