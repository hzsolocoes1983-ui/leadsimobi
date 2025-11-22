#!/bin/bash
# Script para inicializar o repositório Git e fazer o primeiro push
# Execute este script na raiz do seu projeto leadsimobi

set -e

echo "🚀 Inicializando repositório Git..."

# Verifica se já existe um repositório Git
if [ -d ".git" ]; then
    echo "⚠️  Repositório Git já existe. Pulando inicialização..."
else
    git init
    echo "✅ Repositório Git inicializado"
fi

# Adiciona todos os arquivos (respeitando o .gitignore)
echo "📦 Adicionando arquivos ao Git..."
git add .

# Faz o primeiro commit
echo "💾 Criando commit inicial..."
git commit -m "Initial commit: LeadsImobi - Sistema completo com Next.js, Evolution API, n8n e PostgreSQL"

# Renomeia a branch para main (se necessário)
git branch -M main

echo ""
echo "✅ Repositório Git configurado com sucesso!"
echo ""
echo "📋 Próximos passos:"
echo "1. Crie um repositório no GitHub: https://github.com/new"
echo "   Nome sugerido: leadsimobi"
echo "   Deixe PRIVADO e NÃO adicione README, .gitignore ou licença"
echo ""
echo "2. Após criar, execute os comandos que o GitHub mostrar:"
echo "   git remote add origin git@github.com:SEU_USUARIO/leadsimobi.git"
echo "   git push -u origin main"
echo ""
echo "Ou se preferir HTTPS:"
echo "   git remote add origin https://github.com/SEU_USUARIO/leadsimobi.git"
echo "   git push -u origin main"
echo ""
