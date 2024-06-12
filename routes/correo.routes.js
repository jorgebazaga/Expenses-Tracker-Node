const router = require('express').Router();
const CorreoController = require('../controller/correo.controller.js');
const md_autenticado = require('../middleware/autenticado');

router.post("/enviarCorreo", async (req, res) => {
    CorreoController.enviarCorreo(req, res);
});

router.post("/recuperar-contrasena-correo", async (req, res) => {
    CorreoController.olvidoContrasena(req, res);
});



module.exports = router;