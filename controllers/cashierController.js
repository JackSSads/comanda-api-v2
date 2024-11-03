const Cashier = require("../models/Cashier");
const logger = require("../logger");

module.exports = class CashierController {
    static async get(req, res) {
        try {
            const data = await Cashier.findOne();

            if (!data) {
                try {

                    const data = { comandas: [], totalValue: 0, status: true };

                    await Cashier.create(data);

                    const dataGet = await Cashier.findOne();

                    return new Promise(() => res.status(200).json({ data: dataGet, status: true }));

                } catch (error) {
                    logger.error("caixaController > get() | Erro ao realizar requizição");
                    return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
                };
            } else {
                return new Promise(() => res.status(200).json({ data, status: false }));
            };
        } catch (error) {
            logger.error("caixaController > get() | Erro ao realizar requizição");
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async update(req, res) {
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

    static async delete(req, res) {
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