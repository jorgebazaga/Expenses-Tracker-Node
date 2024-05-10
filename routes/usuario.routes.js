const router = require('express').Router();
const UsuarioController = require('../controller/usuario.controller');
const md_autenticado = require('../middleware/autenticado');

router.post("/login", async (req, res) => {
    UsuarioController.comprobarLogin(req, res);
  });

router.post("/registrar", async (req, res) => {
    UsuarioController.registrarUsuario(req, res);
  });


router.get("/protegido",[md_autenticado.asegurarAutorizacion], async (req, res) => {
  UsuarioController.protegido(req, res);
});

module.exports = router;