const fs = require('fs').promises;
const { getTransporter } = require("../services/mail");
const jwt = require("../services/jwt.js");
const {Usuario} = require("../model/Asociaciones.model");
const bcryptjs = require("bcryptjs");

async function enviarCorreo(req, res) {
    try {
        const destinatario = req.body.destinatario;
        const asunto = req.body.asunto;
        const cuerpo = req.body.cuerpo;
        /* const destinatario = "dev.jorgebazaga@gmail.com";
        const asunto = "prueba node expenses";
        const cuerpo = "prueba node expenses"; */
        const archivosAdjuntos = req.files || [];

        const transporter = await getTransporter();

        const jsonData = await fs.readFile('mail.config.json');
        const config = JSON.parse(jsonData);

        const mailOptions = {
            from: config.from,
            to: destinatario,
            subject: asunto,
            html: `<p>${cuerpo}</p>`,
            attachments: archivosAdjuntos.map(file => ({
                filename: file.originalname,
                content: file.buffer // Usar el contenido del archivo en lugar de la ruta
            }))
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);

        res.json({
            ok: true,
            message: 'Email sent successfully',
        });
    } catch (error) {
        console.error('Error sending email', error);
        res.status(500).json({
            ok: false,
            message: 'Error sending email',
        });
    }

    enviarCorreo(req,res)
}

async function olvidoContrasena(req, res) {
    const { correo } = req.body;

    const usuario = await Usuario.findOne({ where: { Correo: correo } });

    const environmentData = await fs.readFile('environments/environment.json', 'utf8');
    const environment = JSON.parse(environmentData);
    console.log("Environment: ", environment.urlAngular);

    if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      
    const token = jwt.generarToken(usuario, '1h');
    
    
    const transporter = await getTransporter();

        const jsonData = await fs.readFile('mail.config.json');
        const config = JSON.parse(jsonData);

        const mailOptions = {
            from: config.from,
            to: usuario.Correo,
            subject: 'Recuperación de contraseña',
            html: `<p>Para resetear tu contraseña, por favor haz clic en el siguiente enlace: 
                    <a href="${environment.urlAngular}cambiar-contrasena/${token}">Resetear contraseña</a></p>`,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Correo para recuperar contraseña enviado' });
          } catch (error) {
            res.status(500).json({ message: 'Error al enviar el correo' });
          }
}


module.exports = {
    enviarCorreo, 
    olvidoContrasena
};