const router = require('express').Router();
const UsuarioController = require('../controller/usuario.controller');

router.post("/login", async (req, res) => {
    UsuarioController.comprobarLogin(req, res);
  });

module.exports = router;