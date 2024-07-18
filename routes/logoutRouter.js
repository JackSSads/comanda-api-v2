const router = require("express").Router();

const  LogoutController = require("../controllers/logoutController");

router.get("/", LogoutController.logout);

module.exports = router;