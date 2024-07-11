const router = require("express").Router();

const auth = require("../auth");

router.get("/", auth, (req, res) => {
    res.status(200).json({ authenticated: true });
});

module.exports = router;