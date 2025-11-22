"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, MessageSquare, TrendingUp, Users, DollarSign, ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useMetrics } from "@/lib/hooks/useMetrics"
import { useLeads } from "@/lib/hooks/useLeads"
import { useNumbers } from "@/lib/hooks/useNumbers"

export default function DashboardPage() {
  const { metrics, loading: metricsLoading, error: metricsError } = useMetrics('today')
  const { leads, loading: leadsLoading } = useLeads()
  const { numbers, loading: numbersLoading } = useNumbers()

  // Preparar dados para gráficos
  const leadsData = metrics?.charts.leads.map(item => ({
    name: new Date(item.date).toLocaleDateString('pt-BR', { weekday: 'short' }),
    leads: item.leads,
    conversas: 0 // TODO: adicionar quando tiver dados de conversas
  })) || []

  const bairrosData = metrics?.charts.byBairro.map(item => ({
    name: item.bairro,
    leads: item.leads
  })) || []

  const isLoading = metricsLoading || leadsLoading || numbersLoading
  return (
    <div className="min-h-screen cyberpunk-gradient p-6">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold cyberpunk-glow text-[#FF4500] mb-2">
              Dashboard
            </h1>
            <p className="text-gray-400">Visão geral do sistema M13X Leads</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Última atualização</p>
            <p className="text-[#FF4500] font-semibold">Agora</p>
          </div>
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-black/50 border-[#FF4500]/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Leads Hoje
              </CardTitle>
              <Users className="h-4 w-4 text-[#FF4500]" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <RefreshCw className="h-4 w-4 animate-spin text-[#FF4500]" />
                  <span className="text-gray-400">Carregando...</span>
                </div>
              ) : (
                <>
                  <div className="text-3xl font-bold text-[#FF4500]">
                    {metrics?.today.leads || 0}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {leads.length} total de leads
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-[#FF4500]/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Números Ativos
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-[#FF4500]" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <RefreshCw className="h-4 w-4 animate-spin text-[#FF4500]" />
                  <span className="text-gray-400">Carregando...</span>
                </div>
              ) : (
                <>
                  <div className="text-3xl font-bold text-[#FF4500]">
                    {metrics?.today.activeNumbers || numbers.filter(n => n.status === 'connected').length}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {numbers.filter(n => n.status === 'connected').length} de {numbers.length} conectados
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-[#FF4500]/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                CPA Médio
              </CardTitle>
              <DollarSign className="h-4 w-4 text-[#FF4500]" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <RefreshCw className="h-4 w-4 animate-spin text-[#FF4500]" />
                  <span className="text-gray-400">Carregando...</span>
                </div>
              ) : (
                <>
                  <div className="text-3xl font-bold text-[#FF4500]">
                    R$ {metrics?.today.cpa.toFixed(2) || '0.00'}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Custo por aquisição
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-[#FF4500]/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                ROI do Mês
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-[#FF4500]" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <RefreshCw className="h-4 w-4 animate-spin text-[#FF4500]" />
                  <span className="text-gray-400">Carregando...</span>
                </div>
              ) : (
                <>
                  <div className="text-3xl font-bold text-[#FF4500]">
                    {metrics?.today.roi.toFixed(1) || '0'}%
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Retorno sobre investimento
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Leads */}
          <Card className="bg-black/50 border-[#FF4500]/30">
            <CardHeader>
              <CardTitle className="text-[#FF4500]">Leads e Conversas - Últimos 7 dias</CardTitle>
              <CardDescription className="text-gray-400">
                Evolução diária de leads e conversas iniciadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center h-[300px]">
                  <RefreshCw className="h-8 w-8 animate-spin text-[#FF4500]" />
                </div>
              ) : leadsData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={leadsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #FF4500', borderRadius: '8px' }}
                    labelStyle={{ color: '#FF4500' }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="leads" 
                    stroke="#FF4500" 
                    strokeWidth={2}
                    name="Leads"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="conversas" 
                    stroke="#00ff00" 
                    strokeWidth={2}
                    name="Conversas"
                  />
                </LineChart>
              </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-gray-400">
                  Sem dados para exibir
                </div>
              )}
            </CardContent>
          </Card>

          {/* Gráfico de Bairros */}
          <Card className="bg-black/50 border-[#FF4500]/30">
            <CardHeader>
              <CardTitle className="text-[#FF4500]">Leads por Bairro</CardTitle>
              <CardDescription className="text-gray-400">
                Distribuição de leads por região
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center h-[300px]">
                  <RefreshCw className="h-8 w-8 animate-spin text-[#FF4500]" />
                </div>
              ) : bairrosData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={bairrosData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #FF4500', borderRadius: '8px' }}
                    labelStyle={{ color: '#FF4500' }}
                  />
                  <Bar dataKey="leads" fill="#FF4500" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-gray-400">
                  Sem dados para exibir
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Atividades Recentes */}
        <Card className="bg-black/50 border-[#FF4500]/30">
          <CardHeader>
            <CardTitle className="text-[#FF4500]">Atividades Recentes</CardTitle>
            <CardDescription className="text-gray-400">
              Últimas interações e leads qualificados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: "2 min atrás", action: "Novo lead qualificado", name: "João Silva", phone: "(11) 98765-4321" },
                { time: "15 min atrás", action: "Conversa iniciada", name: "Maria Santos", phone: "(11) 97654-3210" },
                { time: "32 min atrás", action: "Lead qualificado", name: "Pedro Costa", phone: "(11) 96543-2109" },
                { time: "1h atrás", action: "Número conectado", name: "WhatsApp Business #3", phone: "" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-[#FF4500]/10 hover:border-[#FF4500]/30 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-[#FF4500] rounded-full"></div>
                    <div>
                      <p className="text-white font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-400">
                        {activity.name} {activity.phone && `- ${activity.phone}`}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

