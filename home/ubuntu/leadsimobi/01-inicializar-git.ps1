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

## Validação básica da URL do repositório
$repoPattern = '^https://github\.com/([^/]+)/([^/]+)\.git$'
if ($RepoUrl -notmatch $repoPattern) {
  Write-Host "Erro: URL inválida. Formato esperado: https://github.com/<owner>/<repo>.git" -ForegroundColor Red
  Write-Host "Exemplo: https://github.com/seu-usuario/seu-repo.git" -ForegroundColor Yellow
  exit 1
}

$owner = $Matches[1]
$repo  = $Matches[2]

if ($RepoUrl -match 'hzsolocoes1983-ui') {
  Write-Host "Aviso: detectado 'hzsolocoes1983-ui'. Confirme se o correto é 'hzsolucoes1983-ui'." -ForegroundColor Yellow
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

function Remove-NestedGitRepos {
  # Detecta diretórios com .git dentro do projeto e remove para evitar submódulos acidentais
  $nestedRepos = Get-ChildItem -Directory -Force | Where-Object { Test-Path (Join-Path $_.FullName '.git') }
  if ($nestedRepos -and $nestedRepos.Count -gt 0) {
    Write-Host "Detectados repositórios Git aninhados (serão normalizados):" -ForegroundColor Yellow
    foreach ($d in $nestedRepos) {
      Write-Host " - $($d.Name)" -ForegroundColor Yellow
      try { & git rm --cached -r $d.Name 2>$null } catch {}
      try { Remove-Item -Recurse -Force (Join-Path $d.FullName '.git') } catch {}
    }
    Write-Host "Repos aninhados corrigidos." -ForegroundColor Green
  }
}

# Corrige repositórios aninhados (ex.: leads-mobi/, leadsimobi/)
Remove-NestedGitRepos

# Remove .env do controle de versão (se estiver trackeado)
if (Test-Path ".env") {
  Write-Host "Garantindo que .env não será versionado..." -ForegroundColor Yellow
  git rm --cached .env 2>$null
}

# Garante que .env está no .gitignore
if (Test-Path ".gitignore") {
  $gi = Get-Content ".gitignore"
  if ($gi -notcontains ".env") { Add-Content ".gitignore" "`n.env" }
} else {
  Set-Content ".gitignore" ".env`n"
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
  Write-Host "Se aparecer 'repository not found', confirme que o repositório existe e que você tem acesso." -ForegroundColor Yellow
  exit 1
}

Write-Host "✅ Push concluído com sucesso!" -ForegroundColor Green