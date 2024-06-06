const router = require('express').Router();
const pdfController = require("../controller/pdf.controller");
const md_autenticado = require('../middleware/autenticado');


router.post("/exportarpdf/:id",[md_autenticado.asegurarAutorizacion], async (req, res) => {
    pdfController.exportarPDF(req, res);
});


module.exports = router;