# Arquitetura do Sistema M13X Leads

## Visão Geral

O M13X Leads é um sistema modular e escalável, composto por vários serviços que trabalham em conjunto para fornecer uma solução completa de captação e gerenciamento de leads imobiliários via WhatsApp.

## Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTE                              │
│                    (Navegador Web)                          │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    FRONTEND                                 │
│              Next.js 14+ (App Router)                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Dashboard | Números | Conversas | Leads | ROI      │   │
│  └──────────────────────────────────────────────────────┘   │
└────────┬──────────────┬──────────────┬──────────────────────┘
         │              │              │
    ┌────▼────┐    ┌────▼────┐    ┌────▼────┐
    │Evolution│    │   n8n   │    │PostgreSQL│
    │   API   │    │         │    │          │
    └────┬────┘    └────┬────┘    └────┬────┘
         │              │              │
    ┌────▼──────────────▼──────────────▼────┐
    │         WhatsApp Business API          │
    │         (Múltiplos Números)            │
    └────────────────────────────────────────┘
```

## Componentes Principais

### 1. Frontend (Next.js)

**Tecnologias:**
- Next.js 14+ com App Router
- React 18+
- Tailwind CSS
- shadcn/ui (componentes)
- Recharts (gráficos)
- Socket.io Client (WebSocket)

**Responsabilidades:**
- Interface do usuário
- Dashboard com métricas
- Gerenciamento de números WhatsApp
- Visualização de conversas
- Exportação de leads
- Cálculo e exibição de ROI

**Estrutura:**
```
frontend/
├── app/
│   ├── (auth)/          # Rotas de autenticação
│   ├── dashboard/        # Dashboard principal
│   ├── numbers/          # Gerenciamento de números
│   ├── conversations/    # Conversas ao vivo
│   ├── leads/            # Leads qualificados
│   ├── roi/              # Anúncios e ROI
│   └── settings/         # Configurações
├── components/
│   ├── ui/               # Componentes shadcn/ui
│   ├── dashboard/        # Componentes do dashboard
│   ├── chat/             # Componentes de chat
│   └── charts/           # Componentes de gráficos
├── lib/
│   ├── api/              # Clientes de API
│   ├── utils/            # Utilitários
│   └── hooks/            # React hooks customizados
└── public/               # Assets estáticos
```

### 2. Evolution API

**Tecnologias:**
- Node.js
- TypeScript
- Baileys (WhatsApp Web API)

**Responsabilidades:**
- Gerenciar conexões WhatsApp
- Enviar e receber mensagens
- Gerenciar múltiplos números
- Webhook para eventos
- QR Code para conexão

**Endpoints Principais:**
- `POST /instance/create` - Criar instância
- `GET /instance/connect/{instance}` - Obter QR Code
- `POST /message/sendText/{instance}` - Enviar mensagem
- `GET /chat/fetchChats/{instance}` - Listar conversas
- `WebSocket` - Eventos em tempo real

### 3. n8n (Automação)

**Tecnologias:**
- Node.js
- Workflow Engine

**Responsabilidades:**
- Funil de mensagens automáticas
- Extração de dados dos leads
- Qualificação de leads
- Integração com APIs externas
- Notificações e alertas
- Sincronização com banco de dados

**Workflows Principais:**
1. **Funil de Mensagens:**
   - Recebe mensagem → Responde automaticamente → Coleta dados → Qualifica lead

2. **Extração de Dados:**
   - Analisa mensagens → Extrai bairro, orçamento, tipo de imóvel → Salva no banco

3. **Qualificação:**
   - Verifica critérios → Marca como qualificado → Notifica equipe

4. **ROI Calculation:**
   - Busca dados Facebook Ads → Calcula CPA → Atualiza dashboard

### 4. PostgreSQL

**Responsabilidades:**
- Armazenar leads
- Armazenar conversas
- Armazenar configurações
- Armazenar métricas e histórico

**Schema Principal:**
```sql
-- Leads
leads (
  id, phone, name, email, 
  bairro, orçamento, tipo_imovel,
  status, qualificado, created_at
)

-- Conversas
conversations (
  id, instance_id, phone, 
  messages, status, created_at
)

-- Números WhatsApp
whatsapp_numbers (
  id, instance_id, phone, 
  status, proxy, connected_at
)

-- Métricas
metrics (
  id, date, leads_count, 
  cpa, roi, ad_spend
)
```

## Fluxo de Dados

### 1. Recebimento de Mensagem

```
WhatsApp → Evolution API → n8n Webhook → 
Processamento → Extração de Dados → 
PostgreSQL → Frontend (via WebSocket)
```

### 2. Envio de Mensagem

```
Frontend → Evolution API → WhatsApp → 
Confirmação → n8n (log) → PostgreSQL
```

### 3. Cálculo de ROI

```
Facebook Ads API → n8n (scheduled) → 
Cálculo CPA/ROI → PostgreSQL → 
Frontend (atualização em tempo real)
```

## Segurança

### Anti-Ban WhatsApp

1. **Proxies Residenciais:**
   - Um IP fixo brasileiro por número
   - Rotação quando necessário

2. **Perfis de Navegador:**
   - Incogniton para gerenciar múltiplos perfis
   - Fingerprints únicos

3. **Comportamento Humano:**
   - Delays aleatórios entre mensagens
   - Horários de envio variados
   - Limite de mensagens por dia

### Segurança da Aplicação

1. **Autenticação:**
   - JWT tokens
   - Refresh tokens
   - Rate limiting

2. **HTTPS:**
   - SSL/TLS obrigatório
   - Certificados válidos

3. **Backup:**
   - Backup automático do banco
   - Retenção de 30 dias

## Escalabilidade

### Horizontal

- Múltiplas instâncias do Evolution API
- Load balancer para frontend
- Replicação do PostgreSQL

### Vertical

- Aumentar recursos do VPS
- Otimização de queries
- Cache com Redis

## Monitoramento

- Logs centralizados
- Métricas de performance
- Alertas de falhas
- Dashboard de saúde do sistema

## Integrações Futuras

- CRM (Pipedrive, HubSpot)
- Email marketing
- SMS gateway
- Analytics avançado

