# 🎨 Guia Visual - M13X Leads

## 🌐 Acessos às Páginas

### Página Principal (Home)
**URL**: http://localhost:3001
- Landing page com apresentação do sistema
- Cards de estatísticas
- Botões para acessar dashboard
- Design cyberpunk com tema laranja (#FF4500)

### Dashboard Principal
**URL**: http://localhost:3001/dashboard
- Métricas em tempo real:
  - Leads Hoje
  - Números Ativos
  - CPA Médio
  - ROI do Mês
- Gráficos:
  - Leads e Conversas (últimos 7 dias)
  - Leads por Bairro
- Atividades Recentes
- Design moderno com cards e gráficos interativos

### Gerenciamento de Números WhatsApp
**URL**: http://localhost:3001/numbers
- Lista de números WhatsApp conectados
- Status: Conectado, Desconectado, Conectando
- Botão para adicionar novo número
- Botão para conectar (gerar QR Code)
- Cards com informações de cada número
- Mensagens enviadas hoje por número

### Leads Qualificados
**URL**: http://localhost:3001/leads
- Tabela completa de leads
- Filtros por status (Novo, Qualificado, Em Contato, Convertido)
- Busca por nome, telefone, email ou bairro
- Informações exibidas:
  - Nome e contato
  - Bairro
  - Orçamento
  - Tipo de imóvel
  - Status
  - Data
- Botão para exportar dados

### Conversas ao Vivo
**URL**: http://localhost:3001/conversations
- Interface similar ao WhatsApp Web
- Lista de conversas ativas
- Monitoramento em tempo real
- Intervenção manual quando necessário

### ROI e Anúncios
**URL**: http://localhost:3001/roi
- Integração com Facebook Ads
- Gasto diário
- Cálculo automático de CPA e ROI
- Gráficos de performance

### Configurações
**URL**: http://localhost:3001/settings
- Personalização de mensagens do bot
- Gerenciamento de usuários
- Configurações do sistema

---

## 🎨 Design e Tema

### Cores Principais
- **Preto**: `#000000` (fundo)
- **Cinza Escuro**: `#1a1a1a` (cards)
- **Laranja Neon**: `#FF4500` (destaques, botões, textos principais)
- **Branco/Cinza Claro**: Textos secundários

### Estilo
- **Tema**: Cyberpunk de luxo
- **Efeitos**: Glow (brilho) nos títulos principais
- **Cards**: Fundo preto semi-transparente com bordas laranja
- **Gráficos**: Cores neon (laranja e verde)
- **Responsivo**: Adaptável para mobile e desktop

---

## 📱 Funcionalidades Visuais

### Dashboard
- ✅ Cards de métricas com ícones
- ✅ Gráficos de linha (Leads e Conversas)
- ✅ Gráfico de barras (Leads por Bairro)
- ✅ Lista de atividades recentes
- ✅ Indicadores de crescimento (setas verde/vermelha)

### Números WhatsApp
- ✅ Cards individuais para cada número
- ✅ Indicadores visuais de status (verde/amarelo/vermelho)
- ✅ Contador de mensagens do dia
- ✅ Botões de ação (Conectar, Desconectar, Ver QR)

### Leads
- ✅ Tabela responsiva
- ✅ Badges coloridos por status
- ✅ Ícones para cada tipo de informação
- ✅ Filtros e busca em tempo real
- ✅ Botão de exportação

---

## 🔗 Navegação

### Menu Principal (Header)
- **M13X LEADS** (logo) - Link para home
- **Dashboard** - Link para dashboard
- **Números** - Link para números WhatsApp
- **Leads** - Link para leads
- **Entrar** - Botão de acesso

### Sidebar (quando aplicável)
- Dashboard
- Números
- Conversas
- Leads
- ROI
- Configurações

---

## 🚀 Como Acessar

1. **Abra o navegador** (Chrome, Firefox, Edge)
2. **Acesse**: http://localhost:3001
3. **Navegue** pelas páginas usando o menu

### URLs Diretas
- Home: http://localhost:3001
- Dashboard: http://localhost:3001/dashboard
- Números: http://localhost:3001/numbers
- Leads: http://localhost:3001/leads
- Conversas: http://localhost:3001/conversations
- ROI: http://localhost:3001/roi
- Configurações: http://localhost:3001/settings

---

## 📊 APIs para Testar (Pelo Navegador)

### Health Check
http://localhost:3001/api/health
- Status do sistema
- Conexão com banco de dados
- Status dos serviços

### Leads
http://localhost:3001/api/leads
- Lista todos os leads
- Suporta filtros: `?status=novo&search=joão`

### Números
http://localhost:3001/api/numbers
- Lista todos os números WhatsApp

### Métricas
http://localhost:3001/api/metrics
- Métricas do dashboard
- Dados para gráficos

---

## 🎯 Próximos Passos Visuais

1. **Conectar dados reais**
   - Substituir dados mockados por dados do banco
   - Integrar APIs do frontend

2. **Adicionar animações**
   - Transições suaves
   - Loading states
   - Animações de entrada

3. **Melhorar responsividade**
   - Testar em diferentes tamanhos de tela
   - Otimizar para mobile

4. **Adicionar dark/light mode** (opcional)
   - Toggle de tema
   - Preferências do usuário

---

## 💡 Dicas

1. **Use F12** para abrir DevTools e inspecionar elementos
2. **Teste em diferentes navegadores** para compatibilidade
3. **Verifique o console** para erros JavaScript
4. **Teste as APIs** diretamente no navegador para ver os dados JSON

---

**Sistema visual pronto para uso!** 🎨✨

**Última atualização**: 2025-11-21

