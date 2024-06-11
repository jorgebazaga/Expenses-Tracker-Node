const router = require('express').Router();
const ExcelController = require("../controller/excel.controller");
const md_autenticado = require('../middleware/autenticado');

/**
 * @swagger
 * /exportarexcel/{id}:
 *   post:
 *     summary: Exportar gastos a Excel
 *     description: Genera un archivo Excel con los gastos de un usuario.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID_Categoria:
 *                 type: integer
 *                 description: ID de la categoría de los gastos
 *               Mes:
 *                 type: integer
 *                 description: Mes de los gastos a exportar
 *     responses:
 *       200:
 *         description: Archivo Excel creado correctamente.
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Error al crear el archivo Excel
 */
router.post("/exportarexcel/:id",[md_autenticado.asegurarAutorizacion], async (req, res) => {
    ExcelController.exportToExcel(req, res);
});

router.post("/exportarcsv/:id",[md_autenticado.asegurarAutorizacion], async (req, res) => {
    ExcelController.exportToCSV(req, res);
});

module.exports = router;