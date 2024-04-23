const moment = require('moment');
const jwt = require('../services/jwt');

const CLAVE_SECRETA = "hd5Gjd93QAsdns7asGHsSsbdka3faO924";

function asegurarAutorizacion(req,res,next){
    if(!req.headers.authorization){
        return res.status(403).json({ok:false, mensaje: 'No se ha enviado el token de autorización'});
    }else{
      const token = req.headers.authorization.replace(/['"]+/g, '');

      const payload = jwt.decodificarToken(token, CLAVE_SECRETA);
      
      try{
        if(payload.exp <= moment().unix()){
          return res.status(400).json({ok:false, mensaje: 'El token ha expirado'});
        }else{
          req.usuario = payload;
          next();
        }
      }catch(error){
        return res.status(400).json({ok:false, mensaje: 'Token no válido'});
      }
    }
}

module.exports = {asegurarAutorizacion};