const router = require('express').Router();
const CategoriaController = require("../controller/categoria.controller");
const md_autenticado = require('../middleware/autenticado');

/**
 * @swagger
 * /categoria:
 *   get:
 *     summary: Obtener todas las categorías
 *     description: Obtiene todas las categorías disponibles.
 *     responses:
 *       200:
 *         description: Categorías obtenidas correctamente.
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
 *                   example: Categorías obtenidas correctamente
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ID_Categoria:
 *                         type: integer
 *                         example: 1
 *                       Nombre:
 *                         type: string
 *                         example: Alimentación
 *                       Descripcion:
 *                         type: string
 *                         example: Gastos relacionados con la compra de alimentos
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
router.get("/categoria",[md_autenticado.asegurarAutorizacion], async (req, res) => {
    CategoriaController.obtenerCategoria(req, res);
  });

  /**
 * @swagger
 * /categoria:
 *   post:
 *     summary: Crear una nueva categoría
 *     description: Permite crear una nueva categoría.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nombre:
 *                 type: string
 *                 example: Transporte
 *               Descripcion:
 *                 type: string
 *                 example: Gastos relacionados con transporte
 *     responses:
 *       200:
 *         description: Categoría creada correctamente.
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
 *                   example: Categoría creada correctamente
 *                 data:
 *                   type: object
 *                   properties:
 *                     ID_Categoria:
 *                       type: integer
 *                       example: 1
 *                     Nombre:
 *                       type: string
 *                       example: Transporte
 *                     Descripcion:
 *                       type: string
 *                       example: Gastos relacionados con transporte
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
router.post("/categoria",[md_autenticado.asegurarAutorizacion], async (req, res) => {
    CategoriaController.crearCategoria(req, res);
  });

  /**
 * @swagger
 * /categoria/{id}:
 *   put:
 *     summary: Actualizar una categoría
 *     description: Permite actualizar una categoría existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nombre:
 *                 type: string
 *                 example: Transporte
 *               Descripcion:
 *                 type: string
 *                 example: Gastos relacionados con transporte
 *     responses:
 *       200:
 *         description: Categoría actualizada correctamente.
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
 *                   example: Categoría actualizada correctamente
 *                 data:
 *                   type: object
 *                   properties:
 *                     ID_Categoria:
 *                       type: integer
 *                       example: 1
 *                     Nombre:
 *                       type: string
 *                       example: Transporte
 *                     Descripcion:
 *                       type: string
 *                       example: Gastos relacionados con transporte
 *       404:
 *         description: Categoría no encontrada.
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
 *                   example: Categoría no encontrada
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
router.put("/categoria/:id",[md_autenticado.asegurarAutorizacion], async (req, res) => {
    CategoriaController.actualizarCategoria(req, res);
  });

/**
 * @swagger
 * /categoria/{id}:
 *   delete:
 *     summary: Eliminar una categoría
 *     description: Permite eliminar una categoría existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoría eliminada correctamente.
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
 *                   example: Categoría eliminada correctamente
 *       404:
 *         description: Categoría no encontrada.
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
 *                   example: Categoría no encontrada
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

router.delete("/categoria/:id",[md_autenticado.asegurarAutorizacion], async (req, res) => {
    CategoriaController.borrarCategoria(req, res);
  });
  
module.exports = router;