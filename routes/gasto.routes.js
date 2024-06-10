const router = require('express').Router();
const GastoController = require("../controller/gasto.controller");
const md_autenticado = require('../middleware/autenticado');

/**
 * @swagger
 * /nuevoGasto/{id}:
 *   post:
 *     summary: Crear un nuevo gasto
 *     description: Permite crear un nuevo gasto asociado a un usuario.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario al que se asociará el gasto
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Cantidad:
 *                 type: string
 *               Fecha:
 *                 type: string
 *                 format: date
 *               Descripcion:
 *                 type: string
 *               ID_Usuario:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Gasto creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     ID_Gasto:
 *                       type: integer
 *                       example: 1
 *                     Cantidad:
 *                       type: string
 *                       example: 100.00
 *                     Fecha:
 *                       type: string
 *                       format: date
 *                       example: "2024-06-10"
 *                     Descripcion:
 *                       type: string
 *                       example: Comida
 *                     ID_Usuario:
 *                       type: integer
 *                       example: 1
 *                 message:
 *                   type: string
 *                   example: Gasto creado correctamente
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
 *                   example: Error interno del servidor
 */

router.post("/nuevoGasto/:id",[md_autenticado.asegurarAutorizacion], async (req, res) => {
    GastoController.crearGasto(req, res);
});

/**
 * @swagger
 * /gastos/{id}:
 *   get:
 *     summary: Obtener gastos por ID de usuario
 *     description: Obtiene los gastos de un usuario específico por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Gastos obtenidos correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Gastos obtenidos correctamente
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ID_Gasto:
 *                         type: integer
 *                         example: 1
 *                       Cantidad:
 *                         type: string
 *                         example: '50'
 *                       Fecha:
 *                         type: string
 *                         format: date
 *                         example: '2024-06-10'
 *                       Descripcion:
 *                         type: string
 *                         example: Comida
 *                       ID_Usuario:
 *                         type: integer
 *                         example: 123
 *       '500':
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
 *                   example: Error interno del servidor
 */
router.get("/gastos/:id",[md_autenticado.asegurarAutorizacion], async (req, res) => {
    GastoController.obtenerGastosID(req, res);
});

/**
 * @swagger
 * /gasto/{id}:
 *   delete:
 *     summary: Eliminar un gasto por ID
 *     description: Elimina un gasto específico por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del gasto a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Gasto eliminado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Gasto eliminado correctamente
 *                 data:
 *                   type: integer
 *                   example: 1
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
 *                   example: Error interno del servidor
 */

router.delete("/gasto/:id",[md_autenticado.asegurarAutorizacion], async (req, res) => {
    GastoController.borrarGasto(req, res);
});

/**
 * @swagger
 * /gasto/{id}:
 *   put:
 *     summary: Actualizar un gasto por ID
 *     description: Actualiza un gasto específico por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del gasto a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID_Gasto:
 *                 type: integer
 *               Cantidad:
 *                 type: string
 *               Fecha:
 *                 type: string
 *                 format: date-time
 *               Descripcion:
 *                 type: string
 *             required:
 *               - Cantidad
 *               - Fecha
 *     responses:
 *       200:
 *         description: Gasto actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Gasto actualizado correctamente
 *                 data:
 *                   type: object
 *                   properties:
 *                     ID_Gasto:
 *                       type: integer
 *                       example: 1
 *                     Cantidad:
 *                       type: string
 *                       example: "50"
 *                     Fecha:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-10T12:00:00Z"
 *                     Descripcion:
 *                       type: string
 *                       example: "Compra de alimentos"
 *       400:
 *         description: Datos insuficientes para actualizar el gasto.
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
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Datos insuficientes para actualizar el gasto
 *       404:
 *         description: Gasto no encontrado.
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
 *                   example: Gasto no encontrado
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
 *                   example: Error interno del servidor
 */
router.put("/gasto/:id",[md_autenticado.asegurarAutorizacion], async (req, res) => {
    GastoController.editarGasto(req, res);
});

module.exports = router;