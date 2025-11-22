# Plano de Ação - M13X Leads

## 📋 Análise da Ideia

### Visão Geral
O **M13X Leads** é um sistema self-hosted completo para:
- Captação e gerenciamento de leads imobiliários
- Automação de campanhas via WhatsApp (múltiplos números)
- Dashboard centralizado com métricas e ROI
- Prevenção de banimentos do WhatsApp
- Integração com Facebook Ads

### Stack Tecnológica (Proposta Premium)
- **Frontend:** Next.js 14+ com Tailwind CSS e shadcn/ui
- **Backend:** Evolution API v2 (self-hosted)
- **Automação:** n8n (self-hosted)
- **Banco de Dados:** PostgreSQL (Docker)
- **Hospedagem:** VPS Hetzner Cloud
- **Proxies:** Proxies residenciais estáticos (BR)
- **Anti-Ban:** Incogniton (perfis de navegador)

---

## 🚀 Como Iniciar o Projeto

### Fase 1: Preparação e Estruturação (Dia 1)

#### 1.1 Estrutura de Pastas
```
leadsimobi/
├── frontend/              # Painel Next.js
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── public/
├── backend/               # APIs e integrações
│   ├── evolution-api/    # Configurações Evolution API
│   ├── n8n/              # Workflows de automação
│   └── scripts/          # Scripts de instalação
├── docker/               # Dockerfiles e configs
├── docs/                 # Documentação
└── scripts/              # Scripts de deploy e setup
```

#### 1.2 Configurações Iniciais
- [ ] Criar `package.json` para o frontend
- [ ] Criar `docker-compose.yml` para serviços
- [ ] Criar scripts de instalação (`.sh`)
- [ ] Configurar variáveis de ambiente (`.env.example`)

### Fase 2: Setup da Infraestrutura (Dias 1-2)

#### 2.1 Servidor VPS
- [ ] Provisionar VPS Hetzner (CPX31 ou superior)
- [ ] Configurar firewall e segurança
- [ ] Instalar Docker e Docker Compose
- [ ] Configurar domínio e SSL (opcional)

#### 2.2 Serviços Base
- [ ] Instalar Evolution API v2
- [ ] Instalar n8n
- [ ] Configurar PostgreSQL
- [ ] Testar conectividade entre serviços

### Fase 3: Desenvolvimento do Frontend (Dias 3-5)

#### 3.1 Setup Next.js
- [ ] Inicializar projeto Next.js 14+ (App Router)
- [ ] Configurar Tailwind CSS
- [ ] Instalar shadcn/ui
- [ ] Configurar tema cyberpunk (preto, cinza, laranja #FF4500)

#### 3.2 Componentes Principais
- [ ] Dashboard com métricas em tempo real
- [ ] Gerenciamento de números WhatsApp
- [ ] Interface de conversas ao vivo
- [ ] Tabela de leads qualificados
- [ ] Integração Facebook Ads (ROI)
- [ ] Página de configurações

#### 3.3 Integrações
- [ ] API Evolution (WebSocket para mensagens)
- [ ] API n8n (triggers e workflows)
- [ ] Facebook Ads API
- [ ] Sistema de autenticação

### Fase 4: Automação n8n (Dias 4-5)

#### 4.1 Workflows
- [ ] Funil de mensagens automáticas
- [ ] Extração de dados dos leads
- [ ] Qualificação de leads
- [ ] Notificações e alertas
- [ ] Sincronização com banco de dados

### Fase 5: Testes e Otimização (Dia 6)

#### 5.1 Testes
- [ ] Testar com números reais de WhatsApp
- [ ] Validar fluxo de automação
- [ ] Testar prevenção de banimentos
- [ ] Validar cálculo de ROI

#### 5.2 Otimizações
- [ ] Ajustar timing das mensagens
- [ ] Otimizar queries do banco
- [ ] Melhorar performance do frontend

### Fase 6: Documentação e Entrega (Dia 7)

#### 6.1 Documentação
- [ ] README completo
- [ ] Guia de instalação
- [ ] Manual do usuário
- [ ] Documentação da API

#### 6.2 Entrega
- [ ] Deploy final
- [ ] Treinamento do cliente
- [ ] Início do suporte

---

## 📦 Dependências Principais

### Frontend
```json
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "tailwindcss": "^3.4.0",
  "@radix-ui/react-*": "latest",
  "recharts": "^2.10.0",
  "socket.io-client": "^4.7.0",
  "axios": "^1.6.0"
}
```

### Backend/Serviços
- Evolution API v2 (Docker)
- n8n (Docker)
- PostgreSQL 15+ (Docker)
- Redis (opcional, para cache)

---

## 🔧 Scripts de Instalação Necessários

1. **setup-server.sh** - Configuração inicial do VPS
2. **install-docker.sh** - Instalação do Docker
3. **deploy-services.sh** - Deploy dos serviços Docker
4. **setup-evolution.sh** - Configuração da Evolution API
5. **setup-n8n.sh** - Configuração do n8n

---

## 🎨 Identidade Visual

- **Cores:**
  - Preto: `#000000`
  - Cinza Escuro: `#1a1a1a` ou `#2d2d2d`
  - Laranja Neon: `#FF4500`
- **Tema:** Cyberpunk de luxo
- **Logo:** Minimalista

---

## 📊 Funcionalidades do Dashboard

1. **Métricas em Tempo Real**
   - Leads hoje
   - CPA médio
   - ROI do mês
   - Gráficos de leads por bairro/orçamento

2. **Gerenciamento de Números**
   - Lista de chips conectados
   - Status Online/Offline
   - Conexão via QR Code

3. **Conversas ao Vivo**
   - Interface tipo WhatsApp Web
   - Monitoramento em tempo real
   - Intervenção manual

4. **Leads Qualificados**
   - Tabela filtrada
   - Exportação de dados
   - Filtros por bairro/orçamento

5. **Anúncios & ROI**
   - Integração Facebook Ads
   - Gasto diário
   - Cálculo automático de ROI

---

## ⚠️ Considerações Importantes

1. **Anti-Ban:**
   - Usar proxies residenciais estáticos
   - Rotacionar perfis com Incogniton
   - Limitar taxa de mensagens
   - Simular comportamento humano

2. **Segurança:**
   - HTTPS obrigatório
   - Autenticação robusta
   - Backup automático do banco
   - Logs de auditoria

3. **Escalabilidade:**
   - Arquitetura modular
   - Cache quando necessário
   - Otimização de queries
   - Monitoramento de recursos

---

## 📝 Próximos Passos Imediatos

1. ✅ Criar estrutura de pastas
2. ✅ Criar este plano de ação
3. ⏭️ Inicializar projeto Next.js
4. ⏭️ Criar docker-compose.yml
5. ⏭️ Criar scripts de instalação
6. ⏭️ Configurar variáveis de ambiente

