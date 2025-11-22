# 🐳 Configuração Docker - M13X Leads

## ⚠️ Problema: Docker Desktop não está rodando

O erro indica que o Docker Desktop não está em execução no Windows.

## ✅ Solução

### 1. Iniciar Docker Desktop

1. Abra o **Docker Desktop** no Windows
2. Aguarde até aparecer "Docker Desktop is running" na bandeja do sistema
3. Verifique se está rodando:
   ```powershell
   docker ps
   ```

### 2. Verificar se o arquivo .env está sendo lido

O `docker-compose.yml` precisa ler o arquivo `.env` da raiz do projeto.

**Verifique:**
- O arquivo `.env` está na raiz do projeto (mesmo nível do `docker-compose.yml`)
- O Docker Compose está sendo executado da raiz do projeto

### 3. Iniciar os serviços

Depois que o Docker Desktop estiver rodando:

```powershell
# 1. Iniciar PostgreSQL e Redis
docker-compose up -d postgres redis

# 2. Aguardar 10 segundos para o PostgreSQL inicializar
Start-Sleep -Seconds 10

# 3. Verificar se os containers estão rodando
docker ps

# 4. Criar o schema do banco
Get-Content backend/scripts/schema.sql | docker exec -i leadsimobi-postgres psql -U leadsimobi_user -d leadsimobi

# 5. Iniciar Evolution API
docker-compose up -d evolution-api

# 6. Iniciar n8n
docker-compose up -d n8n

# 7. Verificar todos os serviços
docker ps
```

## 🔍 Verificações

### Verificar se PostgreSQL está rodando:
```powershell
docker exec leadsimobi-postgres psql -U leadsimobi_user -d leadsimobi -c "SELECT version();"
```

### Verificar logs:
```powershell
# Logs do PostgreSQL
docker logs leadsimobi-postgres

# Logs da Evolution API
docker logs leadsimobi-evolution-api

# Logs do n8n
docker logs leadsimobi-n8n
```

### Verificar se o schema foi criado:
```powershell
docker exec leadsimobi-postgres psql -U leadsimobi_user -d leadsimobi -c "\dt"
```

## 📋 Checklist

- [ ] Docker Desktop está rodando
- [ ] Arquivo `.env` existe na raiz
- [ ] PostgreSQL está rodando
- [ ] Schema do banco foi criado
- [ ] Evolution API está rodando
- [ ] n8n está rodando

## 🆘 Problemas Comuns

### Erro: "Docker Desktop is not running"
**Solução:** Inicie o Docker Desktop manualmente

### Erro: "The POSTGRES_PASSWORD variable is not set"
**Solução:** Verifique se o arquivo `.env` está na raiz e tem as variáveis corretas

### Erro: "unable to get image"
**Solução:** Docker Desktop não está rodando ou precisa fazer pull das imagens:
```powershell
docker-compose pull
```

### Container não inicia
**Solução:** Verifique os logs:
```powershell
docker logs leadsimobi-postgres
```

## 🚀 Após tudo funcionar

Teste a conexão:
```powershell
# Testar API de saúde
curl http://localhost:3000/api/health

# Testar Evolution API
curl http://localhost:8080/health

# Testar n8n
curl http://localhost:5678/healthz
```

