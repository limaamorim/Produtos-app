# Backend - API de Produtos com Upload de Imagens

Este é um backend simples desenvolvido com **Node.js**, **Express** e **MongoDB**, que permite o cadastro, listagem e remoção de produtos, incluindo o upload de imagens.

## Tecnologias Utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Multer
- Dotenv
- CORS

## Pré-requisitos

- Node.js instalado
- MongoDB em execução local ou na nuvem

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto com o conteúdo:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/nome-do-banco
```

> Altere o valor de `MONGO_URI` conforme necessário.

## Rodando o Projeto

```bash
npm start
```

A API estará disponível em `http://localhost:3000`.

## Estrutura do Projeto

```
.
├── models/
│   └── Produto.js       # Modelo do produto
├── routes/
│   └── produtos.js      # Rotas da API
├── uploads/             # Pasta para imagens enviadas
├── server.js            # Arquivo principal
├── .env                 # Variáveis de ambiente
├── package.json
└── README.md
```

## Endpoints da API

### POST `/produtos`

Cria um novo produto.

**Campos (form-data):**
- `nome` (obrigatório)
- `descricao` (opcional)
- `imagem` (arquivo de imagem, opcional)

### GET `/produtos`

Retorna a lista de produtos cadastrados.

### DELETE `/produtos/:id`

Remove um produto pelo ID. Se houver uma imagem associada, ela será excluída do servidor.

## Acesso às Imagens

Imagens enviadas podem ser acessadas diretamente pela URL:

```
http://localhost:3000/uploads/NOME_DA_IMAGEM
```

## Licença

Projeto licenciado sob a licença ISC.
