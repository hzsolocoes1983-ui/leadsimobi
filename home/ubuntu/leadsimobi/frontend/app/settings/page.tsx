"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Save, User, Bell, Shield, Database } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="min-h-screen cyberpunk-gradient p-6">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold cyberpunk-glow text-[#FF4500] mb-2">
            Configurações
          </h1>
          <p className="text-gray-400">Gerencie as configurações do sistema</p>
        </div>

        {/* Perfil */}
        <Card className="bg-black/50 border-[#FF4500]/30">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-[#FF4500]" />
              <CardTitle className="text-[#FF4500]">Perfil do Usuário</CardTitle>
            </div>
            <CardDescription className="text-gray-400">
              Informações da sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Nome</label>
              <Input 
                defaultValue="Admin" 
                className="bg-black/50 border-[#FF4500]/30 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Email</label>
              <Input 
                type="email" 
                defaultValue="admin@leadsimobi.com" 
                className="bg-black/50 border-[#FF4500]/30 text-white"
              />
            </div>
            <Button className="bg-[#FF4500] text-black hover:bg-[#ff5500]">
              <Save className="h-4 w-4 mr-2" />
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>

        {/* Mensagens do Bot */}
        <Card className="bg-black/50 border-[#FF4500]/30">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-[#FF4500]" />
              <CardTitle className="text-[#FF4500]">Mensagens do Bot</CardTitle>
            </div>
            <CardDescription className="text-gray-400">
              Personalize as mensagens automáticas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Mensagem de Boas-vindas</label>
              <textarea 
                rows={3}
                defaultValue="Olá! Obrigado por entrar em contato. Como posso ajudá-lo hoje?"
                className="w-full bg-black/50 border border-[#FF4500]/30 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF4500]"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Mensagem de Qualificação</label>
              <textarea 
                rows={3}
                defaultValue="Para melhor atendê-lo, poderia me informar: 1) Qual bairro você procura? 2) Qual seu orçamento?"
                className="w-full bg-black/50 border border-[#FF4500]/30 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF4500]"
              />
            </div>
            <Button className="bg-[#FF4500] text-black hover:bg-[#ff5500]">
              <Save className="h-4 w-4 mr-2" />
              Salvar Mensagens
            </Button>
          </CardContent>
        </Card>

        {/* Segurança */}
        <Card className="bg-black/50 border-[#FF4500]/30">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-[#FF4500]" />
              <CardTitle className="text-[#FF4500]">Segurança</CardTitle>
            </div>
            <CardDescription className="text-gray-400">
              Configurações de segurança e acesso
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Nova Senha</label>
              <Input 
                type="password" 
                placeholder="Digite sua nova senha"
                className="bg-black/50 border-[#FF4500]/30 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Confirmar Senha</label>
              <Input 
                type="password" 
                placeholder="Confirme sua nova senha"
                className="bg-black/50 border-[#FF4500]/30 text-white"
              />
            </div>
            <Button className="bg-[#FF4500] text-black hover:bg-[#ff5500]">
              <Save className="h-4 w-4 mr-2" />
              Alterar Senha
            </Button>
          </CardContent>
        </Card>

        {/* Integrações */}
        <Card className="bg-black/50 border-[#FF4500]/30">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-[#FF4500]" />
              <CardTitle className="text-[#FF4500]">Integrações</CardTitle>
            </div>
            <CardDescription className="text-gray-400">
              Configure integrações com APIs externas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Evolution API URL</label>
              <Input 
                defaultValue="http://localhost:8080"
                className="bg-black/50 border-[#FF4500]/30 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Evolution API Key</label>
              <Input 
                type="password"
                placeholder="Digite sua API Key"
                className="bg-black/50 border-[#FF4500]/30 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Facebook Ads Access Token</label>
              <Input 
                type="password"
                placeholder="Digite seu Access Token"
                className="bg-black/50 border-[#FF4500]/30 text-white"
              />
            </div>
            <Button className="bg-[#FF4500] text-black hover:bg-[#ff5500]">
              <Save className="h-4 w-4 mr-2" />
              Salvar Integrações
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

