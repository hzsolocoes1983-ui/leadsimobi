# 🚀 Primeiros Passos - O Que Fazer Agora

## ✅ O Que Já Foi Feito

1. ✅ **Frontend completo** - Interface pronta
2. ✅ **Schema do banco** - Tabelas criadas
3. ✅ **API Routes** - Endpoints criados
4. ✅ **Cliente Evolution API** - Funções prontas
5. ✅ **Conexão com banco** - Código pronto

## 🎯 O Que Precisa Ser Feito AGORA

### 1. Instalar Dependência do PostgreSQL

```bash
cd frontend
npm install pg @types/pg
```

### 2. Criar Arquivo .env

Copie o arquivo de exemplo e configure:

```bash
cp env.example .env
```

Edite o `.env` com suas configurações:

```env
# Banco de Dados
POSTGRES_DB=leadsimobi
POSTGRES_USER=leadsimobi_user
POSTGRES_PASSWORD=SUA_SENHA_AQUI
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
DATABASE_URL=postgresql://leadsimobi_user:SUA_SENHA_AQUI@localhost:5432/leadsimobi

# Evolution API
EVOLUTION_API_URL=http://localhost:8080
EVOLUTION_API_KEY=SUA_API_KEY_AQUI

# n8n
N8N_BASIC_AUTH_PASSWORD=SUA_SENHA_AQUI
N8N_ENCRYPTION_KEY=GERAR_UMA_CHAVE_ALEATORIA_AQUI
```

### 3. Iniciar Serviços Docker

```bash
# Iniciar PostgreSQL e Redis
docker-compose up -d postgres redis

# Aguardar alguns segundos para o PostgreSQL iniciar
# Depois criar o schema
docker exec -i leadsimobi-postgres psql -U leadsimobi_user -d leadsimobi < backend/scripts/schema.sql

# Iniciar Evolution API
docker-compose up -d evolution-api

# Iniciar n8n
docker-compose up -d n8n
```

### 4. Verificar se Está Funcionando

```bash
# Verificar saúde da API
curl http://localhost:3000/api/health

# Verificar se PostgreSQL está rodando
docker ps | grep postgres

# Verificar se Evolution API está rodando
curl http://localhost:8080/health
```

### 5. Testar no Frontend

1. Acesse: http://localhost:3000
2. Vá para Dashboard
3. Tente adicionar um número WhatsApp
4. Verifique se aparece no banco

---

## 📋 Checklist Rápido

- [ ] Instalar `pg` e `@types/pg`
- [ ] Criar arquivo `.env`
- [ ] Configurar senhas no `.env`
- [ ] Iniciar PostgreSQL: `docker-compose up -d postgres`
- [ ] Criar schema: `docker exec -i leadsimobi-postgres psql -U leadsimobi_user -d leadsimobi < backend/scripts/schema.sql`
- [ ] Iniciar Evolution API: `docker-compose up -d evolution-api`
- [ ] Iniciar n8n: `docker-compose up -d n8n`
- [ ] Testar API: `curl http://localhost:3000/api/health`
- [ ] Acessar frontend: http://localhost:3000

---

## ⚠️ Problemas Comuns

### Erro: "Cannot find module 'pg'"
**Solução:** Execute `npm install pg @types/pg` na pasta frontend

### Erro: "Connection refused" no banco
**Solução:** Verifique se PostgreSQL está rodando: `docker ps`

### Erro: "relation does not exist"
**Solução:** Execute o script de schema: `docker exec -i leadsimobi-postgres psql -U leadsimobi_user -d leadsimobi < backend/scripts/schema.sql`

### Evolution API não responde
**Solução:** Verifique logs: `docker logs leadsimobi-evolution-api`

---

## 🎯 Próximo Passo Após Isso Funcionar

1. Conectar um número WhatsApp real
2. Testar envio de mensagem
3. Integrar frontend com APIs reais
4. Substituir dados mockados

