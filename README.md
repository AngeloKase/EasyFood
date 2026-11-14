# 🍴 EasyFood

Sistema de gerenciamento de restaurantes desenvolvido como projeto acadêmico.

O EasyFood possui uma API REST integrada a um banco de dados PostgreSQL, autenticação de usuários com JWT e uma interface web para visualização e gerenciamento de restaurantes e pratos.

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
- Upload e gerenciamento de imagens
- Envio de e-mails
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
- Sharp
- Nodemailer

## Frontend

- HTML5
- CSS3
- JavaScript

---

# ✨ Funcionalidades

## 👤 Sistema de Usuários

- Cadastro de usuários
- Login
- Criptografia de senhas utilizando bcryptjs
- Autenticação utilizando JWT
- Identificação do usuário autenticado
- Proteção de operações que exigem autenticação
- Envio automático de e-mail de boas-vindas após o cadastro

## 🍴 Gerenciamento de Restaurantes

- Listagem de restaurantes
- Cadastro de restaurantes
- Edição de restaurantes
- Remoção de restaurantes
- Seleção de gênero
- Avaliação dos restaurantes
- Upload de imagens
- Filtro de restaurantes por gênero

## 🍽️ Gerenciamento de Pratos

- Cadastro de pratos
- Associação de pratos a restaurantes
- Registro de nome, descrição e preço
- Upload de imagens dos pratos
- Listagem de pratos cadastrados

## 📧 Envio de E-mails

O sistema utiliza Nodemailer para realizar o envio automático de e-mails de boas-vindas após o cadastro de um novo usuário.

As configurações de acesso ao serviço de e-mail são armazenadas em variáveis de ambiente, evitando a exposição de credenciais no código-fonte.

## 🔐 Segurança

O sistema utiliza JSON Web Token (JWT) para verificar se o usuário possui uma sessão autenticada antes de permitir operações protegidas.

As senhas são armazenadas com criptografia utilizando bcryptjs.

As credenciais de serviços externos e as configurações sensíveis são mantidas em um arquivo `.env`, que não deve ser enviado ao repositório.

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

- **Routes:** define as rotas disponíveis na API.
- **Controller:** recebe as requisições e retorna as respostas.
- **Service:** concentra as operações e regras relacionadas aos dados.
- **Database:** disponibiliza a conexão com o Prisma.
- **Prisma:** realiza a comunicação com o PostgreSQL.
- **PostgreSQL:** responsável pela persistência dos dados.

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
│   │   ├── remover-restaurante.js
│   │   └── pratos.js
│   ├── images/
│   │   ├── restaurants/
│   │   └── dishes/
│   ├── index.html
│   └── pratos.html
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── database/
│   │   └── prisma.js
│   ├── modules/
│   │   ├── auth/
│   │   ├── restaurant/
│   │   ├── dish/
│   │   ├── email/
│   │   └── shared/
│   ├── app.js
│   └── server.js
│
├── docs/
│   └── ADRs e documentação do projeto
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

*Observação: a estrutura apresenta os principais diretórios e módulos do projeto.*

---

# 🔑 Autenticação

A autenticação do sistema utiliza JSON Web Token (JWT).

## Principais rotas

### Cadastro

```http
POST /auth/register
```

Responsável pelo cadastro de novos usuários. Após o registro, o sistema tenta enviar um e-mail de boas-vindas.

### Login

```http
POST /auth/login
```

Realiza a autenticação do usuário e retorna um token JWT.

### Usuário autenticado

```http
GET /auth/me
```

Utiliza o token JWT para identificar o usuário autenticado.

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

# 🍽️ Pratos

A API permite cadastrar e consultar pratos associados aos restaurantes.

## Principais rotas

```http
GET  /dishes
POST /dishes
POST /dishes/:id/image
```

### GET

Retorna os pratos cadastrados, incluindo informações relacionadas ao restaurante e à imagem.

### POST

Realiza o cadastro de um prato, com informações como nome, descrição, preço e restaurante associado.

### POST /:id/image

Permite enviar uma imagem para um prato já cadastrado. Essa operação exige autenticação.

---

# 🗄️ Banco de Dados

O projeto utiliza PostgreSQL como banco de dados e Prisma ORM para realizar a comunicação entre a aplicação e o banco.

Principais entidades:

- User
- Restaurant
- Genre
- Dish

Os restaurantes possuem relacionamento com os gêneros cadastrados no sistema, enquanto os pratos são associados aos respectivos restaurantes.

---

# 📷 Upload de Imagens

O EasyFood permite o envio de imagens de restaurantes e pratos.

O upload utiliza:

- **Multer:** recebimento dos arquivos enviados.
- **Sharp:** processamento e redimensionamento das imagens.

As imagens são armazenadas localmente nas seguintes pastas:

```text
public/images/restaurants/
public/images/dishes/
```

As imagens dos pratos são validadas para aceitar os formatos JPEG, PNG e WebP, com limite de tamanho de 5 MB. O processamento utiliza redimensionamento para até 800 × 800 pixels e conversão para WebP.

A aplicação salva no banco de dados o caminho da imagem para que ela possa ser exibida no frontend.

---

# 📧 Configuração de E-mail

O envio de e-mails utiliza Nodemailer com SMTP do Gmail.

Para configurar, adicione as seguintes variáveis ao arquivo `.env`:

```env
EMAIL_USER="seu-email@gmail.com"
EMAIL_PASS="sua-senha-de-aplicativo"
```

Utilize uma senha de aplicativo do Google, quando aplicável, e nunca compartilhe suas credenciais.

O envio do e-mail de boas-vindas é realizado após o cadastro do usuário. Caso ocorra uma falha no envio, o cadastro continua sendo realizado normalmente.

---

# 🚀 Como executar o projeto

## 1. Instalar o Node.js

Caso ainda não tenha o Node.js instalado, instale uma versão compatível com o projeto.

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
EMAIL_USER="seu-email@gmail.com"
EMAIL_PASS="sua-senha-de-aplicativo"
```

Substitua os valores de exemplo pelas configurações do seu ambiente.

## 6. Criar ou atualizar as tabelas

```bash
npx prisma db push
```

## 7. Iniciar o servidor

```bash
npm start
```

Caso não exista um script de inicialização configurado no `package.json`, utilize:

```bash
node src/server.js
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

- Integração das funcionalidades de perfil ao frontend.
- Página específica para usuários autenticados.
- Exibição e atualização da foto de perfil pela interface web.
- Edição das informações pessoais pela interface.
- Sistema de permissões para administradores.
- Controle de contas administrativas.
- Validações mais avançadas.
- Sistema de favoritos.
- Avaliações realizadas pelos usuários.

---

# 📚 Documentação

As decisões arquiteturais e documentos relacionados ao desenvolvimento do projeto podem ser organizados na pasta:

```text
docs/
```

A documentação utiliza ADRs (Architecture Decision Records) para registrar decisões importantes tomadas durante o desenvolvimento.

---

# 👨‍💻 Projeto Acadêmico

Projeto desenvolvido com o objetivo de aplicar conceitos de:

- Desenvolvimento de APIs REST
- Arquitetura de software
- Banco de dados
- Autenticação e segurança
- Desenvolvimento web
- Upload e processamento de arquivos
- Integração com serviços de e-mail
- Organização de código
- Versionamento com Git e GitHub
