# 🎯 Prioridades de Desenvolvimento - M13X Leads

## Estado Atual
- ✅ Frontend completo com UI/UX
- ✅ Estrutura de pastas criada
- ✅ Docker Compose configurado
- ❌ Backend API não existe
- ❌ Serviços Docker não estão rodando
- ❌ Banco de dados não está configurado
- ❌ Integrações não estão funcionando

---

## 📋 PRIORIDADE 1: Backend API (CRÍTICO)

### Por que primeiro?
- Frontend precisa de uma API para funcionar
- Sem backend, não há como salvar/ler dados
- Evolution API precisa de um proxy/abstração

### O que fazer:
1. **Criar API Routes no Next.js** (`frontend/app/api/`)
   - `/api/numbers` - Gerenciar números WhatsApp
   - `/api/conversations` - Gerenciar conversas
   - `/api/leads` - CRUD de leads
   - `/api/metrics` - Métricas e estatísticas
   - `/api/evolution/*` - Proxy para Evolution API

2. **Criar cliente Evolution API** (`frontend/lib/api/evolution.ts`)
   - Funções para conectar números
   - Enviar/receber mensagens
   - Obter QR Code
   - WebSocket para eventos

3. **Criar schema do banco** (`backend/scripts/schema.sql`)
   - Tabelas: leads, conversations, whatsapp_numbers, metrics

---

## 📋 PRIORIDADE 2: Configurar Serviços Docker

### Por que segundo?
- Backend precisa do banco de dados
- Evolution API precisa estar rodando
- n8n precisa estar configurado

### O que fazer:
1. **Criar arquivo .env** (copiar de env.example)
2. **Iniciar serviços básicos:**
   ```bash
   docker-compose up -d postgres redis
   ```
3. **Criar schema no banco:**
   ```bash
   docker exec -i leadsimobi-postgres psql -U leadsimobi_user -d leadsimobi < backend/scripts/schema.sql
   ```
4. **Iniciar Evolution API:**
   ```bash
   docker-compose up -d evolution-api
   ```
5. **Iniciar n8n:**
   ```bash
   docker-compose up -d n8n
   ```

---

## 📋 PRIORIDADE 3: Integração Frontend ↔ Backend

### Por que terceiro?
- Frontend precisa se comunicar com backend
- Dados mockados precisam ser substituídos

### O que fazer:
1. **Criar hooks React** (`frontend/lib/hooks/`)
   - `useNumbers.ts` - Gerenciar números
   - `useConversations.ts` - Gerenciar conversas
   - `useLeads.ts` - Gerenciar leads
   - `useMetrics.ts` - Buscar métricas

2. **Substituir dados mockados** nas páginas:
   - Dashboard → Buscar dados reais
   - Números → Listar números reais
   - Conversas → Carregar conversas reais
   - Leads → Buscar leads do banco

3. **Adicionar WebSocket** para tempo real:
   - Novas mensagens
   - Status de números
   - Atualizações de leads

---

## 📋 PRIORIDADE 4: Automação n8n

### Por que quarto?
- Sistema precisa funcionar primeiro
- Automação é um "nice to have" inicial

### O que fazer:
1. **Criar workflow básico:**
   - Receber webhook da Evolution API
   - Processar mensagem
   - Extrair dados do lead
   - Salvar no banco

2. **Configurar webhooks:**
   - Evolution API → n8n
   - n8n → Frontend (opcional)

---

## 📋 PRIORIDADE 5: Integração Facebook Ads

### Por que quinto?
- Funcionalidade secundária
- Sistema precisa estar estável primeiro

### O que fazer:
1. **Criar API Route** `/api/facebook-ads`
2. **Buscar dados da API do Facebook**
3. **Calcular ROI e CPA**
4. **Atualizar dashboard**

---

## 🚀 Plano de Execução Imediato

### Hoje (Prioridade 1):
1. ✅ Criar estrutura de API Routes
2. ✅ Criar cliente Evolution API
3. ✅ Criar schema do banco
4. ✅ Criar funções de conexão com banco

### Amanhã (Prioridade 2):
1. ⏭️ Configurar .env
2. ⏭️ Iniciar serviços Docker
3. ⏭️ Testar conexão com banco
4. ⏭️ Testar Evolution API

### Depois (Prioridade 3):
1. ⏭️ Integrar frontend com backend
2. ⏭️ Substituir dados mockados
3. ⏭️ Adicionar WebSocket

---

## ⚠️ Bloqueadores

- **Sem backend API**: Frontend não funciona de verdade
- **Sem banco de dados**: Não há onde salvar dados
- **Sem Evolution API rodando**: Não há como conectar WhatsApp
- **Sem integração**: Frontend e backend não se comunicam

---

## ✅ Checklist de Início

- [ ] Criar API Routes no Next.js
- [ ] Criar cliente Evolution API
- [ ] Criar schema do banco de dados
- [ ] Configurar arquivo .env
- [ ] Iniciar PostgreSQL
- [ ] Criar tabelas no banco
- [ ] Iniciar Evolution API
- [ ] Testar conexão Evolution API
- [ ] Integrar frontend com API
- [ ] Substituir dados mockados

