#!/bin/bash

# ============================================
# M13X Leads - Script de Setup do Servidor
# ============================================
# Este script configura o servidor VPS para rodar o M13X Leads
# Requer: Ubuntu 22.04+ com acesso root

set -e

echo "🚀 Iniciando setup do servidor M13X Leads..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se está rodando como root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Por favor, execute como root (sudo)${NC}"
    exit 1
fi

# Atualizar sistema
echo -e "${YELLOW}📦 Atualizando sistema...${NC}"
apt update && apt upgrade -y

# Instalar dependências básicas
echo -e "${YELLOW}📦 Instalando dependências...${NC}"
apt install -y \
    curl \
    wget \
    git \
    vim \
    ufw \
    fail2ban \
    htop \
    net-tools

# Instalar Docker
echo -e "${YELLOW}🐳 Instalando Docker...${NC}"
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    systemctl enable docker
    systemctl start docker
    echo -e "${GREEN}✅ Docker instalado${NC}"
else
    echo -e "${GREEN}✅ Docker já está instalado${NC}"
fi

# Instalar Docker Compose
echo -e "${YELLOW}🐳 Instalando Docker Compose...${NC}"
if ! command -v docker-compose &> /dev/null; then
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    echo -e "${GREEN}✅ Docker Compose instalado${NC}"
else
    echo -e "${GREEN}✅ Docker Compose já está instalado${NC}"
fi

# Configurar firewall
echo -e "${YELLOW}🔥 Configurando firewall...${NC}"
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw allow 3000/tcp  # Frontend (desenvolvimento)
ufw allow 8080/tcp  # Evolution API
ufw allow 5678/tcp  # n8n
ufw --force enable
echo -e "${GREEN}✅ Firewall configurado${NC}"

# Configurar fail2ban
echo -e "${YELLOW}🛡️ Configurando fail2ban...${NC}"
systemctl enable fail2ban
systemctl start fail2ban
echo -e "${GREEN}✅ fail2ban configurado${NC}"

# Otimizar sistema
echo -e "${YELLOW}⚙️ Otimizando sistema...${NC}"
# Aumentar limites de arquivos abertos
cat >> /etc/security/limits.conf << EOF
* soft nofile 65536
* hard nofile 65536
EOF

# Otimizar kernel para Docker
cat >> /etc/sysctl.conf << EOF
# Docker optimizations
vm.max_map_count=262144
fs.file-max=65536
EOF

sysctl -p

echo -e "${GREEN}✅ Sistema otimizado${NC}"

# Criar diretórios necessários
echo -e "${YELLOW}📁 Criando diretórios...${NC}"
mkdir -p /opt/leadsimobi/{data,logs,backups}
chmod 755 /opt/leadsimobi

echo -e "${GREEN}✅ Diretórios criados${NC}"

# Informações finais
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅ Setup do servidor concluído!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Próximos passos:"
echo "1. Configure o arquivo .env com suas variáveis"
echo "2. Execute: docker-compose up -d"
echo "3. Acesse o painel em http://seu-servidor:3000"
echo ""
echo -e "${YELLOW}⚠️ Não esqueça de alterar as senhas padrão!${NC}"
echo ""

