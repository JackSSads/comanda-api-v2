const User = require("../models/User");
const bcrypt = require("bcrypt");
const logger = require("../logger");

module.exports = class UserController {
    static async getAll(req, res) {
        try {
            const data = await User.find();

            return new Promise(() => res.status(200).json({ data, status: true }));
        } catch (error) {
            logger.error("userController > getAll() | Erro ao realizar requizição");
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async getById(req, res) {
        const { id } = req.params;

        try {
            const data = await User.findOne({ _id: id });

            if (!data) {
                logger.error("userController > getById() | Usuário não encontrado");
                return res.status(500).json({ message: "Erro ao buscar usuário", status: false });
            };

            return new Promise(() => res.status(200).json({ data, status: true }));
        } catch (error) {
            logger.error("userController > getById() | Erro ao realizar requizição");
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async create(req, res) {
        const { nameUser, func, email, pass } = req.body;

        try {
            const user = { nameUser, func, email, pass: bcrypt.hashSync(pass, 8) };

            await User.create(user);

            logger.info("userController > create() | Usuário cadastrado com sucesso");
            return new Promise(() => res.status(201).json({ message: "Usuário cadastrado com sucesso", status: true }));
        } catch (error) {
            logger.error("userController > create() | Erro ao realizar requizição");
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async updateById(req, res) {
        const { id } = req.params;
        const { nameClient, func, email, pass } = req.body;

        try {

            const data = { nameClient, func, email, pass: bcrypt.hashSync(pass, 8) };

            await User.updateOne({ _id: id }, data);

            logger.info("userController > updateById() | Usuário atualizado com sucesso");
            return new Promise(() => res.status(200).json({ message: "Usuário atualizado com sucesso", status: true }));
        } catch (error) {
            logger.error("userController > updateById() | Erro ao realizar requizição");
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async deleteById(req, res) {
        const { id } = req.params;

        if (!id) {
            logger.error("userController > deleteById() | ID do usuário não informado");
            return res.status(500).json({ message: "ID do usuário não informado", status: false });
        };

        try {
            await User.deleteOne({ _id: id });

            logger.info("userController > deleteById() | Usuário deletado com sucesso");
            return new Promise(() => res.status(200).json({ message: "Usuário deletado com sucesso", status: true }));
        } catch (error) {
            logger.error("userController > deleteById() | Erro ao realizar requizição");
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };
};