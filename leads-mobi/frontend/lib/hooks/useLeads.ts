"use client"

import { useState, useEffect } from 'react'

export interface Lead {
  id: string
  phone: string
  name?: string
  email?: string
  bairro?: string
  orcamento_min?: number
  orcamento_max?: number
  tipo_imovel?: string
  status: 'novo' | 'qualificado' | 'contato' | 'convertido' | 'perdido'
  origem?: string
  created_at: string
  updated_at: string
}

export function useLeads(status?: string, search?: string) {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (status) params.append('status', status)
      if (search) params.append('search', search)
      
      const response = await fetch(`/api/leads?${params.toString()}`)
      if (!response.ok) {
        throw new Error('Failed to fetch leads')
      }
      const data = await response.json()
      setLeads(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      console.error('Error fetching leads:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [status, search])

  const createLead = async (leadData: Partial<Lead>) => {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      })
      if (!response.ok) {
        throw new Error('Failed to create lead')
      }
      await fetchLeads()
      return await response.json()
    } catch (err) {
      throw err
    }
  }

  const updateLead = async (id: string, updates: Partial<Lead>) => {
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (!response.ok) {
        throw new Error('Failed to update lead')
      }
      await fetchLeads()
      return await response.json()
    } catch (err) {
      throw err
    }
  }

  return {
    leads,
    loading,
    error,
    refetch: fetchLeads,
    createLead,
    updateLead,
  }
}

