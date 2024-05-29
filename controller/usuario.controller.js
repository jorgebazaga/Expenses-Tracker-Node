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

  async function buscarUsuario(req,res){
    const {id} = req.params;
    try {
      const usuario = await Usuario.findByPk(id);
      if (usuario) {
        res.status(200).json({ ok: true, data: usuario });
      } else {
        res.status(404).json({ ok: false, mensaje: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error('Error al buscar el usuario:', error);
      res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' });
    }
  }

  async function subirImagenPerfil(req, res, nombreImagen) {
    const { id } = req.params;
  
    try {
      // Encuentra el usuario por su ID
      const usuario = await Usuario.findByPk(id);
  
      if (!usuario) {
        // Si el usuario no existe, responde con un error
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Asigna la ruta de la imagen a la propiedad ImagenPerfil del usuario
      usuario.ImagenPerfil = nombreImagen;
  
      // Guarda los cambios en la base de datos
      await usuario.save();
  
      // Responde con éxito
      res.status(200).json({ message: 'Imagen de perfil actualizada correctamente', usuario });
    } catch (error) {
      // Maneja cualquier error que ocurra
      console.error('Error al subir la imagen de perfil:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
  
  function protegido(req, res){
    res.status(200).json({ok:true, mensaje: 'Ruta protegida'});
    
  }

  module.exports = { comprobarLogin , registrarUsuario, protegido, buscarUsuario,subirImagenPerfil};