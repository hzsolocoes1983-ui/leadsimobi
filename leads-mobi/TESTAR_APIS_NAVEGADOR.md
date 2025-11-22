# 🌐 Como Testar APIs no Navegador

## ⚠️ Problema com PowerShell

As APIs estão retornando erro 401 quando testadas via PowerShell, mas isso pode ser um comportamento de segurança do Next.js em desenvolvimento.

## ✅ Solução: Testar no Navegador

### URLs para Testar

1. **Health Check**
   ```
   http://localhost:3001/api/health
   ```
   Deve retornar status do sistema e conexão com banco.

2. **Listar Leads**
   ```
   http://localhost:3001/api/leads
   ```
   Deve retornar os 4 leads criados no banco.

3. **Listar Números**
   ```
   http://localhost:3001/api/numbers
   ```
   Deve retornar os 3 números WhatsApp criados.

4. **Métricas**
   ```
   http://localhost:3001/api/metrics
   ```
   Deve retornar métricas calculadas dos dados reais.

---

## 📊 Dados Criados no Banco

### Leads (4 total)
1. João Silva - Centro - R$ 300k-400k - Qualificado
2. Maria Santos - Jardim América - R$ 500k-600k - Em Contato
3. Pedro Costa - Vila Nova - R$ 200k-300k - Novo
4. Ana Oliveira - Alto da Boa Vista - R$ 400k-500k - Convertido

### Números WhatsApp (3 total)
1. WhatsApp Business #1 - Conectado
2. WhatsApp Business #2 - Conectado
3. WhatsApp Business #3 - Desconectado

---

## 🔧 Como Testar

### Opção 1: Navegador Direto
1. Abra o navegador
2. Digite a URL da API
3. Veja o JSON retornado

### Opção 2: DevTools (F12)
1. Abra http://localhost:3001
2. Pressione F12
3. Vá para a aba "Console"
4. Digite:
   ```javascript
   fetch('/api/leads')
     .then(r => r.json())
     .then(console.log)
   ```

### Opção 3: Extensão do Navegador
- Use extensões como "JSON Formatter" ou "REST Client"
- Facilita visualização do JSON

---

## ✅ O Que Esperar

### /api/health
```json
{
  "status": "ok",
  "timestamp": "...",
  "database": {
    "success": true,
    "time": "..."
  }
}
```

### /api/leads
```json
[
  {
    "id": "...",
    "name": "João Silva",
    "phone": "5511999999999",
    "email": "joao@email.com",
    "bairro": "Centro",
    "orcamento_min": 300000,
    "orcamento_max": 400000,
    "status": "qualificado"
  },
  ...
]
```

### /api/numbers
```json
[
  {
    "id": "...",
    "name": "WhatsApp Business #1",
    "phone": "+55 11 98765-4321",
    "status": "connected"
  },
  ...
]
```

### /api/metrics
```json
{
  "today": {
    "leads": 4,
    "activeNumbers": 2,
    "cpa": 0,
    "roi": 0
  },
  "charts": {
    "leads": [...],
    "byBairro": [...]
  }
}
```

---

## 🎯 Próximo Passo

Após confirmar que as APIs funcionam no navegador:
1. Atualizar frontend para usar dados reais
2. Substituir dados mockados por chamadas à API
3. Ver dados reais no dashboard

---

**Teste no navegador para confirmar funcionamento!** 🌐

