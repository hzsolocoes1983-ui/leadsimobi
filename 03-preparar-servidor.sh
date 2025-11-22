#!/bin/bash
# Script para preparar o servidor VPS para receber o deploy
# Execute este script DENTRO DO SERVIDOR (VPS)

set -e

echo "🚀 Preparando servidor para LeadsImobi..."
echo ""

# Atualizar sistema
echo "📦 Atualizando sistema..."
sudo apt-get update

# Instalar Docker (se não estiver instalado)
if ! command -v docker &> /dev/null; then
    echo "🐳 Instalando Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
    echo "✅ Docker instalado"
else
    echo "✅ Docker já está instalado"
fi

# Instalar Docker Compose (se não estiver instalado)
if ! command -v docker compose &> /dev/null; then
    echo "🐳 Instalando Docker Compose..."
    sudo apt-get install -y docker-compose-plugin
    echo "✅ Docker Compose instalado"
else
    echo "✅ Docker Compose já está instalado"
fi

# Instalar Git (se não estiver instalado)
if ! command -v git &> /dev/null; then
    echo "📦 Instalando Git..."
    sudo apt-get install -y git
    echo "✅ Git instalado"
else
    echo "✅ Git já está instalado"
fi

# Criar diretório do projeto
PROJECT_PATH="/var/www/leadsimobi"
echo ""
echo "📂 Criando diretório do projeto em $PROJECT_PATH..."
sudo mkdir -p $PROJECT_PATH
sudo chown $USER:$USER $PROJECT_PATH
echo "✅ Diretório criado"

# Clonar repositório
echo ""
echo "📥 Agora você precisa clonar o repositório:"
echo ""
echo "Se o repositório for PÚBLICO:"
echo "  git clone https://github.com/SEU_USUARIO/leadsimobi.git $PROJECT_PATH"
echo ""
echo "Se o repositório for PRIVADO, use um Personal Access Token (PAT):"
echo "  git clone https://SEU_USUARIO:SEU_PAT@github.com/SEU_USUARIO/leadsimobi.git $PROJECT_PATH"
echo ""
echo "Ou configure SSH:"
echo "  ssh-keygen -t rsa -b 4096 -C 'servidor-leadsimobi'"
echo "  cat ~/.ssh/id_rsa.pub"
echo "  # Adicione a chave pública em: GitHub → Settings → SSH and GPG keys"
echo "  git clone git@github.com:SEU_USUARIO/leadsimobi.git $PROJECT_PATH"
echo ""

# Criar arquivo .env
echo "📝 Criando arquivo .env de exemplo..."
cat > $PROJECT_PATH/.env.example << 'EOF'
# Database
POSTGRES_DB=leadsimobi
POSTGRES_USER=leadsimobi_user
POSTGRES_PASSWORD=MUDE_ESTA_SENHA_FORTE_AQUI

# Evolution API
EVOLUTION_API_URL=http://localhost:8081
EVOLUTION_API_KEY=MUDE_ESTA_CHAVE_API_AQUI

# n8n
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=MUDE_ESTA_SENHA_AQUI
N8N_ENCRYPTION_KEY=GERE_UMA_CHAVE_ALEATORIA_AQUI

# Node Environment
NODE_ENV=production

# Database URL (para Prisma/Next.js)
DATABASE_URL=postgresql://leadsimobi_user:MUDE_ESTA_SENHA_FORTE_AQUI@localhost:5433/leadsimobi
EOF

echo "✅ Arquivo .env.example criado em $PROJECT_PATH/.env.example"
echo ""
echo "⚠️  IMPORTANTE: Copie o .env.example para .env e configure as senhas:"
echo "  cd $PROJECT_PATH"
echo "  cp .env.example .env"
echo "  nano .env  # ou use vim, vi, etc."
echo ""

# Configurar firewall (opcional)
echo "🔥 Configurando firewall (opcional)..."
if command -v ufw &> /dev/null; then
    sudo ufw allow 22/tcp    # SSH
    sudo ufw allow 3001/tcp  # Frontend
    sudo ufw allow 8081/tcp  # Evolution API
    sudo ufw allow 5679/tcp  # n8n
    echo "✅ Regras de firewall adicionadas"
    echo "   Para ativar: sudo ufw enable"
else
    echo "⚠️  UFW não está instalado. Configure o firewall manualmente se necessário."
fi

echo ""
echo "✅ Servidor preparado com sucesso!"
echo ""
echo "📋 Próximos passos:"
echo "1. Clone o repositório (comandos acima)"
echo "2. Configure o arquivo .env com suas senhas"
echo "3. Faça um push no GitHub para disparar o deploy automático"
echo ""
echo "🔍 Para testar manualmente antes do deploy automático:"
echo "  cd $PROJECT_PATH"
echo "  docker compose -f docker-compose.leads.yml up -d --build"
echo ""
