# 📋 Processos Necessários - M13X Leads

## ✅ Status Atual do Projeto

### Docker Independente Configurado
- ✅ **docker-compose.leads.yml** criado com portas exclusivas
- ✅ **.env** criado com senhas seguras geradas automaticamente
- ✅ **Rede isolada**: `leadsimobi-network`
- ✅ **Volumes isolados**: Todos com prefixo `leadsimobi_*`

### Portas Configuradas (Evitando Conflitos)
- **PostgreSQL**: `5433` (externa) → `5432` (interna)
- **Redis**: `6380` (externa) → `6379` (interna)
- **Evolution API**: `8081` (externa) → `8080` (interna)
- **n8n**: `5679` (externa) → `5678` (interna)
- **Frontend**: `3001` (externa) → `3000` (interna)

---

## 🚀 Processos Necessários para Completar o Projeto

### 1. ✅ **Infraestrutura Docker** (CONCLUÍDO)
- [x] Criar docker-compose dedicado
- [x] Configurar portas exclusivas
- [x] Criar arquivo .env com senhas seguras
- [x] Iniciar PostgreSQL e Redis
- [x] Criar schema do banco de dados
- [x] Iniciar Evolution API
- [x] Iniciar n8n

### 2. ⏳ **Frontend** (PENDENTE)
- [ ] Iniciar container do frontend (pode demorar no primeiro build)
- [ ] Verificar se Next.js está rodando corretamente
- [ ] Testar acesso em `http://localhost:3001`

### 3. ⏳ **Integração Evolution API** (PENDENTE)
- [ ] Testar conexão com Evolution API em `http://localhost:8081`
- [ ] Verificar autenticação com API Key
- [ ] Testar criação de instância WhatsApp
- [ ] Testar obtenção de QR Code

### 4. ⏳ **Integração n8n** (PENDENTE)
- [ ] Acessar n8n em `http://localhost:5679`
- [ ] Configurar autenticação básica (admin / senha do .env)
- [ ] Criar workflow básico para processar mensagens
- [ ] Configurar webhook da Evolution API → n8n

### 5. ⏳ **Backend API Routes** (PENDENTE)
- [ ] Verificar se todas as rotas `/api/*` estão funcionando
- [ ] Testar `/api/numbers` - Listar/criar números
- [ ] Testar `/api/leads` - CRUD de leads
- [ ] Testar `/api/metrics` - Métricas e estatísticas
- [ ] Testar `/api/conversations` - Gerenciar conversas

### 6. ⏳ **Integração Frontend ↔ Backend** (PENDENTE)
- [ ] Substituir dados mockados por chamadas reais à API
- [ ] Testar dashboard com dados reais
- [ ] Testar página de números WhatsApp
- [ ] Testar página de conversas
- [ ] Testar página de leads

### 7. ⏳ **WebSocket / Tempo Real** (PENDENTE)
- [ ] Implementar WebSocket para mensagens em tempo real
- [ ] Atualizar status de números em tempo real
- [ ] Notificações de novos leads

### 8. ⏳ **Automação n8n** (PENDENTE)
- [ ] Criar workflow para receber mensagens
- [ ] Extrair dados do lead (nome, bairro, orçamento)
- [ ] Salvar leads no banco de dados
- [ ] Enviar respostas automáticas

### 9. ⏳ **Integração Facebook Ads** (OPCIONAL)
- [ ] Configurar credenciais Facebook Ads API
- [ ] Buscar dados de gastos diários
- [ ] Calcular CPA e ROI automaticamente
- [ ] Exibir no dashboard

### 10. ⏳ **Autenticação** (PENDENTE)
- [ ] Implementar sistema de login
- [ ] Proteger rotas da API
- [ ] Gerenciar sessões

---

## 🔧 Comandos Úteis

### Iniciar todos os serviços
```bash
docker compose -f docker-compose.leads.yml --project-name leadsimobi up -d
```

### Ver logs
```bash
docker compose -f docker-compose.leads.yml --project-name leadsimobi logs -f
```

### Parar todos os serviços
```bash
docker compose -f docker-compose.leads.yml --project-name leadsimobi down
```

### Ver status dos containers
```bash
docker compose -f docker-compose.leads.yml --project-name leadsimobi ps
```

### Reiniciar um serviço específico
```bash
docker compose -f docker-compose.leads.yml --project-name leadsimobi restart evolution-api
```

### Acessar banco de dados
```bash
docker compose -f docker-compose.leads.yml --project-name leadsimobi exec postgres psql -U leadsimobi_user -d leadsimobi
```

---

## 📊 Acessos

- **Frontend**: http://localhost:3001
- **Evolution API**: http://localhost:8081
- **n8n**: http://localhost:5679
- **PostgreSQL**: localhost:5433
- **Redis**: localhost:6380

---

## ⚠️ Próximos Passos Imediatos

1. **Iniciar Frontend** (pode demorar ~5-10 minutos no primeiro build)
2. **Testar Evolution API** - Verificar se está respondendo
3. **Configurar n8n** - Acessar e criar primeiro workflow
4. **Testar API Routes** - Verificar se todas estão funcionando
5. **Integrar Frontend** - Substituir dados mockados

---

## 📝 Notas Importantes

- Todos os containers estão isolados com prefixo `leadsimobi-*`
- As portas foram alteradas para evitar conflitos com outros projetos
- O arquivo `.env` contém senhas geradas automaticamente (não commitado)
- O banco de dados já tem o schema criado e pronto para uso
- O projeto está totalmente independente de outros sistemas Docker

---

**Última atualização**: 2025-11-21

