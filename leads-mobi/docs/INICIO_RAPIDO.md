# 🚀 Início Rápido - M13X Leads

## ✅ Análise da Ideia - Resumo

### O que é o M13X Leads?

Um sistema **self-hosted** completo para captação e gerenciamento de leads imobiliários via WhatsApp, com:
- ✅ Automação de campanhas (múltiplos números)
- ✅ Dashboard centralizado com métricas
- ✅ Prevenção de banimentos
- ✅ Cálculo automático de ROI
- ✅ Integração com Facebook Ads

### Por que é uma boa ideia?

1. **Custo-benefício:** R$ 489-550/mês vs R$ 2.000-5.000/mês de soluções SaaS
2. **Controle total:** Dados próprios, sem dependência de terceiros
3. **Escalável:** Suporta 20-50+ números WhatsApp
4. **Customizável:** Interface totalmente personalizada
5. **Mercado:** Setor imobiliário em crescimento constante

---

## 📋 Status Atual do Projeto

### ✅ O que já foi criado:

1. **Estrutura de Pastas:**
   ```
   leadsimobi/
   ├── frontend/          # Painel Next.js (a criar)
   ├── backend/          # APIs e integrações
   ├── docker/           # Dockerfiles
   ├── docs/             # Documentação
   └── scripts/          # Scripts de setup
   ```

2. **Documentação:**
   - ✅ README.md - Visão geral do projeto
   - ✅ PLANO_DE_ACAO.md - Plano detalhado de implementação
   - ✅ ARQUITETURA.md - Arquitetura técnica
   - ✅ INICIO_RAPIDO.md - Este arquivo

3. **Configurações:**
   - ✅ docker-compose.yml - Orquestração dos serviços
   - ✅ env.example - Variáveis de ambiente
   - ✅ .gitignore - Arquivos ignorados
   - ✅ scripts/setup-server.sh - Script de setup do servidor

---

## 🎯 Próximos Passos para Iniciar

### Opção 1: Desenvolvimento Local (Recomendado para começar)

#### 1. Preparar Ambiente Local

```bash
# Instalar Node.js 20+
# Instalar Docker Desktop
# Instalar Git
```

#### 2. Inicializar Frontend

```bash
cd frontend
npx create-next-app@latest . --typescript --tailwind --app
npm install @radix-ui/react-* recharts socket.io-client axios
npm install -D @types/node
```

#### 3. Configurar Variáveis

```bash
# Copiar arquivo de exemplo
cp env.example .env

# Editar .env com suas configurações
```

#### 4. Iniciar Serviços

```bash
# Iniciar apenas os serviços backend (Evolution API, n8n, PostgreSQL)
docker-compose up -d postgres redis evolution-api n8n

# Em outro terminal, iniciar frontend
cd frontend
npm run dev
```

### Opção 2: Deploy em VPS (Produção)

#### 1. Provisionar VPS

- **Recomendado:** Hetzner CPX31 (4 vCPU, 8GB RAM)
- **Alternativa:** Oracle Cloud Free Tier (limitado)

#### 2. Configurar Servidor

```bash
# Conectar via SSH
ssh root@seu-servidor

# Executar script de setup
chmod +x scripts/setup-server.sh
./scripts/setup-server.sh
```

#### 3. Deploy da Aplicação

```bash
# Clonar repositório no servidor
git clone <seu-repo> /opt/leadsimobi
cd /opt/leadsimobi

# Configurar .env
cp env.example .env
nano .env  # Editar com suas configurações

# Iniciar todos os serviços
docker-compose up -d
```

#### 4. Acessar Painel

```
http://seu-servidor:3000
```

---

## 🛠️ Checklist de Início

### Fase 1: Setup Básico
- [ ] Ambiente local configurado (Node.js, Docker)
- [ ] Repositório clonado
- [ ] Variáveis de ambiente configuradas (.env)
- [ ] Serviços Docker rodando (PostgreSQL, Redis)

### Fase 2: Evolution API
- [ ] Evolution API instalada e rodando
- [ ] Primeiro número WhatsApp conectado
- [ ] Teste de envio/recebimento de mensagem

### Fase 3: Frontend Básico
- [ ] Projeto Next.js inicializado
- [ ] Tema cyberpunk configurado (cores, fontes)
- [ ] Página de login/dashboard básica
- [ ] Integração com Evolution API

### Fase 4: Automação n8n
- [ ] n8n instalado e acessível
- [ ] Primeiro workflow criado (funil básico)
- [ ] Webhook configurado para receber mensagens
- [ ] Teste de automação funcionando

### Fase 5: Funcionalidades Core
- [ ] Dashboard com métricas básicas
- [ ] Gerenciamento de números WhatsApp
- [ ] Interface de conversas
- [ ] Tabela de leads

---

## 📚 Documentação de Referência

### Arquivos Importantes:

1. **PLANO_DE_ACAO.md** - Plano completo de implementação (7 dias)
2. **ARQUITETURA.md** - Detalhes técnicos da arquitetura
3. **README.md** - Visão geral e instruções gerais

### Links Úteis:

- [Evolution API Docs](https://doc.evolution-api.com/)
- [n8n Documentation](https://docs.n8n.io/)
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)

---

## 💡 Dicas Importantes

### Segurança
- ⚠️ **NUNCA** commite o arquivo `.env` no Git
- ⚠️ Altere todas as senhas padrão
- ⚠️ Use HTTPS em produção
- ⚠️ Configure firewall no servidor

### Anti-Ban WhatsApp
- Use proxies residenciais estáticos (BR)
- Limite taxa de mensagens (máx 50-100/dia por número)
- Adicione delays aleatórios entre mensagens
- Use perfis de navegador únicos (Incogniton)

### Performance
- Monitore uso de recursos do servidor
- Faça backup regular do banco de dados
- Configure logs para debug
- Use cache quando possível (Redis)

---

## 🆘 Problemas Comuns

### Evolution API não conecta
- Verifique se o QR Code foi escaneado
- Confirme que o número não está banido
- Teste sem proxy primeiro

### Frontend não carrega
- Verifique se a porta 3000 está livre
- Confirme variáveis de ambiente
- Verifique logs: `docker-compose logs frontend`

### n8n não recebe webhooks
- Verifique URL do webhook
- Confirme que o n8n está acessível
- Teste manualmente o webhook

---

## 📞 Próximos Passos Imediatos

1. **Escolha sua abordagem:**
   - Desenvolvimento local primeiro? → Siga Opção 1
   - Deploy direto em produção? → Siga Opção 2

2. **Configure o ambiente:**
   - Instale dependências
   - Configure variáveis de ambiente
   - Inicie serviços básicos

3. **Teste a integração:**
   - Conecte um número WhatsApp
   - Envie uma mensagem de teste
   - Verifique se chegou

4. **Desenvolva o frontend:**
   - Crie página de login
   - Desenvolva dashboard básico
   - Integre com Evolution API

---

**Boa sorte com o desenvolvimento! 🚀**

Para dúvidas, consulte a documentação completa ou entre em contato com a equipe.

