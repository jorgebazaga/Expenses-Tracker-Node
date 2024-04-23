const jwt = require('jsonwebtoken');

const CLAVE_SECRETA = "hd5Gjd93QAsdns7asGHsSsbdka3faO924";

function generarToken(usuario, fechaExpiracion){
    const {Id_Usuario,Correo} = usuario;
    const payload = {
        Id_Usuario,
        Correo
    }

    return jwt.sign(payload, CLAVE_SECRETA, {expiresIn: fechaExpiracion});
}

function decodificarToken(token){
    return jwt.decode(token, CLAVE_SECRETA);
}

module.exports = {generarToken, decodificarToken};