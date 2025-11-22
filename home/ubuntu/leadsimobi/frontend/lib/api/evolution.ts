// Cliente para Evolution API
// Prioriza variável server-side em ambientes containerizados
const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || ''

// Headers padrão
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'apikey': EVOLUTION_API_KEY,
})

// Tipos
export interface EvolutionInstance {
  instanceName: string
  status: 'open' | 'close'
  qrcode?: {
    code: string
    base64: string
  }
}

export interface EvolutionMessage {
  number: string
  text: string
}

// Criar instância
export async function createInstance(instanceName: string): Promise<EvolutionInstance> {
  const response = await fetch(`${EVOLUTION_API_URL}/instance/create`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      instanceName,
      token: EVOLUTION_API_KEY,
      qrcode: true,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to create instance: ${error}`)
  }

  return response.json()
}

// Conectar instância (obter QR Code)
export async function connectInstance(instanceName: string): Promise<{ qrcode: { code: string, base64: string } }> {
  const response = await fetch(`${EVOLUTION_API_URL}/instance/connect/${instanceName}`, {
    method: 'GET',
    headers: getHeaders(),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to connect instance: ${error}`)
  }

  return response.json()
}

// Obter status da instância
export async function getInstanceStatus(instanceName: string): Promise<EvolutionInstance> {
  const response = await fetch(`${EVOLUTION_API_URL}/instance/fetchInstances`, {
    method: 'GET',
    headers: getHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch instances')
  }

  const instances = await response.json()
  return instances.find((inst: EvolutionInstance) => inst.instanceName === instanceName)
}

// Enviar mensagem de texto
export async function sendTextMessage(
  instanceName: string,
  number: string,
  text: string
): Promise<any> {
  const response = await fetch(`${EVOLUTION_API_URL}/message/sendText/${instanceName}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      number,
      text,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to send message: ${error}`)
  }

  return response.json()
}

// Buscar conversas
export async function fetchChats(instanceName: string): Promise<any[]> {
  const response = await fetch(`${EVOLUTION_API_URL}/chat/fetchChats/${instanceName}`, {
    method: 'GET',
    headers: getHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch chats')
  }

  return response.json()
}

// Buscar mensagens de uma conversa
export async function fetchMessages(
  instanceName: string,
  phone: string
): Promise<any[]> {
  const response = await fetch(`${EVOLUTION_API_URL}/chat/fetchMessages/${instanceName}`, {
    method: 'GET',
    headers: getHeaders(),
    body: JSON.stringify({
      where: { key: { remoteJid: phone } },
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch messages')
  }

  return response.json()
}

// Desconectar instância
export async function disconnectInstance(instanceName: string): Promise<void> {
  const response = await fetch(`${EVOLUTION_API_URL}/instance/delete/${instanceName}`, {
    method: 'DELETE',
    headers: getHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to disconnect instance')
  }
}

// Listar todas as instâncias
export async function listInstances(): Promise<EvolutionInstance[]> {
  const response = await fetch(`${EVOLUTION_API_URL}/instance/fetchInstances`, {
    method: 'GET',
    headers: getHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to list instances')
  }

  return response.json()
}

