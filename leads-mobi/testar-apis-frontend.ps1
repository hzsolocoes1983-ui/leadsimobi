# Script para testar APIs do Frontend
# Execute no navegador: http://localhost:3001/api/health

Write-Host "Testando APIs do Frontend..." -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Health Check:" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3001/api/health" -Method Get
    Write-Host " Health: OK" -ForegroundColor Green
    $response | ConvertTo-Json
} catch {
    Write-Host " Erro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "2. Leads:" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3001/api/leads" -Method Get
    Write-Host " Leads: OK - Total: $($response.Count)" -ForegroundColor Green
} catch {
    Write-Host " Erro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "3. Numbers:" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3001/api/numbers" -Method Get
    Write-Host " Numbers: OK - Total: $($response.Count)" -ForegroundColor Green
} catch {
    Write-Host " Erro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "4. Metrics:" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3001/api/metrics" -Method Get
    Write-Host " Metrics: OK" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 2
} catch {
    Write-Host " Erro: $($_.Exception.Message)" -ForegroundColor Red
}
