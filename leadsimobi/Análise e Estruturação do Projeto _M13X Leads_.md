# Análise e Estruturação do Projeto "M13X Leads"

Este documento organiza as ideias contidas no arquivo `projeto.txt`, filtrando e estruturando as informações para fornecer uma visão clara do sistema proposto, suas funcionalidades, custos e planos de implementação.

## 1. Visão Geral do Projeto

O projeto, denominado **M13X Leads**, consiste no desenvolvimento de um sistema completo e autônomo (self-hosted) para captação e gerenciamento de leads no setor imobiliário, utilizando múltiplos números de WhatsApp. O objetivo principal é automatizar o processo de marketing, qualificação de leads e cálculo de ROI, oferecendo uma solução robusta, escalável e com baixo custo operacional em comparação com as ferramentas SaaS tradicionais.

- **Nome do Sistema:** M13X Leads
- **Objetivo Principal:** Criar uma plataforma centralizada para gerenciar campanhas de WhatsApp em larga escala, com foco em evitar banimentos, automatizar interações e fornecer um painel de controle exclusivo para a equipe.
- **Identidade Visual Sugerida:** A proposta inclui uma identidade visual com tema "cyberpunk de luxo", utilizando as cores preto, cinza escuro e laranja neon (#FF4500), e um logotipo minimalista.

## 2. Propostas de Implementação

O documento detalha duas abordagens principais para a construção do sistema, que se diferenciam pela infraestrutura, custo e nível de personalização do painel de controle.

| Característica | Proposta 1: Premium (Recomendada) | Proposta 2: Custo Quase Zero |
| :--- | :--- | :--- |
| **Custo de Setup** | R$ 4.997 (pacote completo) | R$ 1.997 |
| **Custo Mensal Fixo** | **R$ 489 - R$ 550** | **R$ 0 - R$ 80** |
| **Infraestrutura** | Servidor VPS dedicado (Hetzner) | Oracle Cloud (Free Tier) ou similar |
| **Painel de Controle** | Customizado com Next.js e Tailwind | Criado com plataforma Low-Code (Budibase ou ToolJet) |
| **Escala (Números)** | 20 a 50+ | 10 a 20 |
| **Ideal Para** | Empresas que buscam máxima performance, controle e uma interface totalmente personalizada com sua marca. | Usuários que desejam uma solução funcional e de baixíssimo custo, abrindo mão de parte da personalização. |

## 3. Arquitetura e Componentes Tecnológicos

O sistema é modular, e a tabela abaixo resume os componentes essenciais e as ferramentas escolhidas para cada um, conforme a proposta principal (Premium).

| Componente | Ferramenta Escolhida | Propósito |
| :--- | :--- | :--- |
| **Hospedagem** | VPS Hetzner Cloud (Alemanha) | Servidor central para rodar todos os serviços (API, automação, painel). |
| **Anti-Ban / Multi-Perfil** | Incogniton (plano gratuito) | Gerenciamento de múltiplos perfis de navegador para evitar detecção e banimento. |
| **Proxies** | Proxies residenciais estáticos (BR) | Fornecimento de um IP brasileiro fixo para cada número de WhatsApp, aumentando a segurança. |
| **API do WhatsApp** | Evolution API v2 (self-hosted) | Backend para enviar e receber mensagens, gerenciar conexões e múltiplos números. |
| **Orquestração** | n8n (self-hosted) | Ferramenta para criar os fluxos de automação (funil de mensagens, extração de dados, etc.). |
| **Painel de Controle** | Next.js + Tailwind + shadcn/ui | Interface web exclusiva para o usuário final, com todas as funcionalidades centralizadas. |
| **Banco de Dados** | PostgreSQL (Docker) | Armazenamento de dados, já incluso na instalação da Evolution API. |

## 4. Funcionalidades do Painel "M13X Leads"

O painel de controle é o coração da experiência do usuário, projetado para ser uma tela única e intuitiva. Suas principais funcionalidades incluem:

- **Dashboard Principal:** Visão geral com métricas em tempo real (Leads Hoje, CPA Médio, ROI do Mês) e gráficos de leads por bairro ou orçamento.
- **Gerenciamento de Números:** Lista de todos os chips de WhatsApp conectados, com status (Online/Offline) e a opção de conectar novos números via QR Code.
- **Conversas ao Vivo:** Interface de chat similar ao WhatsApp Web, permitindo monitorar as conversas em tempo real e a intervenção de um vendedor humano quando necessário.
- **Leads Qualificados:** Tabela organizada com todos os leads que passaram pelo funil, com filtros por bairro, orçamento, etc., e opção de exportar os dados.
- **Anúncios & ROI:** Integração com a API do Facebook Ads para exibir o gasto diário e o CPA automaticamente, calculando o ROI.
- **Configurações:** Área para personalizar as mensagens do bot, gerenciar usuários e outras configurações do sistema.

## 5. Plano de Ação e Entregáveis

O documento também esboça um plano de implementação e os materiais que seriam entregues.

### Cronograma de Entrega (7 dias)

1.  **Dias 1-2:** Configuração do servidor (VPS) e instalação dos serviços base (Evolution API, n8n, PostgreSQL).
2.  **Dias 3-5:** Desenvolvimento do painel web exclusivo M13X Leads.
3.  **Dia 6:** Testes com números reais e otimização do fluxo de automação.
4.  **Dia 7:** Entrega final, treinamento e início do suporte.

### Materiais e Scripts

O arquivo `projeto.txt` contém referências a diversos artefatos técnicos a serem entregues, como:

- **Scripts de Instalação (`.sh`):** Comandos para automatizar a configuração do servidor.
- **Arquivos de Configuração (`.json`):** Templates para o workflow do n8n e para o painel em Budibase.
- **Links para Ativos:** URLs para templates de criativos no Canva e para fornecedores de proxy.
- **Esboço de Apresentação:** Uma estrutura de 11 slides para apresentar o projeto M13X Leads a potenciais interessados.
