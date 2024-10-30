const router = require("express").Router();

router.get("/", (req, res) => {
    res.status(200).json({
        statusCode: 200,
        message: "API is running"
    });
});

module.exports = router;