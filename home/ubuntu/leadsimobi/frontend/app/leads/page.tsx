"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Search, Filter, User, Phone, MapPin, DollarSign, Home, RefreshCw } from "lucide-react"
import { useState } from "react"
import { useLeads } from "@/lib/hooks/useLeads"
import { format } from "date-fns"

export default function LeadsPage() {
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const { leads, loading, error } = useLeads(filterStatus === "all" ? undefined : filterStatus, search || undefined)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "novo":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "qualificado":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "contato":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "convertido":
        return "bg-[#FF4500]/20 text-[#FF4500] border-[#FF4500]/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "novo":
        return "Novo"
      case "qualificado":
        return "Qualificado"
      case "contato":
        return "Em Contato"
      case "convertido":
        return "Convertido"
      default:
        return status
    }
  }

  const formatOrcamento = (min?: number, max?: number) => {
    if (!min && !max) return "Não informado"
    if (min && max) return `R$ ${(min / 1000).toFixed(0)}k - R$ ${(max / 1000).toFixed(0)}k`
    if (min) return `R$ ${(min / 1000).toFixed(0)}k+`
    if (max) return `Até R$ ${(max / 1000).toFixed(0)}k`
    return "Não informado"
  }

  const handleExport = () => {
    // Aqui será implementada a exportação para CSV/Excel
    alert("Exportação será implementada em breve")
  }

  return (
    <div className="min-h-screen cyberpunk-gradient p-6">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold cyberpunk-glow text-[#FF4500] mb-2">
              Leads Qualificados
            </h1>
            <p className="text-gray-400">Gerencie e acompanhe todos os seus leads</p>
          </div>
          <Button 
            onClick={handleExport}
            className="bg-[#FF4500] text-black hover:bg-[#ff5500]"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>

        {/* Filtros */}
        <Card className="bg-black/50 border-[#FF4500]/30">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome, telefone, email ou bairro..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 bg-black/50 border-[#FF4500]/30 text-white"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-black/50 border border-[#FF4500]/30 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF4500]"
                >
                  <option value="all">Todos os Status</option>
                  <option value="novo">Novo</option>
                  <option value="qualificado">Qualificado</option>
                  <option value="contato">Em Contato</option>
                  <option value="convertido">Convertido</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Leads */}
        <Card className="bg-black/50 border-[#FF4500]/30">
          <CardHeader>
            <CardTitle className="text-[#FF4500]">Lista de Leads</CardTitle>
            <CardDescription className="text-gray-400">
              {loading ? "Carregando..." : `${leads.length} lead(s) encontrado(s)`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="h-8 w-8 animate-spin text-[#FF4500]" />
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-400">
                Erro ao carregar leads: {error}
              </div>
            ) : leads.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                Nenhum lead encontrado
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#FF4500]/30">
                      <th className="text-left p-4 text-gray-400 font-medium">Nome</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Contato</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Bairro</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Orçamento</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Tipo</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Data</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                    <tr 
                      key={lead.id} 
                      className="border-b border-[#FF4500]/10 hover:bg-black/30 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-[#FF4500]" />
                          <span className="text-white font-medium">{lead.name || "Sem nome"}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-sm">
                            <Phone className="h-3 w-3 text-gray-400" />
                            <span className="text-gray-300">{lead.phone}</span>
                          </div>
                          {lead.email && (
                            <span className="text-xs text-gray-500">{lead.email}</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-300">{lead.bairro || "Não informado"}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-300">{formatOrcamento(lead.orcamento_min, lead.orcamento_max)}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Home className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-300">{lead.tipo_imovel || "Não informado"}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(lead.status)}`}>
                          {getStatusLabel(lead.status)}
                        </span>
                      </td>
                      <td className="p-4 text-gray-400 text-sm">
                        {lead.created_at ? format(new Date(lead.created_at), 'dd/MM/yyyy') : '-'}
                      </td>
                      <td className="p-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-[#FF4500] text-[#FF4500] hover:bg-[#FF4500]/10"
                        >
                          Ver Detalhes
                        </Button>
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

