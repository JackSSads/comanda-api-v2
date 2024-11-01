const express = require("express");
const app = express();
require("dotenv").config();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: process.env.URL_FRONT } });

const logger = require("./logger");

const cors = require("cors");

const connection = require("./db/connection");

const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const checkRouter = require("./routes/checkRouter");
const loginRouter = require("./routes/loginRouter");
const logoutRouter = require("./routes/logoutRouter");
const cashierRouter = require("./routes/cashierRouter");
const productRouter = require("./routes/productRouter");
const statusApiRouter = require("./routes/statusApiRouter");

// Middleware de logs para requisições HTTP
app.use((req, res, next) => {
    logger.info(`Request: ${req.method} ${req.url}`);
    next();
});

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

app.use(cors({
    origin: [process.env.URL_FRONT],
    credentials: true,
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
}));

// Rotas
app.use("/", statusApiRouter);
app.use("/check", authRouter);
app.use("/login", loginRouter);
app.use("/usuario", userRouter);
app.use("/logout", logoutRouter);
app.use("/caixa", cashierRouter);
app.use("/comanda", checkRouter);
app.use("/produto", productRouter);

// Eventos de WebSocket
io.on("connection", (socket) => {
    logger.info("Novo cliente conectado");

    socket.on("disconnect", () => {
        logger.info("Cliente desconectado");
    });

    socket.on("novo_pedido", (pedido) => {
        socket.data.pedido = pedido;
        logger.info(`Novo pedido recebido: ${JSON.stringify(pedido)}`);
        socket.broadcast.emit("lista_novo_pedido", socket.data.pedido);
    });

    socket.on("nova_comanda", () => {
        logger.info("Nova comanda emitida");
        socket.broadcast.emit("nova_comanda");
    });

    socket.on("comanda_finalizada", (data) => {
        socket.data.comanda_finalizada = data;
        logger.info(`Comanda finalizada: ${JSON.stringify(data)}`);
        socket.broadcast.emit("comanda_finalizada", socket.data.comanda_finalizada);
    });

    socket.on("produto_pronto", (data) => {
        socket.data.produto_pronto = data;
        logger.info(`Produto pronto: ${JSON.stringify(data)}`);
        socket.broadcast.emit("produto_pronto", socket.data.produto_pronto);
    });

    socket.on("produto_removido", (data) => {
        socket.data.produto_removido = data;
        logger.info(`Produto removido: ${JSON.stringify(data)}`);
        socket.broadcast.emit("produto_removido", socket.data.produto_removido);
    });

    socket.on("alterar_quantidade", (data) => {
        socket.data.alterar_quantidade = data;
        logger.info(`Quantidade alterada: ${JSON.stringify(data)}`);
        socket.broadcast.emit("alterar_quantidade", socket.data.alterar_quantidade);
    });

    socket.on("comanda_cancelada", (data) => {
        socket.data.comanda_cancelada = data;
        logger.info(`Comanda cancelada: ${JSON.stringify(data)}`);
        socket.broadcast.emit("comanda_cancelada", socket.data.comanda_cancelada);
    });
});

// Conexão ao banco de dados
connection
    .then(() => {
        server.listen(process.env.PORT_BACK, () => {
            logger.info(`Servidor iniciado na porta ${process.env.PORT_BACK}`);
        });
        logger.info("Conectado ao banco de dados com sucesso");
    })
    .catch((err) => {
        logger.error("Erro ao conectar ao banco de dados", err);
    });
