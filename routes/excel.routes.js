const router = require('express').Router();
const ExcelController = require("../controller/excel.controller");
const md_autenticado = require('../middleware/autenticado');


router.post("/exportarexcel/:id",[md_autenticado.asegurarAutorizacion], async (req, res) => {
    ExcelController.exportToExcel(req, res);
});


module.exports = router;