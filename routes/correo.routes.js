const router = require('express').Router();
const CorreoController = require('../controller/correo.controller.js');

/**
 * @swagger
 * /enviarCorreo:
 *   post:
 *     summary: Enviar correo electrónico.
 *     description: |
 *       Permite enviar un correo electrónico a un destinatario con un asunto y un cuerpo especificados.
 *       
 *       El endpoint espera recibir un objeto JSON en el cuerpo de la solicitud con las siguientes propiedades:
 *       - destinatario: Dirección de correo electrónico del destinatario.
 *       - asunto: Asunto del correo electrónico.
 *       - cuerpo: Cuerpo del correo electrónico.
 *       
 *       Opcionalmente, se puede enviar una lista de archivos adjuntos en el cuerpo de la solicitud.
 *       
 *       En caso de éxito, se enviará el correo electrónico y se enviará una respuesta con un código 200.
 *       
 *       Respuestas posibles:
 *       - 200: Correo electrónico enviado exitosamente.
 *       - 500: Error al enviar el correo electrónico.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               destinatario:
 *                 type: string
 *                 description: Dirección de correo electrónico del destinatario.
 *               asunto:
 *                 type: string
 *                 description: Asunto del correo electrónico.
 *               cuerpo:
 *                 type: string
 *                 description: Cuerpo del correo electrónico.
 *               archivosAdjuntos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     filename:
 *                       type: string
 *                       description: Nombre del archivo adjunto.
 *                     content:
 *                       type: string
 *                       format: binary
 *                       description: Contenido del archivo adjunto.
 *             required:
 *               - destinatario
 *               - asunto
 *               - cuerpo
 *     responses:
 *       200:
 *         description: Correo electrónico enviado exitosamente.
 *       500:
 *         description: Error al enviar el correo electrónico.
 */
router.post("/enviarCorreo", async (req, res) => {
    CorreoController.enviarCorreo(req, res);
});

/**
 * @swagger
 * /recuperar-contrasena-correo:
 *   post:
 *     summary: Enviar correo de recuperación de contraseña.
 *     description: |
 *       Permite enviar un correo electrónico al usuario con un enlace para recuperar su contraseña.
 *       
 *       El endpoint espera recibir un objeto JSON en el cuerpo de la solicitud con la siguiente propiedad:
 *       - correo: Dirección de correo electrónico del usuario para recuperar la contraseña.
 *       
 *       En caso de éxito, se enviará el correo electrónico con el enlace de recuperación y se enviará una respuesta con un código 200.
 *       
 *       Respuestas posibles:
 *       - 200: Correo para recuperar contraseña enviado exitosamente.
 *       - 404: Usuario no encontrado.
 *       - 500: Error al enviar el correo electrónico.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 description: Dirección de correo electrónico del usuario para recuperar la contraseña.
 *             required:
 *               - correo
 *     responses:
 *       200:
 *         description: Correo para recuperar contraseña enviado exitosamente.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error al enviar el correo electrónico.
 */
router.post("/recuperar-contrasena-correo", async (req, res) => {
    CorreoController.olvidoContrasena(req, res);
});



module.exports = router;