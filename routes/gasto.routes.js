const router = require('express').Router();
const GastoController = require("../controller/gasto.controller");

router.post("/nuevoGasto", async (req, res) => {
    GastoController.crearGasto(req, res);
});

module.exports = router;