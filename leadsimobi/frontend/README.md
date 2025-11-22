# M13X Leads - Frontend

Frontend do sistema M13X Leads desenvolvido com Next.js 14, Tailwind CSS e tema cyberpunk.

## 🚀 Como Rodar

### Desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

### Produção

```bash
npm run build
npm start
```

## 📦 Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes UI
- **Lucide React** - Ícones
- **Recharts** - Gráficos
- **Socket.io Client** - WebSocket para tempo real
- **Axios** - Cliente HTTP

## 🎨 Tema Cyberpunk

- **Cores:**
  - Preto: `#000000`
  - Cinza Escuro: `#1a1a1a`
  - Laranja Neon: `#FF4500`

## 📁 Estrutura

```
frontend/
├── app/              # Rotas Next.js (App Router)
│   ├── layout.tsx    # Layout principal
│   ├── page.tsx      # Página inicial
│   └── globals.css   # Estilos globais
├── components/        # Componentes React
│   └── ui/           # Componentes shadcn/ui
├── lib/              # Utilitários
└── public/           # Assets estáticos
```

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_N8N_URL=http://localhost:5678
```

## 📝 Próximos Passos

1. Criar página de login/autenticação
2. Desenvolver dashboard completo
3. Integrar com Evolution API
4. Adicionar WebSocket para tempo real
5. Criar interface de conversas
6. Implementar tabela de leads

