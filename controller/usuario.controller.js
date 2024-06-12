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

  async function actualizarPerfil(req, res) {
    const usuarioActualizado = req.body;

    try {
        // Buscar el usuario por su ID
        const usuarioExistente = await Usuario.findByPk(usuarioActualizado.ID_Usuario);

        if (!usuarioExistente) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // Actualizar los campos del usuario
        usuarioExistente.Nombre = usuarioActualizado.Nombre;
        usuarioExistente.Objetivo_Gasto = usuarioActualizado.Objetivo_Gasto;
        usuarioExistente.Correo = usuarioActualizado.Correo;

        // Guardar el usuario actualizado en la base de datos
        const usuarioGuardado = await usuarioExistente.save();

        res.status(200).json({ mensaje: 'Usuario actualizado correctamente', usuario: usuarioGuardado });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
}

async function obtenerUsuarios(req, res) {
  try {
      const usuarios = await Usuario.findAll();

      res.status(200).json({ mensaje: 'Usuarios obtenidos correctamente', usuarios });
  } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}

async function editarUsuario(req, res) {
  const usuarioActualizado = req.body;
  const { id } = req.params;

  try {
      // Buscar el usuario por su ID
      const usuarioExistente = await Usuario.findByPk(id);

      if (!usuarioExistente) {
          return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }

      // Actualizar los campos del usuario
      usuarioExistente.Nombre = usuarioActualizado.Nombre;
      usuarioExistente.Objetivo_Gasto = usuarioActualizado.Objetivo;
      usuarioExistente.Correo = usuarioActualizado.Correo;
      usuarioExistente.ID_Usuario = usuarioActualizado.ID_Usuario; 

      const usuarioGuardado = await usuarioExistente.save();

      res.status(200).json({ mensaje: 'Usuario actualizado correctamente', usuario: usuarioGuardado });
  }catch (error) {
      console.error('Error al actualizar el usuario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}

async function borrarUsuario(req, res) {
  const { id } = req.params;

  try {
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
          return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }

      await usuario.destroy();

      res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
      console.error('Error al borrar el usuario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}

async function cambiarContrasena(req, res) {
  const { token, contrasena } = req.body;

  try {
    const decoded = jwt.decodificarToken(token);
    const usuario = await Usuario.findByPk(decoded.ID_Usuario);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const salt = bcryptjs.genSaltSync(10); 
    usuario.Contrasena = await bcryptjs.hash(contrasena, salt);
    console.log(usuario)
    await usuario.save();

    res.status(200).json({ mensaje: 'Contraseña cambiada' });
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Token invalido' });

  }
}
  
  function protegido(req, res){
    res.status(200).json({ok:true, mensaje: 'Ruta protegida'});
    
  }

  module.exports = { comprobarLogin , registrarUsuario, protegido, buscarUsuario,subirImagenPerfil,actualizarPerfil,obtenerUsuarios,editarUsuario,borrarUsuario,cambiarContrasena};