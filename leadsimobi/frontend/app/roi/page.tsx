"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, TrendingDown, Activity, RefreshCw } from "lucide-react"
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Dados mockados
const roiData = [
  { date: "01/01", gasto: 450, leads: 12, cpa: 37.5, roi: 320 },
  { date: "02/01", gasto: 520, leads: 15, cpa: 34.7, roi: 350 },
  { date: "03/01", gasto: 480, leads: 14, cpa: 34.3, roi: 340 },
  { date: "04/01", gasto: 550, leads: 18, cpa: 30.6, roi: 380 },
  { date: "05/01", gasto: 600, leads: 20, cpa: 30.0, roi: 400 },
  { date: "06/01", gasto: 580, leads: 19, cpa: 30.5, roi: 390 },
  { date: "07/01", gasto: 620, leads: 22, cpa: 28.2, roi: 420 },
]

const monthlyData = [
  { month: "Out", gasto: 3200, leads: 85, roi: 310 },
  { month: "Nov", gasto: 3800, leads: 102, roi: 335 },
  { month: "Dez", gasto: 4200, leads: 118, roi: 350 },
  { month: "Jan", gasto: 4200, leads: 120, roi: 342 },
]

export default function ROIPage() {
  return (
    <div className="min-h-screen cyberpunk-gradient p-6">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold cyberpunk-glow text-[#FF4500] mb-2">
              Anúncios & ROI
            </h1>
            <p className="text-gray-400">Acompanhe o desempenho dos seus anúncios e ROI</p>
          </div>
          <Button className="bg-[#FF4500] text-black hover:bg-[#ff5500]">
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar Dados
          </Button>
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-black/50 border-[#FF4500]/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Gasto Hoje
              </CardTitle>
              <DollarSign className="h-4 w-4 text-[#FF4500]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#FF4500]">R$ 620</div>
              <p className="text-xs text-gray-500 mt-1">
                Meta: R$ 600/dia
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-[#FF4500]/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                CPA Médio
              </CardTitle>
              <Activity className="h-4 w-4 text-[#FF4500]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#FF4500]">R$ 28</div>
              <p className="text-xs text-gray-500 mt-1 flex items-center">
                <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500">-12%</span> vs semana anterior
              </p>
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
              <div className="text-3xl font-bold text-[#FF4500]">342%</div>
              <p className="text-xs text-gray-500 mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500">+28%</span> vs mês anterior
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-[#FF4500]/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Leads do Mês
              </CardTitle>
              <Activity className="h-4 w-4 text-[#FF4500]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#FF4500]">120</div>
              <p className="text-xs text-gray-500 mt-1">
                +5% vs mês anterior
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de ROI Diário */}
          <Card className="bg-black/50 border-[#FF4500]/30">
            <CardHeader>
              <CardTitle className="text-[#FF4500]">ROI e CPA - Últimos 7 dias</CardTitle>
              <CardDescription className="text-gray-400">
                Evolução diária do ROI e CPA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={roiData}>
                  <defs>
                    <linearGradient id="colorRoi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF4500" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#FF4500" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" stroke="#666" />
                  <YAxis yAxisId="left" stroke="#FF4500" />
                  <YAxis yAxisId="right" orientation="right" stroke="#00ff00" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #FF4500', borderRadius: '8px' }}
                    labelStyle={{ color: '#FF4500' }}
                  />
                  <Legend />
                  <Area 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="roi" 
                    stroke="#FF4500" 
                    fillOpacity={1}
                    fill="url(#colorRoi)"
                    name="ROI (%)"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="cpa" 
                    stroke="#00ff00" 
                    strokeWidth={2}
                    name="CPA (R$)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Gráfico Mensal */}
          <Card className="bg-black/50 border-[#FF4500]/30">
            <CardHeader>
              <CardTitle className="text-[#FF4500]">Gasto e Leads - Últimos 4 meses</CardTitle>
              <CardDescription className="text-gray-400">
                Comparativo mensal de investimento e resultados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis yAxisId="left" stroke="#FF4500" />
                  <YAxis yAxisId="right" orientation="right" stroke="#00ff00" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #FF4500', borderRadius: '8px' }}
                    labelStyle={{ color: '#FF4500' }}
                  />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="gasto" 
                    stroke="#FF4500" 
                    strokeWidth={2}
                    name="Gasto (R$)"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="leads" 
                    stroke="#00ff00" 
                    strokeWidth={2}
                    name="Leads"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Performance */}
        <Card className="bg-black/50 border-[#FF4500]/30">
          <CardHeader>
            <CardTitle className="text-[#FF4500]">Performance Diária - Últimos 7 dias</CardTitle>
            <CardDescription className="text-gray-400">
              Detalhamento diário de gastos, leads, CPA e ROI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#FF4500]/30">
                    <th className="text-left p-4 text-gray-400 font-medium">Data</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Gasto (R$)</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Leads</th>
                    <th className="text-left p-4 text-gray-400 font-medium">CPA (R$)</th>
                    <th className="text-left p-4 text-gray-400 font-medium">ROI (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {roiData.map((row, index) => (
                    <tr 
                      key={index} 
                      className="border-b border-[#FF4500]/10 hover:bg-black/30 transition-colors"
                    >
                      <td className="p-4 text-gray-300">{row.date}</td>
                      <td className="p-4 text-[#FF4500] font-semibold">R$ {row.gasto.toFixed(2)}</td>
                      <td className="p-4 text-white">{row.leads}</td>
                      <td className="p-4 text-green-400">R$ {row.cpa.toFixed(2)}</td>
                      <td className="p-4 text-[#FF4500] font-bold">{row.roi}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

