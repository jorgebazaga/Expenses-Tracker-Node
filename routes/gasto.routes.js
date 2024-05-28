const router = require('express').Router();
const GastoController = require("../controller/gasto.controller");
const md_autenticado = require('../middleware/autenticado');

router.post("/nuevoGasto/:id",[md_autenticado.asegurarAutorizacion], async (req, res) => {
    GastoController.crearGasto(req, res);
});

router.get("/gastos/:id",[md_autenticado.asegurarAutorizacion], async (req, res) => {
    GastoController.obtenerGastosID(req, res);
  });

router.delete("/gasto/:id",[md_autenticado.asegurarAutorizacion], async (req, res) => {
    GastoController.borrarGasto(req, res);
});

module.exports = router;