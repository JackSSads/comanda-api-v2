const Product = require("../models/Product");
const logger = require("../logger");

module.exports = class ProductController {
    static async getAll(req, res) {
        try {
            const data = await Product.find({});

            return new Promise(() => res.status(200).json({ data, status: true }));
        } catch (error) {
            logger.error("productController > getAll() | Erro ao realizar requizição");
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async getById(req, res) {
        const { id } = req.params;

        try {
            const data = await Product.findOne({ _id: id });

            return new Promise(() => res.status(200).json({ data, status: true }));
        } catch (error) {
            logger.error("productController > getById() | Erro ao realizar requizição");
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async create(req, res) {
        const { nameProduct, value, qnt, totalPrice, category } = req.body;

        if (nameProduct === "" || value === "" || qnt === null) {
            logger.error("productController > create() | Campos obrigatórios não preenchidos");
            return res.json({ message: "Preencha todos os campos", status: false });
        };

        try {
            const data = { nameProduct, value, qnt, totalPrice, category, status: true, obs: "" };

            await Product.create(data);

            logger.info("productController > create() | Produto cadastrado com sucesso");
            return new Promise(() => res.status(200).json({ message: "Produto cadastrado com sucesso", status: true }));

        } catch (error) {
            logger.error("productController > create() | Erro ao realizar requizição");
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async updateById(req, res) {
        const { id } = req.params;
        const { nameProduct, value, qnt, category, totalPrice } = req.body;

        try {
            const data = { nameProduct, value, category, qnt, totalPrice };

            await Product.updateOne({ _id: id }, data);

            logger.info("productController > updateById() | Produto atualizado");
            return new Promise(() => res.status(200).json({ message: "Produto atualizado", status: true }));
        } catch (error) {
            logger.error("productController > updateById() | Erro ao realizar requizição");
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async deleteById(req, res) {
        const { id } = req.params;

        if (!id) {
            logger.error("productController > deleteById() | ID não informado");
            return res.status(404).json({ message: "Produto ineistente", status: false });
        };

        try {
            await Product.deleteOne({ _id: id });

            logger.info("productController > deleteById() | Produto deletado");
            return new Promise(() => res.status(200).json({ message: "Produto deletado", status: true }));
        } catch (error) {
            logger.error("productController > deleteById() | Erro ao realizar requizição");
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };
};