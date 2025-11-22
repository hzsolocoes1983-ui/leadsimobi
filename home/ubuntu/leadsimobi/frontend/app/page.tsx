"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, MessageSquare, TrendingUp, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen cyberpunk-gradient">
      {/* Header */}
      <header className="border-b border-[#FF4500]/30 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-8 h-8 text-[#FF4500]" />
            <h1 className="text-2xl font-bold cyberpunk-glow text-[#FF4500]">
              M13X LEADS
            </h1>
          </div>
          <nav className="flex space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-gray-300 hover:text-[#FF4500]">
                Dashboard
              </Button>
            </Link>
            <Link href="/numbers">
              <Button variant="ghost" className="text-gray-300 hover:text-[#FF4500]">
                Números
              </Button>
            </Link>
            <Link href="/leads">
              <Button variant="ghost" className="text-gray-300 hover:text-[#FF4500]">
                Leads
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-[#FF4500] text-black hover:bg-[#ff5500]">
                Entrar
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8 mb-16">
          <h2 className="text-7xl font-bold cyberpunk-glow text-[#FF4500] mb-4">
            M13X LEADS
          </h2>
          <p className="text-2xl text-gray-300 max-w-2xl mx-auto">
            Sistema completo de captação e gerenciamento de leads imobiliários via WhatsApp
          </p>
          <div className="flex justify-center space-x-4 mt-8">
            <Link href="/dashboard">
              <Button size="lg" className="bg-[#FF4500] text-black hover:bg-[#ff5500] text-lg px-8 py-6">
                Acessar Dashboard
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-[#FF4500] text-[#FF4500] hover:bg-[#FF4500]/10 text-lg px-8 py-6">
              Ver Demonstração
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
          <Card className="bg-black/50 border-[#FF4500]/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Leads Hoje
              </CardTitle>
              <Users className="h-4 w-4 text-[#FF4500]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#FF4500]">0</div>
              <p className="text-xs text-gray-500 mt-1">
                Aguardando conexão
              </p>
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
              <div className="text-3xl font-bold text-[#FF4500]">0</div>
              <p className="text-xs text-gray-500 mt-1">
                Nenhum conectado
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-[#FF4500]/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                CPA Médio
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-[#FF4500]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#FF4500]">R$ 0</div>
              <p className="text-xs text-gray-500 mt-1">
                Sem dados ainda
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-[#FF4500]/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                ROI do Mês
              </CardTitle>
              <Activity className="h-4 w-4 text-[#FF4500]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#FF4500]">0%</div>
              <p className="text-xs text-gray-500 mt-1">
                Aguardando dados
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h3 className="text-4xl font-bold text-center text-[#FF4500] mb-12">
            Funcionalidades Principais
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-black/50 border-[#FF4500]/30 hover:border-[#FF4500] transition-colors">
              <CardHeader>
                <MessageSquare className="h-10 w-10 text-[#FF4500] mb-4" />
                <CardTitle className="text-[#FF4500]">Múltiplos Números</CardTitle>
                <CardDescription className="text-gray-400">
                  Gerencie dezenas de números WhatsApp simultaneamente com segurança
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-black/50 border-[#FF4500]/30 hover:border-[#FF4500] transition-colors">
              <CardHeader>
                <Zap className="h-10 w-10 text-[#FF4500] mb-4" />
                <CardTitle className="text-[#FF4500]">Automação Inteligente</CardTitle>
                <CardDescription className="text-gray-400">
                  Funil automático de mensagens com qualificação de leads em tempo real
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-black/50 border-[#FF4500]/30 hover:border-[#FF4500] transition-colors">
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-[#FF4500] mb-4" />
                <CardTitle className="text-[#FF4500]">ROI em Tempo Real</CardTitle>
                <CardDescription className="text-gray-400">
                  Integração com Facebook Ads para cálculo automático de ROI e CPA
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#FF4500]/30 bg-black/50 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-gray-400">
          <p>© 2024 M13X Leads. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  )
}

