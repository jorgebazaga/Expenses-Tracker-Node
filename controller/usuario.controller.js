const {Usuario} = require("../model/Asociaciones.model");
const crypto = require('crypto');

async function comprobarLogin(req, res) {
    const { Correo, Contrasena } = req.body;
    console.log("Email:"+Correo+" Contraseña:"+Contrasena);
  
    try {
      const usuario = await Usuario.findOne({ where: { Correo: Correo } });
  
      if (usuario) {
        const ContrasenaHashed = crypto.createHash('md5').update(Contrasena).digest('hex');
  
        if (usuario.Contrasena === ContrasenaHashed){
          res.status(200).json({ ok: true, mensaje: 'Login correcto', data: usuario});
        } else {
          res.status(401).json({ ok: false, mensaje: 'Error de login usuario o contraseña incorrecto' });
        }
        
      } else {
        res.status(404).json({ ok: false, mensaje: 'Error de login usuario o contraseña incorrecto' });
      }
    } catch (error) {
      console.error('Error al comprobar el login del usuario:', error);
      res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' });
    }
  }

  module.exports = { comprobarLogin };