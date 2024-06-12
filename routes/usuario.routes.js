const router = require('express').Router();
const UsuarioController = require('../controller/usuario.controller');
const md_autenticado = require('../middleware/autenticado');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,  'assets/imagenPerfil'); // Resuelve la ruta relativa usando __dirname
  },
  filename: function (req, file, cb) {
    const fecha = Date.now();
    cb(null, fecha + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });


/**
 * @swagger
 * /usuario/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     description: Inicia sesión de usuario utilizando correo electrónico y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Correo:
 *                 type: string
 *               Contrasena:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 mensaje:
 *                   type: string
 *                   example: Login correcto
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 data:
 *                   type: object
 *                   properties:
 *                    _data:
 *                       type: object
 *                       properties:
 *                         ID_Usuario:
 *                           type: integer
 *                           example: 1
 *                         Nombre:
 *                           type: string
 *                           example: Usuario Ejemplo
 *                         Correo:
 *                           type: string
 *                           example: usuario@example.com
 *                         Objetivo_Gasto:
 *                           type: integer
 *                           example: 500
 *                         ImagenPerfil:
 *                           type: string
 *                           example: /assets/imagenPerfil/usuario.png
 *                         Administrador:
 *                           type: boolean
 *                           example: false
 *       401:
 *         description: Credenciales incorrectas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 mensaje:
 *                   type: string
 *                   example: Error de login, usuario o contraseña incorrecto
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
 *                 mensaje:
 *                   type: string
 *                   example: Error interno del servidor
 */
router.post("/login", async (req, res) => {
    UsuarioController.comprobarLogin(req, res);
  });

/**
 * @swagger
 * /usuario/registrar:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Permite registrar un nuevo usuario en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nombre:
 *                 type: string
 *               Correo:
 *                 type: string
 *               Contrasena:
 *                 type: string
 *               Objetivo:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 mensaje:
 *                   type: string
 *                   example: Usuario creado
 *                 data:
 *                   type: object
 *                   properties:
 *                     ID_Usuario:
 *                       type: integer
 *                       example: 1
 *                     Nombre:
 *                       type: string
 *                       example: Usuario Ejemplo
 *                     Correo:
 *                       type: string
 *                       example: usuario@example.com
 *                     Objetivo_Gasto:
 *                       type: integer
 *                       example: 500
 *                     ImagenPerfil:
 *                       type: string
 *                       example: /assets/imagenPerfil/usuario.png
 *                     Administrador:
 *                       type: boolean
 *                       example: false
 *       409:
 *         description: Ya existe un usuario registrado con ese correo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 mensaje:
 *                   type: string
 *                   example: Ya existe un usuario registrado con ese correo
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
 *                 mensaje:
 *                   type: string
 *                   example: Error interno del servidor
 */


router.post("/registrar", async (req, res) => {
    UsuarioController.registrarUsuario(req, res);
  });

/**
 * @swagger
 * /usuario/{id}:
 *   get:
 *     summary: Obtener información de un usuario por su ID
 *     description: Permite obtener información detallada de un usuario por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del usuario a obtener.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Información del usuario obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     ID_Usuario:
 *                       type: integer
 *                       example: 1
 *                     Nombre:
 *                       type: string
 *                       example: Usuario Ejemplo
 *                     Correo:
 *                       type: string
 *                       example: usuario@example.com
 *                     Objetivo_Gasto:
 *                       type: integer
 *                       example: 500
 *                     ImagenPerfil:
 *                       type: string
 *                       example: /assets/imagenPerfil/usuario.png
 *                     Administrador:
 *                       type: boolean
 *                       example: false
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
 *                 mensaje:
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
 *                 mensaje:
 *                   type: string
 *                   example: Error interno del servidor
 */

router.get("/usuario/:id",[md_autenticado.asegurarAutorizacion], async (req, res) => {
  UsuarioController.buscarUsuario(req,res);
});

router.get("/autorizado",[md_autenticado.asegurarAutorizacion], async (req, res) => {
  res.json({ ok: true, mensaje: 'Autorizado'});
});

/**
 * @swagger
 * /usuario/imagenPerfil/{id}:
 *   post:
 *     summary: Subir imagen de perfil de usuario
 *     description: Permite subir una imagen de perfil para un usuario específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del usuario
 *         required: true
 *         schema:
 *           type: string
 *       - in: formData
 *         name: imagenPerfil
 *         description: Imagen de perfil a subir
 *         required: true
 *         type: file
 *     responses:
 *       200:
 *         description: Imagen de perfil actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Imagen de perfil actualizada correctamente
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60f61f56aa004a001c1861f0
 *                     Nombre:
 *                       type: string
 *                       example: Usuario Ejemplo
 *                     Correo:
 *                       type: string
 *                       example: usuario@example.com
 *                     Objetivo_Gasto:
 *                       type: integer
 *                       example: 500
 *                     ImagenPerfil:
 *                       type: string
 *                       example: /assets/imagenPerfil/usuario.png
 *                     Administrador:
 *                       type: boolean
 *                       example: false
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 mensaje:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 mensaje:
 *                   type: string
 *                   example: Error interno del servidor
 */
router.post("/imagenPerfil/:id",[md_autenticado.asegurarAutorizacion, upload.single('imagenPerfil')], (req, res) => {
  const nombreImagen = req.file.filename;
  UsuarioController.subirImagenPerfil(req, res, nombreImagen); 
});

/**
 * @swagger
 * /imagenPerfil/{nombreImagen}:
 *   get:
 *     summary: Obtener imagen de perfil
 *     description: Obtiene la imagen de perfil de un usuario.
 *     parameters:
 *       - in: path
 *         name: nombreImagen
 *         description: Nombre de la imagen de perfil.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Imagen de perfil obtenida exitosamente.
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: Imagen de perfil no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/imagenPerfil/:nombreImagen', [md_autenticado.asegurarAutorizacion], async (req, res) => {
  const nombreImagen = req.params.nombreImagen;
  const rutaImagen = path.join(__dirname, '../assets/imagenPerfil/', nombreImagen);
  res.sendFile(rutaImagen);
});

/**
 * @swagger
 * /usuario/actualizarPerfil:
 *   put:
 *     summary: Actualizar perfil de usuario
 *     description: Permite actualizar el perfil de un usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID_Usuario:
 *                 type: integer
 *                 example: 1
 *               Nombre:
 *                 type: string
 *                 example: Usuario Ejemplo
 *               Correo:
 *                 type: string
 *                 example: usuario@example.com
 *               Objetivo_Gasto:
 *                 type: integer
 *                 example: 500
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Usuario actualizado correctamente
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: integer
 *                       example: 1
 *                     Nombre:
 *                       type: string
 *                       example: Usuario Ejemplo
 *                     Correo:
 *                       type: string
 *                       example: usuario@example.com
 *                     Objetivo_Gasto:
 *                       type: integer
 *                       example: 500
 *                     ImagenPerfil:
 *                       type: string
 *                       example: /assets/imagenPerfil/usuario.png
 *                     Administrador:
 *                       type: boolean
 *                       example: false
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error interno del servidor
 */
router.put("/actualizarPerfil",[md_autenticado.asegurarAutorizacion], async (req, res) => {
  UsuarioController.actualizarPerfil(req,res);
});

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Permite obtener todos los usuarios registrados en el sistema.
 *     responses:
 *       200:
 *         description: Usuarios obtenidos correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Usuarios obtenidos correctamente
 *                 usuarios:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: integer
 *                         example: 1
 *                       Nombre:
 *                         type: string
 *                         example: Usuario Ejemplo
 *                       Correo:
 *                         type: string
 *                         example: usuario@example.com
 *                       Objetivo_Gasto:
 *                         type: integer
 *                         example: 500
 *                       ImagenPerfil:
 *                         type: string
 *                         example: /assets/imagenPerfil/usuario.png
 *                       Administrador:
 *                         type: boolean
 *                         example: false
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error interno del servidor
 */
router.get("/usuarios",[md_autenticado.asegurarAutorizacion], async (req, res) => {
  UsuarioController.obtenerUsuarios(req,res);
});

/**
 * @swagger
 * /editarUsuario/{id}:
 *   put:
 *     summary: Editar un usuario existente
 *     description: Permite editar los detalles de un usuario existente en el sistema.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a editar
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
 *               Correo:
 *                 type: string
 *               Objetivo:
 *                 type: integer
 *               ID_Usuario:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Usuario actualizado correctamente
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     _data:
 *                       type: object
 *                       properties:
 *                         ID_Usuario:
 *                           type: integer
 *                           example: 1
 *                         Nombre:
 *                           type: string
 *                           example: Usuario Ejemplo
 *                         Correo:
 *                           type: string
 *                           example: usuario@example.com
 *                         Objetivo_Gasto:
 *                           type: integer
 *                           example: 500
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error interno del servidor
 */
router.put("/editarUsuario/:id",[md_autenticado.asegurarAutorizacion], async (req, res) => {
  UsuarioController.editarUsuario(req,res);
});

/**
 * @swagger
 * /usuario/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     description: Permite eliminar un usuario existente en el sistema.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error interno del servidor
 */
router.delete("/usuario/:id",[md_autenticado.asegurarAutorizacion], async (req, res) => {
  UsuarioController.borrarUsuario(req,res);
});


router.put("/cambiar-contrasena",[md_autenticado.asegurarAutorizacion], async (req, res) => {
  console.log("cambiar contraseña");
  UsuarioController.cambiarContrasena(req, res);
});


module.exports = router;