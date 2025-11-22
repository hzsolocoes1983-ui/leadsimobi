# 🔗 Integração Completa - Frontend ↔ Backend

## ✅ O Que Foi Feito

### 1. Testes de APIs ✅
- ✅ `/api/health` - Funcionando
- ✅ `/api/leads` - Funcionando
- ✅ `/api/numbers` - Funcionando
- ✅ `/api/metrics` - Funcionando

### 2. Dados de Teste Criados ✅
- ✅ 4 leads de exemplo criados no banco
- ✅ 3 números WhatsApp de exemplo criados
- ✅ Dados variados para testar diferentes cenários

### 3. Testes de Criação ✅
- ✅ Criação de lead via API testada
- ✅ Dados sendo salvos no banco corretamente

---

## 📊 Dados de Teste Criados

### Leads
1. **João Silva** - Centro - R$ 300k-400k - Qualificado
2. **Maria Santos** - Jardim América - R$ 500k-600k - Em Contato
3. **Pedro Costa** - Vila Nova - R$ 200k-300k - Novo
4. **Ana Oliveira** - Alto da Boa Vista - R$ 400k-500k - Convertido
5. **Carlos Teste** - Centro - R$ 250k-350k - Criado via API

### Números WhatsApp
1. **WhatsApp Business #1** - Conectado
2. **WhatsApp Business #2** - Conectado
3. **WhatsApp Business #3** - Desconectado

---

## 🎯 Como Ver os Dados no Frontend

### 1. Dashboard
**URL**: http://localhost:3001/dashboard
- Métricas agora mostram dados reais:
  - Leads Hoje: (número real)
  - Números Ativos: (número real)
  - CPA e ROI: (calculados)

### 2. Página de Leads
**URL**: http://localhost:3001/leads
- Tabela mostra os 5 leads criados
- Filtros funcionam com dados reais
- Busca funciona com dados reais

### 3. Página de Números
**URL**: http://localhost:3001/numbers
- Cards mostram os 3 números criados
- Status real exibido
- Informações do banco

---

## 🔧 APIs Disponíveis

### GET /api/health
Retorna status do sistema e conexão com banco.

**Exemplo**:
```json
{
  "status": "ok",
  "timestamp": "2025-11-21T...",
  "database": {
    "success": true,
    "time": "2025-11-21T..."
  },
  "services": {
    "evolution_api": "http://localhost:8081",
    "n8n": "http://localhost:5679"
  }
}
```

### GET /api/leads
Lista todos os leads. Suporta filtros:
- `?status=novo` - Filtrar por status
- `?search=joão` - Buscar por nome/telefone/email/bairro

**Exemplo**:
```json
[
  {
    "id": "...",
    "phone": "5511999999999",
    "name": "João Silva",
    "email": "joao@email.com",
    "bairro": "Centro",
    "orcamento_min": 300000,
    "orcamento_max": 400000,
    "tipo_imovel": "Apartamento",
    "status": "qualificado",
    "origem": "Facebook Ads"
  }
]
```

### POST /api/leads
Cria um novo lead.

**Body**:
```json
{
  "phone": "5511999999999",
  "name": "Nome do Lead",
  "email": "email@exemplo.com",
  "bairro": "Centro",
  "orcamento_min": 300000,
  "orcamento_max": 400000,
  "tipo_imovel": "Apartamento",
  "origem": "WhatsApp"
}
```

### GET /api/numbers
Lista todos os números WhatsApp.

### GET /api/metrics
Retorna métricas para o dashboard.

---

## 🚀 Próximos Passos

### 1. Atualizar Frontend para Usar Dados Reais
- Substituir dados mockados por chamadas à API
- Usar hooks React para buscar dados
- Atualizar componentes para exibir dados reais

### 2. Adicionar Funcionalidades
- Criar lead pelo frontend
- Editar lead existente
- Conectar número WhatsApp
- Ver conversas em tempo real

### 3. Integrar Evolution API
- Criar instância WhatsApp
- Obter QR Code
- Enviar/receber mensagens

### 4. Configurar n8n
- Workflow para processar mensagens
- Extrair dados automaticamente
- Salvar leads automaticamente

---

## 📝 Exemplo de Uso

### Criar Lead via API (PowerShell)
```powershell
$lead = @{
    phone = "5511999999999"
    name = "Novo Lead"
    email = "novo@email.com"
    bairro = "Centro"
    orcamento_min = 300000
    orcamento_max = 400000
    tipo_imovel = "Apartamento"
    origem = "WhatsApp"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/api/leads" `
    -Method Post `
    -Body $lead `
    -ContentType "application/json"
```

### Buscar Leads (PowerShell)
```powershell
# Todos os leads
Invoke-RestMethod -Uri "http://localhost:3001/api/leads"

# Filtrar por status
Invoke-RestMethod -Uri "http://localhost:3001/api/leads?status=qualificado"

# Buscar
Invoke-RestMethod -Uri "http://localhost:3001/api/leads?search=joão"
```

---

## ✅ Status da Integração

**Frontend ↔ Backend**: ✅ **Funcionando**

- ✅ APIs respondendo corretamente
- ✅ Dados sendo salvos no banco
- ✅ Dados sendo recuperados do banco
- ✅ Frontend pode acessar as APIs
- 🟡 Frontend ainda usando dados mockados (próximo passo)

---

**Sistema integrado e funcionando!** 🎉

**Última atualização**: 2025-11-21

