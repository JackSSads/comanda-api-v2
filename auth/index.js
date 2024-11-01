require("dotenv").config();
const logger = require("../logger");

const User = require('../models/User');

const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.cookie.split('Authorization=')[1];

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findOne({ _id: decoded._id });

        if (!user) {
            logger.info("User not found");
            throw new Error("User not found");
        };

        req.token = token;
        req.user = user;
        next();

    } catch (error) {
        logger.error("Unauthorized access");
        return res.status(401).json({ message: "Unauthorized access" });
    };
};

module.exports = auth;