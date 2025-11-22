"use client"

import { useState, useEffect } from 'react'

export interface WhatsAppNumber {
  id: string
  instance_id: string
  name: string
  phone: string
  status: 'connected' | 'disconnected' | 'connecting'
  last_seen?: string
  messages_today: number
  created_at: string
}

export function useNumbers() {
  const [numbers, setNumbers] = useState<WhatsAppNumber[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNumbers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/numbers')
      if (!response.ok) {
        throw new Error('Failed to fetch numbers')
      }
      const data = await response.json()
      setNumbers(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      console.error('Error fetching numbers:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNumbers()
    // Atualizar a cada 30 segundos
    const interval = setInterval(fetchNumbers, 30000)
    return () => clearInterval(interval)
  }, [])

  const createNumber = async (name: string, phone: string, instanceId: string) => {
    try {
      const response = await fetch('/api/numbers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, instanceId }),
      })
      if (!response.ok) {
        throw new Error('Failed to create number')
      }
      await fetchNumbers()
      return await response.json()
    } catch (err) {
      throw err
    }
  }

  const disconnectNumber = async (instanceId: string) => {
    try {
      const response = await fetch(`/api/numbers/${instanceId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to disconnect number')
      }
      await fetchNumbers()
    } catch (err) {
      throw err
    }
  }

  return {
    numbers,
    loading,
    error,
    refetch: fetchNumbers,
    createNumber,
    disconnectNumber,
  }
}

