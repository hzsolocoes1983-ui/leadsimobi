param(
  [string]$RepoUrl = ""
)

Write-Host "=== Inicializar Git e fazer push para o GitHub ===" -ForegroundColor Cyan

# Verifica instalação do Git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Host "Erro: Git não encontrado. Instale o Git e tente novamente." -ForegroundColor Red
  exit 1
}

# Pergunta URL do repositório se não informada
if ([string]::IsNullOrWhiteSpace($RepoUrl)) {
  $RepoUrl = Read-Host "Informe a URL do repositório GitHub (ex.: https://github.com/hzsolocoes1983-ui/leadsimobi.git)"
}

if ([string]::IsNullOrWhiteSpace($RepoUrl)) {
  Write-Host "Erro: URL do repositório não informada." -ForegroundColor Red
  exit 1
}

Write-Host "Usando repositório: $RepoUrl" -ForegroundColor Green

# Inicia repositório se necessário
if (Test-Path ".git") {
  Write-Host ".git já existe; repositório inicializado." -ForegroundColor Yellow
} else {
  git init
}

# Garante branch main
git branch -M main

# Remove .env do controle de versão (se estiver trackeado)
if (Test-Path ".env") {
  Write-Host "Garantindo que .env não será versionado..." -ForegroundColor Yellow
  git rm --cached .env 2>$null
}

# Adiciona arquivos e faz commit inicial (se houver mudanças)
git add .
& git commit -m "init: projeto leadsimobi" | Out-Null
if ($LASTEXITCODE -ne 0) {
  Write-Host "Sem novas alterações para commitar." -ForegroundColor Yellow
}

# Configura remoto origin
$originExists = (& git remote | Select-String -Pattern "origin").Length -gt 0
if ($originExists) {
  Write-Host "Atualizando URL do remoto origin..." -ForegroundColor Yellow
  git remote set-url origin $RepoUrl
} else {
  Write-Host "Adicionando remoto origin..." -ForegroundColor Yellow
  git remote add origin $RepoUrl
}

# Configura helper de credenciais (abre login)
git config --global credential.helper manager-core

# Faz push
Write-Host "Enviando para GitHub..." -ForegroundColor Cyan
& git push -u origin main
if ($LASTEXITCODE -ne 0) {
  Write-Host "Falha no push. Verifique suas credenciais do GitHub ou use um token (PAT)." -ForegroundColor Red
  Write-Host "Dica: após autenticar, execute novamente: git push -u origin main" -ForegroundColor Yellow
  exit 1
}

Write-Host "✅ Push concluído com sucesso!" -ForegroundColor Green