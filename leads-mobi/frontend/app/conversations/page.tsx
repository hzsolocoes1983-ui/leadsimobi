"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, Send, Search, Phone, User } from "lucide-react"
import { useState } from "react"

interface Message {
  id: string
  text: string
  timestamp: string
  fromMe: boolean
}

interface Conversation {
  id: string
  name: string
  phone: string
  lastMessage: string
  timestamp: string
  unread: number
  messages: Message[]
}

// Dados mockados
const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "João Silva",
    phone: "(11) 98765-4321",
    lastMessage: "Gostaria de saber mais sobre o apartamento",
    timestamp: "2 min",
    unread: 2,
    messages: [
      { id: "1", text: "Olá, vi o anúncio do apartamento", timestamp: "10:30", fromMe: false },
      { id: "2", text: "Olá! Fico feliz em ajudar. Qual sua dúvida?", timestamp: "10:31", fromMe: true },
      { id: "3", text: "Gostaria de saber mais sobre o apartamento", timestamp: "10:32", fromMe: false },
    ]
  },
  {
    id: "2",
    name: "Maria Santos",
    phone: "(11) 97654-3210",
    lastMessage: "Qual o valor do condomínio?",
    timestamp: "15 min",
    unread: 0,
    messages: [
      { id: "1", text: "Qual o valor do condomínio?", timestamp: "09:45", fromMe: false },
      { id: "2", text: "O condomínio é R$ 450,00", timestamp: "09:46", fromMe: true },
    ]
  },
  {
    id: "3",
    name: "Pedro Costa",
    phone: "(11) 96543-2109",
    lastMessage: "Posso agendar uma visita?",
    timestamp: "1h",
    unread: 1,
    messages: [
      { id: "1", text: "Posso agendar uma visita?", timestamp: "08:30", fromMe: false },
    ]
  },
]

export default function ConversationsPage() {
  const [conversations] = useState<Conversation[]>(mockConversations)
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0])
  const [message, setMessage] = useState("")
  const [search, setSearch] = useState("")

  const handleSendMessage = () => {
    if (!message.trim() || !selectedConversation) return
    
    // Aqui será integrado com Evolution API para enviar mensagem
    setMessage("")
  }

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(search.toLowerCase()) ||
    conv.phone.includes(search)
  )

  return (
    <div className="min-h-screen cyberpunk-gradient p-6">
      <div className="container mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold cyberpunk-glow text-[#FF4500] mb-2">
            Conversas ao Vivo
          </h1>
          <p className="text-gray-400">Monitore e gerencie conversas em tempo real</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Lista de Conversas */}
          <Card className="bg-black/50 border-[#FF4500]/30 lg:col-span-1 flex flex-col">
            <CardContent className="p-4 flex flex-col h-full">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar conversas..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 bg-black/50 border-[#FF4500]/30 text-white"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2">
                {filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation?.id === conv.id
                        ? "bg-[#FF4500]/20 border border-[#FF4500]"
                        : "bg-black/30 border border-transparent hover:border-[#FF4500]/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-full bg-[#FF4500]/20 flex items-center justify-center">
                          <User className="h-5 w-5 text-[#FF4500]" />
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">{conv.name}</p>
                          <p className="text-gray-400 text-xs">{conv.phone}</p>
                        </div>
                      </div>
                      {conv.unread > 0 && (
                        <span className="bg-[#FF4500] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-xs truncate">{conv.lastMessage}</p>
                    <p className="text-gray-500 text-xs mt-1">{conv.timestamp}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Área de Chat */}
          <Card className="bg-black/50 border-[#FF4500]/30 lg:col-span-3 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Header do Chat */}
                <div className="p-4 border-b border-[#FF4500]/30 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#FF4500]/20 flex items-center justify-center">
                      <User className="h-5 w-5 text-[#FF4500]" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{selectedConversation.name}</p>
                      <p className="text-gray-400 text-sm">{selectedConversation.phone}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="border-[#FF4500] text-[#FF4500]">
                    <Phone className="h-4 w-4 mr-2" />
                    Ligar
                  </Button>
                </div>

                {/* Mensagens */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedConversation.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          msg.fromMe
                            ? "bg-[#FF4500] text-black"
                            : "bg-black/50 border border-[#FF4500]/30 text-white"
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.fromMe ? "text-black/70" : "text-gray-400"}`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input de Mensagem */}
                <div className="p-4 border-t border-[#FF4500]/30 flex items-center space-x-2">
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 bg-black/50 border-[#FF4500]/30 text-white"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-[#FF4500] text-black hover:bg-[#ff5500]"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Selecione uma conversa para começar</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

