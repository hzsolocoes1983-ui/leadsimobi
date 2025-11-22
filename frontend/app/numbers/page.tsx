"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Plus, QrCode, CheckCircle2, XCircle, RefreshCw } from "lucide-react"
import { useState } from "react"
import { useNumbers } from "@/lib/hooks/useNumbers"
import { format } from "date-fns"

export default function NumbersPage() {
  const { numbers, loading, error, disconnectNumber } = useNumbers()
  const [showQR, setShowQR] = useState<string | null>(null)

  const handleConnect = (id: string) => {
    setShowQR(id)
    // Aqui será integrado com Evolution API para gerar QR Code
  }

  const handleDisconnect = async (instanceId: string) => {
    try {
      await disconnectNumber(instanceId)
    } catch (err) {
      console.error('Erro ao desconectar:', err)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "text-green-500"
      case "connecting":
        return "text-yellow-500"
      default:
        return "text-red-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "connecting":
        return <RefreshCw className="h-5 w-5 text-yellow-500 animate-spin" />
      default:
        return <XCircle className="h-5 w-5 text-red-500" />
    }
  }

  return (
    <div className="min-h-screen cyberpunk-gradient p-6">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold cyberpunk-glow text-[#FF4500] mb-2">
              Gerenciamento de Números
            </h1>
            <p className="text-gray-400">Gerencie seus números WhatsApp conectados</p>
          </div>
          <Button className="bg-[#FF4500] text-black hover:bg-[#ff5500]">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Número
          </Button>
        </div>

        {/* Cards de Números */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-[#FF4500]" />
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-400">
            Erro ao carregar números: {error}
          </div>
        ) : numbers.length === 0 ? (
          <Card className="bg-black/50 border-[#FF4500]/30">
            <CardContent className="p-12 text-center">
              <MessageSquare className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Nenhum número WhatsApp cadastrado</p>
              <Button className="mt-4 bg-[#FF4500] text-black hover:bg-[#ff5500]">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeiro Número
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {numbers.map((number) => (
            <Card key={number.id} className="bg-black/50 border-[#FF4500]/30 hover:border-[#FF4500] transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="h-8 w-8 text-[#FF4500]" />
                    <div>
                      <CardTitle className="text-[#FF4500]">{number.name}</CardTitle>
                      <CardDescription className="text-gray-400">{number.phone}</CardDescription>
                    </div>
                  </div>
                  {getStatusIcon(number.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Status:</span>
                  <span className={getStatusColor(number.status)}>
                    {number.status === "connected" ? "Conectado" : 
                     number.status === "connecting" ? "Conectando..." : "Desconectado"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Mensagens hoje:</span>
                  <span className="text-[#FF4500] font-semibold">{number.messages_today || 0}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Última vez:</span>
                  <span className="text-gray-300">
                    {number.last_seen ? format(new Date(number.last_seen), 'dd/MM/yyyy HH:mm') : 'Nunca'}
                  </span>
                </div>
                <div className="flex space-x-2 pt-2">
                  {number.status === "disconnected" ? (
                    <Button 
                      onClick={() => handleConnect(number.instance_id)}
                      className="flex-1 bg-[#FF4500] text-black hover:bg-[#ff5500]"
                    >
                      <QrCode className="h-4 w-4 mr-2" />
                      Conectar
                    </Button>
                  ) : (
                    <>
                      <Button 
                        onClick={() => setShowQR(number.instance_id)}
                        variant="outline" 
                        className="flex-1 border-[#FF4500] text-[#FF4500] hover:bg-[#FF4500]/10"
                      >
                        Ver QR
                      </Button>
                      <Button 
                        onClick={() => handleDisconnect(number.instance_id)}
                        variant="outline"
                        className="flex-1 border-red-500 text-red-500 hover:bg-red-500/10"
                      >
                        Desconectar
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
            ))}
          </div>
        )}

        {/* Modal de QR Code (simplificado) */}
        {showQR && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <Card className="bg-black border-[#FF4500] max-w-md">
              <CardHeader>
                <CardTitle className="text-[#FF4500]">Conectar WhatsApp</CardTitle>
                <CardDescription className="text-gray-400">
                  Escaneie o QR Code com seu WhatsApp
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white p-8 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <QrCode className="h-32 w-32 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">QR Code será gerado aqui</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Integração com Evolution API pendente
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={() => setShowQR(null)}
                  className="w-full bg-[#FF4500] text-black hover:bg-[#ff5500]"
                >
                  Fechar
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

