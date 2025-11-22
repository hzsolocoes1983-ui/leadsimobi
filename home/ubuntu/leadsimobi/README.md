# LeadsImobi - CRM Imobiliário Inteligente com IA

Este é um sistema completo de CRM (Customer Relationship Management) para o mercado imobiliário, com funcionalidades avançadas de automação, análise de crédito, controle de vendas e integração com WhatsApp e Instagram.

## ✨ Funcionalidades Implementadas

### 🤖 **CRM Inteligente com Análise de Leads**
- **Gestão de Leads:** Funil de vendas visual e personalizável (Kanban).
- **Histórico Unificado:** Todas as interações (WhatsApp, Instagram, email, ligações) em um só lugar.
- **Scoring de Leads (IA):** Classificação automática de leads (A, B, C, D, F) com base em 5 critérios:
  1.  **Financeiro:** Renda, score de crédito, dívidas.
  2.  **Engajamento:** Tempo de resposta, número de interações.
  3.  **Interesse:** Nível de urgência, imóveis visualizados.
  4.  **Documentação:** Percentual de documentos enviados.
  5.  **Qualificação:** Estabilidade profissional, compatibilidade de budget.
- **Recomendações Automáticas:** A IA sugere as próximas ações para cada lead.

### 💳 **Cadastro de Clientes e Análise de Crédito Automática**
- **Cadastro Completo:** Dados pessoais, profissionais, cônjuge, dependentes e referências.
- **Gestão de Documentos:** Checklist automático, upload de arquivos e status de aprovação.
- **Análise de Crédito Automática:**
  - Calcula a **capacidade de compra** do cliente.
  - Define o **valor máximo do imóvel** e da **parcela**.
  - Analisa o **comprometimento de renda**.
  - Gera um resultado: **Aprovado, Aprovado com Condições ou Reprovado**.
- **Simulador de Financiamento:** Compara taxas e condições de diferentes bancos (SAC/PRICE).

### 💰 **Controle de Vendas e Comissões**
- **Registro de Vendas:** Detalhes do imóvel, valor, data e cliente.
- **Cálculo Automático de Comissão:** Lançamento automático do valor a receber.
- **Controle de Pagamentos:** Status da comissão (pendente, parcial, paga).
- **Metas de Vendas:** Defina metas mensais/trimestrais e acompanhe o progresso.
- **Dashboard Financeiro:** Relatórios de vendas, comissões, ranking de corretores e despesas.

### 📊 **Dashboard Visual e Interativo (Estilo "Máquina de Vendas")**
- **Funil Visual (Sankey):** Acompanhe o fluxo de leads desde a entrada até a venda.
- **Gráficos Animados:** Visualize a performance em tempo real.
- **Classificação por Cores:** Identifique rapidamente leads quentes (verde), mornos (amarelo) e frios (vermelho).

### 📱 **Integração Multicanal**
- **WhatsApp & Instagram:** Receba e envie mensagens diretamente pelo sistema (via Evolution API).
- **Automação com n8n:** Crie workflows para respostas automáticas, follow-ups e alertas.

## 🚀 Próximos Passos

1.  **Configurar o Ambiente:** Siga o `docker-compose.leads.yml` e o `.env.example` para configurar as variáveis de ambiente.
2.  **Rodar o Banco de Dados:** Execute o arquivo `database/init.sql` para criar todas as tabelas.
3.  **Desenvolver o Frontend:** Conectar as telas de `dashboard`, `leads`, `clientes` e `vendas` com as APIs criadas.
4.  **Configurar Webhooks:** Integrar a Evolution API e o n8n para receber as mensagens em tempo real.

## 🛠️ Estrutura do Projeto

```
/leadsimobi
├── .github/workflows/   # Workflows de CI/CD
├── backend/             # (Opcional) API backend dedicada
├── database/
│   ├── init.sql         # Schema completo do banco de dados
│   └── ...
├── docker/              # Dockerfiles de produção
├── frontend/
│   ├── app/
│   │   ├── api/         # API Routes do Next.js
│   │   ├── (pages)/     # Páginas do sistema (Dashboard, Leads, etc)
│   │   └── ...
│   ├── components/      # Componentes React
│   ├── lib/             # Funções utilitárias (db, scoring)
│   └── ...
└── ...
```
```
