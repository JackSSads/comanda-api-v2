# README da API

## Visão Geral

Esta API fornece uma aplicação do lado do servidor usando Express.js com capacidades em tempo real usando Socket.IO. A API suporta CORS e possui várias rotas para lidar com diferentes funcionalidades, como autenticação de usuários, gerenciamento de produtos e processamento de pedidos.

## Pré-requisitos

- Node.js
- npm
- MongoDB (podendo ser um instância local ou uma instância do MongoDB Atlas)

## Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/JackSSads/comanda-api-v2.git

    cd comanda-menu-api
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Crie um arquivo `.env` no diretório raiz e configure as seguintes variáveis de ambiente:
    ```bash
    PORT_BACK='sua_porta_backend'
    URL_FRONT='sua_url_frontend'
    MONGO_ATLAS='sua_string_de_conexão_com_o_banco_de_dados'
    TOKEN_SECRET='seu_token_secret'
    NODE_ENV='ativar_para_produção'
    ```

4. Certifique-se de que seu banco de dados está em execução e acessível com a string de conexão fornecida.

## Uso

Para iniciar o servidor, execute:
```bash
npm start
```

### Caso queira criar uma imagem Docker:
1. Criando imagem Docker:
    ```bash
    docker build -t <nome_para_a_imagem> .
    ```
2. Rodando a imagem Docker:
    ```bash
    docker run -p <porta_do_host>:<porta_do_container> <nome_para_a_imagem>
    ```
    Use a flag `-d` para executar o container em background.

O servidor estará rodando na porta especificada em seu arquivo `.env`.

## Endpoints da API

### Auth Router

- **URL Base:** `/check`
- **Métodos:**
  - GET

### Login Router

- **URL Base:** `/login`
- **Métodos:**
  - POST

### User Router

- **URL Base:** `/usuario`
- **Métodos:**
  - GET, POST, PUT, DELETE

### Cashier Router

- **URL Base:** `/caixa`
- **Métodos:**
  - GET, POST, PUT, DELETE

### Check Router

- **URL Base:** `/comanda`
- **Métodos:**
  - GET, POST, PUT, DELETE

### Product Router

- **URL Base:** `/produto`
- **Métodos:**
  - GET, POST, PUT, DELETE

## Eventos em Tempo Real

### Conexão

- `connection`: Disparado quando um cliente se conecta.
- `disconnect`: Disparado quando um cliente se desconecta.

### Gerenciamento de Pedidos

- `novo_pedido`: Disparado quando um novo pedido é feito.
- `nova_comanda`: Disparado quando uma nova comanda é criada.
- `comanda_finalizada`: Disparado quando uma comanda é finalizada.
- `produto_pronto`: Disparado quando um produto está pronto.
- `produto_removido`: Disparado quando um produto é removido.
- `alterar_quantidade`: Disparado quando a quantidade de um produto é alterada.
- `comanda_cancelada`: Disparado quando uma comanda é cancelada.

Cada evento é transmitido para todos os usuários com os dados relevantes.

## Configuração de CORS

A API suporta Cross-Origin Resource Sharing (CORS) com a seguinte configuração:
```javascript
app.use(cors({
    origin: [process.env.URL_FRONT],
    credentials: true,
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
}));
```

## Conexão com o Banco de Dados

A conexão com o banco de dados é tratada em `./db/connection`. Certifique-se de que sua string de conexão esteja corretamente configurada no arquivo `.env`.

## Libs utilizadas

[Express.js: 4.18.2](https://expressjs.com/)

[MongoDB: 8.0.2](https://www.mongodb.com/docs/)

[Socket.Io: 4.7.2](https://socket.io/docs/v4/)

[JSONWebToken: 9.0.2](https://jwt.io/)

[Bcrypt: 5.1.1](https://www.npmjs.com/package/bcrypt)

[CORS: 2.8.5](https://www.npmjs.com/package/cors)

---
### [Link do frontend da aplicação](https://github.com/JackSSads/comanda-v2)
