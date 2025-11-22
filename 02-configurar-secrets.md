# 🔐 Configuração de Secrets no GitHub

Este guia explica como configurar os **secrets** necessários para o deploy automático funcionar.

---

## 📋 Secrets Necessários

Você precisa criar **5 secrets** no seu repositório GitHub:

| Nome do Secret | Descrição | Exemplo |
|----------------|-----------|---------|
| `SSH_HOST` | IP ou domínio da sua VPS | `192.168.1.100` ou `vps.seudominio.com` |
| `SSH_USER` | Usuário SSH da VPS | `root` ou `ubuntu` ou `deploy` |
| `SSH_PRIVATE_KEY` | Chave privada SSH (conteúdo completo) | Conteúdo do arquivo `~/.ssh/id_rsa` |
| `SSH_PORT` | Porta SSH (opcional, padrão: 22) | `22` ou `2222` |
| `SERVER_PROJECT_PATH` | Caminho do projeto no servidor | `/var/www/leadsimobi` |

---

## 🔧 Passo a Passo

### 1️⃣ Acessar configurações de Secrets

1. Abra seu repositório no GitHub
2. Clique em **Settings** (Configurações)
3. No menu lateral, vá em **Secrets and variables** → **Actions**
4. Clique em **New repository secret**

---

### 2️⃣ Criar cada Secret

Para cada secret da tabela acima:

1. Clique em **New repository secret**
2. Em **Name**, coloque o nome exato (ex: `SSH_HOST`)
3. Em **Secret**, cole o valor correspondente
4. Clique em **Add secret**

---

## 🔑 Como obter a chave SSH privada?

### Opção A: Usar chave existente

Se você já acessa sua VPS via SSH sem senha, você já tem uma chave:

```bash
# No seu computador local (não no servidor!)
cat ~/.ssh/id_rsa
```

**Copie TODO o conteúdo** (incluindo as linhas `-----BEGIN` e `-----END`) e cole no secret `SSH_PRIVATE_KEY`.

---

### Opção B: Criar uma nova chave SSH

Se você não tem chave SSH ou quer criar uma específica para o deploy:

```bash
# No seu computador local
ssh-keygen -t rsa -b 4096 -C "deploy-leadsimobi" -f ~/.ssh/leadsimobi_deploy
```

Quando perguntar por senha, **deixe em branco** (apenas pressione Enter).

Agora você tem dois arquivos:
- `~/.ssh/leadsimobi_deploy` (chave privada) → vai no secret `SSH_PRIVATE_KEY`
- `~/.ssh/leadsimobi_deploy.pub` (chave pública) → vai no servidor

**Copiar chave privada:**
```bash
cat ~/.ssh/leadsimobi_deploy
```

**Adicionar chave pública no servidor:**
```bash
# Conecte-se ao servidor
ssh seu_usuario@seu_servidor

# Adicione a chave pública
echo "COLE_AQUI_O_CONTEUDO_DO_.pub" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

---

### Opção C: Usar senha SSH (não recomendado)

Se você prefere usar senha em vez de chave SSH, modifique o workflow:

1. Instale `sshpass` no runner (adicione step no workflow)
2. Crie secret `SSH_PASSWORD` com sua senha
3. Use `sshpass -p "$SSH_PASSWORD" ssh ...` nos comandos

**⚠️ Atenção:** Usar senha é menos seguro que chave SSH!

---

## ✅ Verificar configuração

Após adicionar todos os secrets, você deve ver algo assim em **Settings → Secrets and variables → Actions**:

```
SSH_HOST
SSH_USER
SSH_PRIVATE_KEY
SSH_PORT
SERVER_PROJECT_PATH
```

---

## 🧪 Testar conexão SSH

Antes de fazer o deploy, teste se a conexão SSH funciona:

```bash
# No seu computador local
ssh -i ~/.ssh/id_rsa seu_usuario@seu_servidor

# Se usou chave específica:
ssh -i ~/.ssh/leadsimobi_deploy seu_usuario@seu_servidor
```

Se conectar sem pedir senha, está tudo certo! ✅

---

## 🚀 Próximo passo

Depois de configurar os secrets, vá para o arquivo **03-preparar-servidor.md** para configurar o servidor.
