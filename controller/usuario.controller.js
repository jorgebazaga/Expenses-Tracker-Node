const bcryptjs = require("bcryptjs");
const {Usuario} = require("../model/Asociaciones.model");
const jwt = require('../services/jwt');

  async function comprobarLogin(req, res) {
    const { Correo, Contrasena } = req.body;
  
    try {
      const usuario = await Usuario.findOne({ where: { Correo: Correo } });
  
      if (usuario) {
        const contrasenaCorrecta = await bcryptjs.compare(Contrasena, usuario.Contrasena);
        if (contrasenaCorrecta) {
          const token = jwt.generarToken(usuario, "12h");
          res.status(200).json({ ok: true, mensaje: 'Login correcto', token, data:usuario });
        }else {
          res.status(401).json({ ok: false, mensaje: 'Error de login, usuario o contraseña incorrecto' });
        }
        
      } else {
        res.status(401).json({ ok: false, mensaje: 'Error de login, usuario o contraseña incorrecto' });
      }
    } catch (error) {
      console.error('Error al comprobar el login del usuario:', error);
      res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' });
    }
  }

  async function registrarUsuario (req, res){
    const {Nombre} = req.body;
    const {Correo} = req.body;
    let {Contrasena} = req.body;
    const {Objetivo} = req.body;

    try {
      const usuarioExistente = await Usuario.findOne({ where: { Correo: Correo } });
      if (usuarioExistente) {
        return res.status(409).json({ ok: false, mensaje: 'Ya existe un usuario registrado con ese correo' });
      }else{
        const salt = bcryptjs.genSaltSync(10); 
        Contrasena = await bcryptjs.hash(Contrasena, salt); 
        const usuario = new Usuario({
          Nombre: Nombre,
          Correo: Correo,
          Objetivo_Gasto: Objetivo,
          Contrasena: Contrasena,
        });
        const usuarioCreado = await usuario.save();
        res.status(201).json({ ok: true, mensaje: 'Usuario creado', data: usuarioCreado });
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' });
    }
  }

  function protegido(req, res){
    res.status(200).json({ok:true, mensaje: 'Ruta protegida'});
  }

  module.exports = { comprobarLogin , registrarUsuario, protegido};