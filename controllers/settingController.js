const Settings = require("../models/Setting");
const logger = require("../logger");

module.exports = class SettingsController {
    static async get(req, res) {
        const data = {
            establishmentName: "Seu Estabelecimento",
            serviceCharge: false,
            serviceChargePercentage: 0,
            imagePix: ""
        };

        try {
            const settings = await Settings.findOne(); // Pega o primeiro documento de configurações

            if (!settings) {
                logger.error("configController > get() | Nenhuma configuração encontrada. Criando uma nova configuração padrão.");

                const newSettings = await Settings.create(data);
                return res.status(200).json(newSettings);
            };

            return res.status(200).json(settings);
        } catch (error) {
            logger.error("configController > get() | Erro ao buscar as configurações", error);
            return res.status(500).json({ message: "Erro ao buscar as configurações" });
        };
    };

    static async create(req, res) {
        const {
            establishmentName,
            serviceCharge,
            serviceChargePercentage,
            imagePix
        } = req.body;

        const data = {
            establishmentName,
            serviceCharge: serviceCharge || false,
            serviceChargePercentage: serviceChargePercentage || 0,
            imagePix: imagePix || ""
        };

        try {
            const newSettings = await Settings.create(data);
            return res.status(201).json({message: "Configuração criada com sucesso", newSettings});
        } catch (error) {
            logger.error("configController > create() | Erro ao criar novas configuração", error);
            return res.status(400).json({ message: "Erro ao buscar as configurações", error: error.message });
        };
    };

    static async update(req, res) {
        const {
            _id,
            establishmentName,
            serviceCharge,
            serviceChargePercentage,
            imagePix
        } = req.body;

        const data = {
            establishmentName,
            serviceCharge,
            serviceChargePercentage,
            imagePix
        };

        try {
            const updatedSettings = await Settings.findByIdAndUpdate(_id, data, { new: true });
            if (!updatedSettings) {
                logger.error("configController > update() | Erro ao atualizar as configurações. Configuração não encontrada");
                return res.status(404).json({ message: "Configuração não encontrada" });
            };
            return res.status(200).json({message: "Configuração atualizada com sucesso", data: updatedSettings});
        } catch (error) {
            logger.error("configController > update() | Erro ao atualizar as configurações", error);
            return res.status(400).json({ message: "Bad Request", error: error.message });
        };
    };
};
