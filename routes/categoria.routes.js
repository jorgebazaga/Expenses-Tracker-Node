const router = require('express').Router();
const CategoriaController = require("../controller/categoria.controller");
const md_autenticado = require('../middleware/autenticado');

router.get("/categoria",[md_autenticado.asegurarAutorizacion], async (req, res) => {
    CategoriaController.obtenerCategoria(req, res);
  });

module.exports = router;