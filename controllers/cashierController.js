const Cashier = require("../models/Cashier");
const logger = require("../logger");

module.exports = class CashierController {
    static async getAll(req, res) {
        try {
            const data = await Cashier.find();

            if (data.length <= 0) {
                try {

                    const data = { comandas: [], totalValue: 0, status: true };

                    await Cashier.create(data);

                    const dataGet = await Cashier.find();

                    return new Promise(() => res.status(200).json({ dataGet, status: true }));

                } catch (error) {
                    logger.error("caixaController > getAll() | Erro ao realizar requizição");
                    return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
                };
            } else {
                return new Promise(() => res.status(200).json({ data, status: false }));
            };
        } catch (error) {
            logger.error("caixaController > getAll() | Erro ao realizar requizição");
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async getById(req, res) {
        const { id } = req.params;

        try {
            const data = await Cashier.findOne({ _id: id });

            if (!data) {
                logger.error("caixaController > getById() | Erro ao buscar Caixa");
                return res.status(500).json({ message: "Erro ao buscar Caixa", status: false });
            };

            return new Promise(() => res.status(200).json({ data, status: true }));
        } catch (error) {
            logger.error("caixaController > getById() | Erro ao realizar requizição");
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async create(req, res) {
        try {
            const data = { comandas: [], totalValue: 0, status: true };

            await Cashier.create(data);

            logger.info("caixaController > create() | Caixa cadastrado com sucesso");
            return new Promise(() => res.status(201).json({ message: "Caixa cadastrado com sucesso", status: true }));

        } catch (error) {
            logger.error("caixaController > create() | Erro ao realizar requizição");
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async updateById(req, res) {
        const { id } = req.params;
        const { comandas, totalValue, status } = req.body;

        try {

            const data = { comandas, totalValue, status };

            await Cashier.updateOne({ _id: id }, data);

            logger.info("caixaController > updateById() | Caixa atualizado");
            return new Promise(() => res.status(200).json({ message: "Caixa atualizado", status: true }));
        } catch (error) {
            logger.error("caixaController > updateById() | Erro ao realizar requizição");
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async deleteById(req, res) {
        const { id } = req.params;

        if (!id) {
            logger.error("caixaController > deleteById() | Caixa ineistente!");
            return res.status(500).json({ message: "Caixa ineistente!", status: false });
        };

        try {
            await Cashier.deleteOne({ _id: id });

            logger.info("caixaController > deleteById() | Caixa deletado");
            return new Promise(() => res.status(200).json({ message: "Caixa deletado", status: true }));
        } catch (error) {
            logger.error("caixaController > deleteById() | Erro ao realizar requizição");
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };
};