# 🍴 EasyFood

Sistema de gerenciamento de restaurantes desenvolvido como projeto acadêmico.

O EasyFood possui uma API REST integrada a um banco de dados PostgreSQL, autenticação de usuários com JWT e uma interface web para visualização e gerenciamento de restaurantes.

---

# 📌 Objetivo

O objetivo do EasyFood é desenvolver uma aplicação para gerenciamento de restaurantes, aplicando conceitos de desenvolvimento de APIs, banco de dados, autenticação e arquitetura em camadas.

O projeto busca integrar:

- API REST
- Banco de dados
- Autenticação
- Arquitetura em camadas
- Frontend e backend
- ORM
- Versionamento com Git e GitHub

---

# 🛠️ Tecnologias Utilizadas

## Backend

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT
- bcryptjs
- CORS
- Multer

## Frontend

- HTML5
- CSS3
- JavaScript

---

# ✨ Funcionalidades

## 👤 Sistema de Usuários

- Cadastro de usuários
- Login
- Criptografia de senhas utilizando bcrypt
- Autenticação utilizando JWT
- Identificação do usuário autenticado
- Proteção das operações administrativas

## 🍴 Gerenciamento de Restaurantes

- Listagem de restaurantes
- Cadastro de restaurantes
- Edição de restaurantes
- Remoção de restaurantes
- Seleção de gênero
- Avaliação dos restaurantes
- Upload de imagens
- Filtro de restaurantes por gênero

## 🔐 Segurança

As operações de cadastro, edição e remoção de restaurantes exigem autenticação.

O sistema utiliza JSON Web Token (JWT) para verificar se o usuário possui uma sessão autenticada antes de permitir operações protegidas.

---

# 🏗️ Arquitetura

O projeto utiliza uma arquitetura organizada em camadas:

```text
Requisição
    ↓
Routes
    ↓
Controller
    ↓
Service
    ↓
Prisma
    ↓
PostgreSQL
```

Cada camada possui uma responsabilidade específica:

- Routes: define as rotas disponíveis na API.
- Controller: recebe as requisições e retorna as respostas.
- Service: concentra as operações e regras relacionadas aos dados.
- Database: disponibiliza a conexão com o Prisma.
- Prisma: realiza a comunicação com o PostgreSQL.
- PostgreSQL: responsável pela persistência dos dados.

---

# 📂 Estrutura do Projeto

```text
EasyFood/
│
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── app.js
│   │   ├── cadastro-restaurante.js
│   │   ├── editar-restaurante.js
│   │   └── remover-restaurante.js
│   ├── images/
│   │   └── restaurants/
│   ├── index.html
│   ├── cadastro-restaurante.html
│   ├── editar-restaurante.html
│   └── remover-restaurante.html
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── database/
│   │   └── prisma.js
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.service.js
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.middleware.js
│   │   │   └── auth.routes.js
│   │   └── restaurant/
│   │       ├── restaurant.service.js
│   │       ├── restaurant.controller.js
│   │       └── restaurant.routes.js
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

# 🔑 Autenticação

A autenticação do sistema utiliza JSON Web Token (JWT).

## Principais rotas

### Cadastro

```http
POST /auth/register
```

Responsável pelo cadastro de novos usuários.

### Login

```http
POST /auth/login
```

Realiza a autenticação do usuário e retorna um token JWT.

### Usuário autenticado

```http
GET /auth/me
```

Utiliza o token JWT para verificar a identidade do usuário autenticado.

---

# 🍴 Restaurantes

A API possui as seguintes operações:

```http
GET    /restaurants
POST   /restaurants
PUT    /restaurants/:id
DELETE /restaurants/:id
```

### GET

Retorna os restaurantes cadastrados no banco de dados.

### POST

Cadastra um novo restaurante.

Essa operação exige autenticação.

### PUT

Permite editar um restaurante existente.

Essa operação também exige autenticação.

### DELETE

Remove um restaurante do banco de dados.

Essa operação exige autenticação.

---

# 🗄️ Banco de Dados

O projeto utiliza PostgreSQL como banco de dados e Prisma ORM para realizar a comunicação entre a aplicação e o banco.

Principais entidades:

- User
- Restaurant
- Genre

Os restaurantes possuem relacionamento com os gêneros cadastrados no sistema.

---

# 📷 Upload de Imagens

O EasyFood permite o envio de imagens dos restaurantes.

O upload é realizado utilizando a biblioteca Multer e os arquivos são armazenados na pasta:

```text
public/images/restaurants/
```

A aplicação salva no banco o caminho da imagem para que ela possa ser exibida no frontend.

---

# 🚀 Como executar o projeto

## 1. Instalar o Node.js

Caso ainda não tenha o Node.js instalado, instale a versão adequada para seu sistema.

## 2. Clonar o projeto

```bash
git clone URL_DO_REPOSITORIO
```

## 3. Entrar na pasta

```bash
cd EasyFood
```

## 4. Instalar as dependências

```bash
npm install
```

## 5. Configurar o banco de dados

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/easyfood"
JWT_SECRET="sua-chave-secreta"
```

Substitua `SUA_SENHA` pela senha configurada no PostgreSQL.

## 6. Criar/atualizar as tabelas

```bash
npx prisma db push
```

## 7. Iniciar o servidor

```bash
node src/server.js
```

O servidor será iniciado em:

```text
http://localhost:3000
```

## 8. Acessar o sistema

Abra no navegador:

```text
http://localhost:3000
```

---

# 🔄 Fluxo da Aplicação

```text
Usuário
   ↓
Frontend
   ↓
Express
   ↓
Routes
   ↓
Controller
   ↓
Service
   ↓
Prisma
   ↓
PostgreSQL
```

### Para operações protegidas

```text
Usuário
   ↓
Login
   ↓
JWT
   ↓
Middleware de autenticação
   ↓
Controller
   ↓
Service
   ↓
PostgreSQL
```

---

# 🔮 Melhorias Futuras

Algumas funcionalidades podem ser adicionadas futuramente:

- Sistema de permissões para administradores
- Página específica para usuários autenticados
- Controle de contas administrativas
- Melhorias na interface
- Validações mais avançadas
- Sistema de favoritos
- Avaliações realizadas pelos usuários

---

# 📚 Documentação

As decisões arquiteturais e documentos relacionados ao desenvolvimento do projeto podem ser organizados na pasta:

```text
docs/
```

---

# 👨‍💻 Projeto Acadêmico

Projeto desenvolvido com o objetivo de aplicar conceitos de:

- Desenvolvimento de APIs
- Arquitetura de software
- Banco de dados
- Autenticação
- Desenvolvimento web
- Organização de código
- Versionamento
