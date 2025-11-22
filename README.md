# 🚀 Guia de Deploy Automático para LeadsImobi

Olá! Preparei este pacote completo para você configurar o deploy automático do seu projeto **LeadsImobi** usando **GitHub Actions**.

Siga os passos abaixo na ordem correta. Em 15 minutos, seu deploy estará funcionando!

---

## 📋 Estrutura do Pacote

Este pacote contém os seguintes arquivos:

```
leadsimobi-deploy/
├── .github/
│   └── workflows/
│       └── deploy.yml      # 🤖 O workflow do GitHub Actions
├── 01-inicializar-git.sh   # 📜 Script para iniciar seu repositório Git local
├── 02-configurar-secrets.md # 🔐 Guia para configurar os secrets no GitHub
├── 03-preparar-servidor.sh # 🖥️  Script para preparar sua VPS
└── README.md               # 👈 Este guia
```

---

## ⚙️ Passo a Passo para o Deploy

### Passo 1: Subir seu Projeto para o GitHub

Primeiro, vamos colocar seu código local em um repositório **privado** no GitHub.

1.  **Copie o script `01-inicializar-git.sh`** para a pasta raiz do seu projeto `leadsimobi` (a pasta que contém `frontend`, `backend`, etc.).
2.  Abra o terminal nessa pasta e execute o script:

    ```bash
    bash 01-inicializar-git.sh
    ```

3.  O script vai te guiar para **criar um repositório no GitHub** e executar os comandos `git remote add` e `git push`.

    > **Importante:** Crie o repositório como **PRIVADO** e **NÃO** adicione `README`, `.gitignore` ou licença. O script já cuidou de tudo.

Ao final, seu código estará no GitHub!

### Passo 2: Preparar o Servidor (VPS)

Agora, vamos preparar sua VPS para receber o projeto.

1.  **Acesse sua VPS** via SSH:

    ```bash
    ssh seu_usuario@seu_servidor
    ```

2.  **Copie o conteúdo do script `03-preparar-servidor.sh`** para um arquivo na sua VPS (ex: `preparar.sh`) ou simplesmente copie e cole os comandos no terminal.

3.  **Execute o script**:

    ```bash
    bash preparar.sh
    ```

4.  O script vai instalar Docker, Docker Compose, Git e criar a pasta do projeto. Ao final, ele pedirá para você **clonar o repositório** e **configurar o arquivo `.env`**.

    > **Atenção:** Siga as instruções do final do script para clonar o repositório e, principalmente, para criar e configurar o arquivo `.env` com suas senhas e chaves. **O deploy não funcionará sem o `.env` correto no servidor.**

### Passo 3: Configurar os Secrets no GitHub

Este é o passo mais importante para que o GitHub Actions consiga acessar sua VPS.

1.  Abra o guia `02-configurar-secrets.md`.
2.  Siga **atentamente** as instruções para criar os 5 secrets necessários (`SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY`, `SSH_PORT`, `SERVER_PROJECT_PATH`) nas configurações do seu repositório GitHub.

    > **Dica:** A parte mais crítica é a `SSH_PRIVATE_KEY`. O guia explica como obter a chave correta. Se você tiver dúvidas, me pergunte!

### Passo 4: Adicionar o Workflow de Deploy

Finalmente, vamos adicionar o arquivo que define o processo de deploy automático.

1.  No seu projeto local (na sua máquina), crie as pastas `.github/workflows`.
2.  **Copie o arquivo `deploy.yml`** que está neste pacote para dentro da pasta `.github/workflows`.
3.  Faça o commit e o push dessa alteração:

    ```bash
    git add .github/workflows/deploy.yml
    git commit -m "ci: Adiciona workflow de deploy automático"
    git push origin main
    ```

---

## 🎉 Deploy em Ação!

Pronto! A partir de agora, **qualquer `push` na branch `main` irá disparar o deploy automático**.

Você pode acompanhar a execução em tempo real na aba **Actions** do seu repositório no GitHub.

### Verificando o Deploy

-   **No GitHub:** Vá em `Actions`, clique no workflow `Deploy LeadsImobi` e veja se todos os passos foram concluídos com sucesso (em verde ✅).
-   **No Servidor:** Acesse sua VPS e execute `docker ps` para ver os containers rodando.
-   **No Navegador:** Acesse `http://<ip_do_seu_servidor>:3001` para ver o frontend.

---

Se algo der errado ou se tiver qualquer dúvida, é só me chamar! Estou aqui para ajudar. 😉
