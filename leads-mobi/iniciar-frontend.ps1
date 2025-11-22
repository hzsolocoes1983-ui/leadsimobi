# Script para iniciar o frontend localmente
# Conecta aos serviços Docker rodando

Write-Host "🚀 Iniciando Frontend M13X Leads..." -ForegroundColor Cyan

# Verificar se os serviços Docker estão rodando
Write-Host "`n📋 Verificando serviços Docker..." -ForegroundColor Yellow
$postgres = docker ps --filter "name=leadsimobi-postgres" --format "{{.Names}}" | Select-Object -First 1
$evolution = docker ps --filter "name=leadsimobi-evolution-api" --format "{{.Names}}" | Select-Object -First 1
$n8n = docker ps --filter "name=leadsimobi-n8n" --format "{{.Names}}" | Select-Object -First 1

if (-not $postgres) {
    Write-Host "❌ PostgreSQL não está rodando!" -ForegroundColor Red
    Write-Host "Execute: docker compose -f docker-compose.leads.yml --project-name leadsimobi up -d postgres" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ PostgreSQL: $postgres" -ForegroundColor Green
if ($evolution) { Write-Host "✅ Evolution API: $evolution" -ForegroundColor Green }
if ($n8n) { Write-Host "✅ n8n: $n8n" -ForegroundColor Green }

# Configurar variáveis de ambiente
Write-Host "`n🔧 Configurando variáveis de ambiente..." -ForegroundColor Yellow

$env:POSTGRES_HOST = "localhost"
$env:POSTGRES_PORT = "5433"
$env:POSTGRES_DB = "leadsimobi"
$env:POSTGRES_USER = "leadsimobi_user"
$env:POSTGRES_PASSWORD = "leadsimobi_secure_pass_2024"
$env:DATABASE_URL = "postgresql://leadsimobi_user:leadsimobi_secure_pass_2024@localhost:5433/leadsimobi"

$env:NEXT_PUBLIC_API_URL = "http://localhost:8081"
$env:EVOLUTION_API_URL = "http://localhost:8081"
$env:EVOLUTION_API_KEY = "4f77e44d6a70de74c7da520db2de16bcc00f4a15454b0270ebf9d7ac91af807e"

$env:NEXT_PUBLIC_N8N_URL = "http://localhost:5679"

$env:NODE_ENV = "development"
$env:PORT = "3001"

Write-Host "✅ Variáveis configuradas" -ForegroundColor Green

# Navegar para o diretório do frontend
Set-Location frontend

Write-Host "`n🌐 Iniciando servidor Next.js na porta 3001..." -ForegroundColor Cyan
Write-Host "📱 Acesse: http://localhost:3001" -ForegroundColor Green
Write-Host "`n⚠️  Pressione Ctrl+C para parar o servidor`n" -ForegroundColor Yellow

# Iniciar o servidor
npm run dev


