# 🎯 Próximo Passo - M13X Leads

## ✅ O Que Acabamos de Fazer

1. ✅ Corrigimos a Evolution API (conexão com banco)
2. ✅ Criamos hooks React (`useNumbers`, `useLeads`, `useMetrics`)
3. ✅ Todos os serviços estão rodando

## 🚀 PRÓXIMO PASSO: Integrar Frontend com APIs

### Opção 1: Começar pelo Dashboard (RECOMENDADO)

O Dashboard é o mais simples e não depende da Evolution API.

**O que fazer:**
1. Abrir `frontend/app/dashboard/page.tsx`
2. Substituir dados mockados por chamada à API
3. Usar o hook `useMetrics()` que já criamos

**Tempo estimado:** 10-15 minutos

### Opção 2: Começar pela Página de Leads

Também é simples e não depende da Evolution API.

**O que fazer:**
1. Abrir `frontend/app/leads/page.tsx`
2. Substituir `mockLeads` por `useLeads()`
3. Testar busca e filtros

**Tempo estimado:** 15-20 minutos

### Opção 3: Testar APIs Primeiro

Verificar se as APIs estão funcionando antes de integrar.

**O que fazer:**
1. Testar: http://localhost:3000/api/health
2. Testar: http://localhost:3000/api/leads
3. Testar: http://localhost:3000/api/metrics

**Tempo estimado:** 5 minutos

---

## 📋 Recomendação

**Comece testando as APIs primeiro** (Opção 3), depois integre o Dashboard (Opção 1).

Isso garante que tudo está funcionando antes de fazer mudanças maiores.

---

## 🔧 Como Testar as APIs

Abra no navegador ou use curl:

1. **Health Check:**
   ```
   http://localhost:3000/api/health
   ```

2. **Leads:**
   ```
   http://localhost:3000/api/leads
   ```

3. **Métricas:**
   ```
   http://localhost:3000/api/metrics
   ```

---

## 💡 Dica

O frontend já está rodando em **http://localhost:3000**

Você pode:
- Ver a interface funcionando
- Testar as APIs
- Depois integrar tudo

---

## ⏭️ Depois de Integrar

1. Testar criação de lead
2. Testar busca de números
3. Conectar número WhatsApp real
4. Configurar n8n

