# 🎯 Próximos Passos - M13X Leads

## ✅ O Que Já Está Pronto

1. ✅ Frontend completo com todas as páginas
2. ✅ Banco de dados PostgreSQL rodando
3. ✅ Schema criado com todas as tabelas
4. ✅ API Routes criadas (numbers, leads, metrics, health)
5. ✅ Cliente Evolution API criado
6. ✅ Serviços Docker iniciados

## 🔄 Status Atual dos Serviços

- ✅ PostgreSQL: Rodando (healthy)
- ✅ Redis: Rodando (healthy)
- ⚠️ Evolution API: Reiniciando (verificar logs)
- ✅ n8n: Iniciando

## 📋 Próximos Passos (Ordem de Prioridade)

### 1. **Verificar e Corrigir Evolution API** (URGENTE)

A Evolution API está reiniciando. Precisamos verificar os logs:

```powershell
docker logs leadsimobi-evolution-api --tail 50
```

**Possíveis problemas:**
- Variáveis de ambiente não configuradas
- Erro de conexão com banco
- Porta já em uso

### 2. **Integrar Frontend com APIs Reais** (PRIORIDADE ALTA)

Substituir dados mockados por chamadas reais às APIs:

#### 2.1 Dashboard
- [ ] Buscar métricas de `/api/metrics`
- [ ] Atualizar gráficos com dados reais
- [ ] Adicionar loading states

#### 2.2 Números WhatsApp
- [ ] Buscar números de `/api/numbers`
- [ ] Integrar com Evolution API para QR Code
- [ ] Atualizar status em tempo real

#### 2.3 Leads
- [ ] Buscar leads de `/api/leads`
- [ ] Implementar filtros funcionais
- [ ] Adicionar paginação

#### 2.4 Conversas
- [ ] Buscar conversas do banco
- [ ] Integrar WebSocket para tempo real
- [ ] Enviar mensagens via Evolution API

### 3. **Criar Hooks React** (PRIORIDADE ALTA)

Criar hooks customizados para facilitar o uso das APIs:

- [ ] `useNumbers()` - Gerenciar números WhatsApp
- [ ] `useLeads()` - Gerenciar leads
- [ ] `useMetrics()` - Buscar métricas
- [ ] `useConversations()` - Gerenciar conversas

### 4. **Testar Conexão com Banco** (PRIORIDADE MÉDIA)

- [ ] Testar API `/api/health`
- [ ] Verificar se consegue ler/escrever no banco
- [ ] Testar criação de lead

### 5. **Conectar Número WhatsApp Real** (PRIORIDADE MÉDIA)

- [ ] Criar instância na Evolution API
- [ ] Obter QR Code
- [ ] Conectar número
- [ ] Testar envio de mensagem

### 6. **Configurar n8n Workflows** (PRIORIDADE BAIXA)

- [ ] Criar workflow básico
- [ ] Configurar webhook da Evolution API
- [ ] Testar automação

---

## 🚀 Começando Agora

Vamos começar pelo mais importante:

1. **Verificar Evolution API**
2. **Criar hooks React**
3. **Integrar Dashboard com API real**

---

## 📝 Checklist de Integração

### Dashboard
- [ ] Substituir dados mockados
- [ ] Adicionar useEffect para buscar dados
- [ ] Adicionar loading state
- [ ] Tratar erros

### Números
- [ ] Buscar números da API
- [ ] Integrar botão "Conectar" com Evolution API
- [ ] Mostrar QR Code real
- [ ] Atualizar status

### Leads
- [ ] Buscar leads da API
- [ ] Implementar busca funcional
- [ ] Implementar filtros
- [ ] Adicionar paginação

### Conversas
- [ ] Buscar conversas da API
- [ ] Integrar envio de mensagens
- [ ] Adicionar WebSocket (opcional)

---

## 🔧 Comandos Úteis

```powershell
# Ver logs da Evolution API
docker logs leadsimobi-evolution-api --tail 50

# Reiniciar Evolution API
docker restart leadsimobi-evolution-api

# Testar API de saúde
curl http://localhost:3000/api/health

# Ver containers rodando
docker ps --filter "name=leadsimobi"
```

---

## ⚠️ Problemas Conhecidos

1. **Evolution API reiniciando**
   - Verificar logs
   - Verificar variáveis de ambiente
   - Verificar conexão com banco

2. **Frontend usando dados mockados**
   - Substituir por chamadas de API
   - Criar hooks React

3. **n8n ainda não configurado**
   - Acessar http://localhost:5678
   - Criar workflows básicos

