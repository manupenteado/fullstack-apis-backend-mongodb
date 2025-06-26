# FullStack-APIs - Backend

Este repositório contém o código-fonte do back-end da aplicação de busca de filmes, responsável por gerenciar usuários, autenticação e as listas de filmes (`Quero Assistir` e `Assistidos`). Ele é construído com Node.js, Express e utiliza MongoDB como banco de dados.

## Tecnologias Utilizadas

*   **Node.js:** Ambiente de execução JavaScript assíncrono e baseado em eventos.
*   **Express.js:** Framework web rápido e minimalista para Node.js.
*   **MongoDB:** Banco de dados NoSQL orientado a documentos.
*   **Mongoose:** Modelagem de objetos MongoDB para Node.js, fornecendo uma solução baseada em esquema para modelar os dados da aplicação.
*   **JWT (JSON Web Tokens):** Para autenticação e autorização de usuários.
*   **Bcrypt:** Para hashing seguro de senhas.
*   **CORS:** Middleware para habilitar o Cross-Origin Resource Sharing.
*   **Dotenv:** Para carregar variáveis de ambiente de um arquivo `.env`.
*   **Nodemon:** Ferramenta que ajuda no desenvolvimento de aplicações baseadas em Node.js reiniciando automaticamente o servidor quando arquivos são alterados.

## Configuração do Projeto

Para configurar e executar o projeto em sua máquina local, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter o Node.js (versão 18 ou superior), npm (ou yarn) e Docker (para o MongoDB) instalados em sua máquina.

### Instalação

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/manupenteado/fullstack-apis-backend-mongodb.git backend
    cd backend
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configuração das Variáveis de Ambiente:**

    Crie um arquivo `.env` na raiz do projeto (na mesma pasta de `package.json`) e adicione as seguintes variáveis de ambiente:

    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/movie_app
    JWT_SECRET=SEU_SEGREDO_JWT_AQUI
    ```

    *   **`PORT`**: A porta em que o servidor Express será executado (padrão: 3000).
    *   **`MONGODB_URI`**: A URI de conexão para o seu banco de dados MongoDB. Se estiver usando o Docker Compose, a URI padrão é `mongodb://localhost:27017/movie_app`.
    *   **`JWT_SECRET`**: Uma string secreta forte usada para assinar e verificar os JSON Web Tokens. Você pode gerar uma usando o comando `npm run generate-secret-key`.

### Execução do Banco de Dados (MongoDB com Docker)

O projeto utiliza Docker Compose para facilitar a configuração do MongoDB. Certifique-se de que o Docker esteja em execução.

1.  **Inicie o contêiner do MongoDB:**

    ```bash
    npm run start:database
    ```

    Este comando iniciará um contêiner MongoDB em segundo plano. Você pode verificar o status com `docker ps`.

2.  **Para parar o contêiner do MongoDB:**

    ```bash
    npm run stop:database
    ```

### Execução do Servidor

Para iniciar o servidor de desenvolvimento, execute o seguinte comando:

```bash
npm run start:app
```

O servidor estará disponível em `http://localhost:3000/` (ou na porta especificada em sua variável `PORT`).

## Estrutura do Projeto

*   `src/`: Contém o código-fonte da aplicação back-end.
    *   `src/index.js`: Ponto de entrada principal da aplicação Express.
    *   `src/routes/`: Define as rotas da API.
    *   `src/controller/`: Contém a lógica de negócios para cada rota.
    *   `src/models/`: Define os esquemas e modelos do Mongoose para o MongoDB.
    *   `src/database/`: Contém a configuração de conexão com o banco de dados.
    *   `src/middleware/`: Contém middlewares personalizados (e.g., autenticação).
    *   `src/services/`: Contém a lógica de negócios e interação com o banco de dados, separada dos controladores.
*   `docker-compose.yml`: Arquivo de configuração para o Docker Compose.
*   `vercel.json`: Configuração para deploy no Vercel (se aplicável).

## Endpoints da API

Os principais endpoints da API incluem:

*   `/users`: Para operações relacionadas a usuários (registro, login).
*   `/user-movie-list`: Para gerenciar as listas de filmes de um usuário.

## Contribuição

Sinta-se à vontade para contribuir com melhorias e novas funcionalidades. Por favor, siga as boas práticas de desenvolvimento e crie pull requests para suas alterações.

