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

router.post("/login", async (req, res) => {
    UsuarioController.comprobarLogin(req, res);
  });

router.post("/registrar", async (req, res) => {
    UsuarioController.registrarUsuario(req, res);
  });

router.get("/usuario/:id",[md_autenticado.asegurarAutorizacion], async (req, res) => {
  UsuarioController.buscarUsuario(req,res);
});

router.get("/autorizado",[md_autenticado.asegurarAutorizacion], async (req, res) => {
  res.json({ ok: true, mensaje: 'Autorizado'});
});

router.post("/imagenPerfil/:id",[md_autenticado.asegurarAutorizacion, upload.single('imagenPerfil')], (req, res) => {
  const nombreImagen = req.file.filename;
  UsuarioController.subirImagenPerfil(req, res, nombreImagen); 
});

router.get('/imagenPerfil/:nombreImagen', [md_autenticado.asegurarAutorizacion], async (req, res) => {
  const nombreImagen = req.params.nombreImagen;
  const rutaImagen = path.join(__dirname, '../assets/imagenPerfil/', nombreImagen);
  res.sendFile(rutaImagen);
});

router.put("/actualizarPerfil",[md_autenticado.asegurarAutorizacion], async (req, res) => {
  UsuarioController.actualizarPerfil(req,res);
});

router.get("/usuarios",[md_autenticado.asegurarAutorizacion], async (req, res) => {
  UsuarioController.obtenerUsuarios(req,res);
});

module.exports = router;