const router = require("express").Router();

const CashierController = require("../controllers/cashierController");

const auth = require("../auth");

router.get("/", /* auth, */ CashierController.get);
router.put("/:id", /* auth, */ CashierController.update);
router.delete("/:id", /* auth, */ CashierController.delete);

module.exports = router;