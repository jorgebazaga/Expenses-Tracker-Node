const router = require('express').Router();
const CorreoController = require('../controller/correo.controller.js');

router.post("/enviarCorreo", async (req, res) => {
    CorreoController.enviarCorreo(req, res);
});

module.exports = router;