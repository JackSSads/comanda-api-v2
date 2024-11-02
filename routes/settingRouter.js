const router = require("express").Router();

const SettingsController = require("../controllers/settingController");

const auth = require("../auth");

router.get("/", /* auth, */ SettingsController.get);
router.post("/", /* auth, */ SettingsController.create);
router.put("/", /* auth, */ SettingsController.update);

module.exports = router;