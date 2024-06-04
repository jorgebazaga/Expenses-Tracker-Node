const router = require('express').Router();
const CategoriaController = require("../controller/categoria.controller");
const md_autenticado = require('../middleware/autenticado');

router.get("/categoria",[md_autenticado.asegurarAutorizacion], async (req, res) => {
    CategoriaController.obtenerCategoria(req, res);
  });

router.post("/categoria",[md_autenticado.asegurarAutorizacion], async (req, res) => {
    CategoriaController.crearCategoria(req, res);
  });

router.put("/categoria/:id",[md_autenticado.asegurarAutorizacion], async (req, res) => {
    CategoriaController.actualizarCategoria(req, res);
  });

router.delete("/categoria/:id",[md_autenticado.asegurarAutorizacion], async (req, res) => {
    CategoriaController.borrarCategoria(req, res);
  });
  
module.exports = router;