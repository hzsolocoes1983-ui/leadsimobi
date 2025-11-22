# Script para iniciar todos os serviços do M13X Leads
# Execute este arquivo com duplo clique ou clique direito > Executar com PowerShell

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "M13X Leads - Iniciando Serviços" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se Docker está rodando
Write-Host "Verificando Docker..." -ForegroundColor Yellow
try {
    $dockerCheck = docker ps 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERRO: Docker Desktop não está rodando!" -ForegroundColor Red
        Write-Host ""
        Write-Host "Por favor:" -ForegroundColor Yellow
        Write-Host "1. Abra o Docker Desktop" -ForegroundColor White
        Write-Host "2. Aguarde até aparecer 'Docker Desktop is running'" -ForegroundColor White
        Write-Host "3. Execute este script novamente" -ForegroundColor White
        Write-Host ""
        Read-Host "Pressione Enter para sair"
        exit
    }
    Write-Host "✓ Docker está rodando" -ForegroundColor Green
} catch {
    Write-Host "ERRO: Docker não encontrado!" -ForegroundColor Red
    Write-Host "Instale o Docker Desktop primeiro" -ForegroundColor Yellow
    Read-Host "Pressione Enter para sair"
    exit
}

Write-Host ""

# Verificar se arquivo .env existe
if (-not (Test-Path ".env")) {
    Write-Host "ERRO: Arquivo .env não encontrado!" -ForegroundColor Red
    Write-Host "Execute primeiro: copiar env.example para .env" -ForegroundColor Yellow
    Read-Host "Pressione Enter para sair"
    exit
}
Write-Host "✓ Arquivo .env encontrado" -ForegroundColor Green
Write-Host ""

# Passo 1: Iniciar PostgreSQL e Redis
Write-Host "Passo 1: Iniciando PostgreSQL e Redis..." -ForegroundColor Yellow
docker-compose up -d postgres redis

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO ao iniciar PostgreSQL/Redis" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit
}
Write-Host "✓ PostgreSQL e Redis iniciados" -ForegroundColor Green
Write-Host ""

# Aguardar PostgreSQL inicializar
Write-Host "Aguardando PostgreSQL inicializar (10 segundos)..." -ForegroundColor Yellow
Start-Sleep -Seconds 10
Write-Host "OK - Aguardado" -ForegroundColor Green
Write-Host ""

# Passo 2: Criar schema do banco
Write-Host "Passo 2: Criando schema do banco de dados..." -ForegroundColor Yellow
if (Test-Path "backend/scripts/schema.sql") {
    Get-Content backend/scripts/schema.sql | docker exec -i leadsimobi-postgres psql -U leadsimobi_user -d leadsimobi
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Schema criado com sucesso" -ForegroundColor Green
    } else {
        Write-Host "⚠ Aviso: Erro ao criar schema (pode já existir)" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠ Aviso: Arquivo schema.sql não encontrado" -ForegroundColor Yellow
}
Write-Host ""

# Passo 3: Iniciar Evolution API
Write-Host "Passo 3: Iniciando Evolution API..." -ForegroundColor Yellow
docker-compose up -d evolution-api

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Evolution API iniciada" -ForegroundColor Green
} else {
    Write-Host "⚠ Aviso: Erro ao iniciar Evolution API" -ForegroundColor Yellow
}
Write-Host ""

# Passo 4: Iniciar n8n
Write-Host "Passo 4: Iniciando n8n..." -ForegroundColor Yellow
docker-compose up -d n8n

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ n8n iniciado" -ForegroundColor Green
} else {
    Write-Host "⚠ Aviso: Erro ao iniciar n8n" -ForegroundColor Yellow
}
Write-Host ""

# Verificar status dos containers
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Status dos Serviços:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
docker ps --filter "name=leadsimobi" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
Write-Host ""

# Verificar se tudo está rodando
Write-Host "Verificando serviços..." -ForegroundColor Yellow
$postgres = docker ps --filter "name=leadsimobi-postgres" --format "{{.Names}}"
$redis = docker ps --filter "name=leadsimobi-redis" --format "{{.Names}}"
$evolution = docker ps --filter "name=leadsimobi-evolution-api" --format "{{.Names}}"
$n8n = docker ps --filter "name=leadsimobi-n8n" --format "{{.Names}}"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Resumo:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

if ($postgres) {
    Write-Host "✓ PostgreSQL: RODANDO" -ForegroundColor Green
} else {
    Write-Host "✗ PostgreSQL: PARADO" -ForegroundColor Red
}

if ($redis) {
    Write-Host "✓ Redis: RODANDO" -ForegroundColor Green
} else {
    Write-Host "✗ Redis: PARADO" -ForegroundColor Red
}

if ($evolution) {
    Write-Host "✓ Evolution API: RODANDO (http://localhost:8080)" -ForegroundColor Green
} else {
    Write-Host "✗ Evolution API: PARADO" -ForegroundColor Red
}

if ($n8n) {
    Write-Host "✓ n8n: RODANDO (http://localhost:5678)" -ForegroundColor Green
} else {
    Write-Host "✗ n8n: PARADO" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Próximos Passos:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "1. Acesse o frontend: http://localhost:3000" -ForegroundColor White
Write-Host "2. Acesse Evolution API: http://localhost:8080" -ForegroundColor White
Write-Host "3. Acesse n8n: http://localhost:5678" -ForegroundColor White
Write-Host ""
Write-Host "Para parar os serviços, execute: docker-compose down" -ForegroundColor Yellow
Write-Host ""

Read-Host "Pressione Enter para sair"

