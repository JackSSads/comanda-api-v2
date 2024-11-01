const Check = require("../models/Check");
const logger = require("../logger");

module.exports = class CheckController {
    static async getAll(req, res) {
        try {
            const data = await Check.find();

            return new Promise(() => res.status(200).json({ data, status: true }));
        } catch (error) {
            logger.error("checkController > getAll() | Erro ao realizar requizição");
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async getById(req, res) {
        const { id } = req.params;

        try {
            const data = await Check.findOne({ _id: id });

            if (!data) {
                logger.error("checkController > getById() | Comanda não encontrada");
                return res.status(500).json({ message: "Erro ao buscar comanda", status: false });
            };

            return new Promise(() => res.status(200).json({ data, status: true }));
        } catch (error) {
            logger.error("checkController > getById() | Erro ao realizar requizição");
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async create(req, res) {
        const { nameClient, obs, totalValue, status, pagForm } = req.body;

        if (nameClient === "" || totalValue === "" || status === "") {
            logger.error("checkController > create() | Campos obrigatórios não preenchidos");
            return res.json({ message: "Preencha todos os campos", status: false });
        };

        try {
            const comanda = { nameClient, obs, totalValue, pagForm, status };

            await Check.create(comanda);

            logger.info("checkController > create() | Comanda cadastrada com sucesso");
            return new Promise(() => res.status(201).json({ message: "Comanda cadastrada com sucesso", status: true }));

        } catch (error) {
            logger.error("checkController > create() | Erro ao realizar requizição");
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async updateById(req, res) {
        const { id } = req.params;
        const { products, totalValue, status, pagForm } = req.body;

        try {

            const data = { products, totalValue, status, pagForm };

            await Check.updateOne({ _id: id }, data);

            logger.info("checkController > updateById() | Comanda atualizada com sucesso");
            return new Promise(() => res.status(200).json({ message: "Comanda atualizada", status: true }));
        } catch (error) {
            logger.error("checkController > updateById() | Erro ao realizar requizição");
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async deleteById(req, res) {
        const { id } = req.params;

        if (!id) {
            logger.error("checkController > deleteById() | ID não informado");
            return res.status(500).json({ message: "Cliente ineistente!", status: true });
        };

        try {
            await Check.deleteOne({ _id: id });

            logger.info("checkController > deleteById() | Comanda deletada com sucesso");
            return new Promise(() => res.status(200).json({ message: "Comanda deletada", status: true }));
        } catch (error) {
            logger.error("checkController > deleteById() | Erro ao realizar requizição");
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async deleteAll(req, res) {

        try {

            await Check.deleteMany({});

            logger.info("checkController > deleteAll() | Comandas deletadas com sucesso");
            return new Promise(() => res.status(200).json({ message: "Comandas deletadas", status: true }));
        } catch (error) {
            logger.error("checkController > deleteAll() | Erro ao realizar requizição");
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };
};