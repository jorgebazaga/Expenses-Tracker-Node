const router = require('express').Router();
const UsuarioController = require('../controller/usuario.controller');
const md_autenticado = require('../middleware/autenticado');

router.post("/login", async (req, res) => {
    UsuarioController.comprobarLogin(req, res);
  });

router.post("/registrar", async (req, res) => {
    UsuarioController.registrarUsuario(req, res);
  });

router.get("/autorizado",[md_autenticado.asegurarAutorizacion], async (req, res) => {
  res.json({ ok: true, mensaje: 'Autorizado'});
});

module.exports = router;