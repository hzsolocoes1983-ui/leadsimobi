@echo off
REM Script simples para iniciar serviços - Duplo clique para executar

echo ========================================
echo M13X Leads - Iniciando Servicos
echo ========================================
echo.

REM Executar script PowerShell
powershell.exe -ExecutionPolicy Bypass -File "iniciar-servicos.ps1"

pause

