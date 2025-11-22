# 🚀 Como Usar - M13X Leads

## 📋 Iniciar os Serviços (FÁCIL)

### Opção 1: Duplo Clique (Mais Fácil)

1. **Certifique-se que o Docker Desktop está rodando**
   - Procure por "Docker Desktop" no menu Iniciar
   - Abra o Docker Desktop
   - Aguarde até aparecer "Docker Desktop is running" na bandeja do sistema

2. **Execute o script:**
   - Dê **duplo clique** no arquivo `iniciar-servicos.bat`
   - OU dê **duplo clique** no arquivo `iniciar-servicos.ps1`

3. **Aguarde o script terminar**
   - Ele vai iniciar todos os serviços automaticamente
   - Mostrará o status de cada serviço

### Opção 2: Manual (Se preferir)

1. Abra o PowerShell na pasta do projeto
2. Execute:
   ```powershell
   .\iniciar-servicos.ps1
   ```

## ✅ Verificar se Está Funcionando

Depois de executar o script, você verá algo assim:

```
✓ PostgreSQL: RODANDO
✓ Redis: RODANDO
✓ Evolution API: RODANDO (http://localhost:8080)
✓ n8n: RODANDO (http://localhost:5678)
```

## 🌐 Acessar os Serviços

- **Frontend:** http://localhost:3000
- **Evolution API:** http://localhost:8080
- **n8n:** http://localhost:5678

## 🛑 Parar os Serviços

Para parar todos os serviços:

```powershell
docker-compose down
```

Ou execute o arquivo `parar-servicos.bat` (se criarmos)

## ⚠️ Problemas Comuns

### "Docker Desktop não está rodando"
**Solução:** Abra o Docker Desktop e aguarde ele iniciar completamente

### "Arquivo .env não encontrado"
**Solução:** Certifique-se que o arquivo `.env` existe na raiz do projeto

### "Erro ao iniciar container"
**Solução:** Verifique os logs:
```powershell
docker logs leadsimobi-postgres
```

## 📞 Precisa de Ajuda?

Consulte os arquivos de documentação:
- `docs/DOCKER_SETUP.md` - Configuração Docker
- `docs/PRIMEIROS_PASSOS.md` - Guia completo
- `docs/PRIORIDADES.md` - O que fazer primeiro

