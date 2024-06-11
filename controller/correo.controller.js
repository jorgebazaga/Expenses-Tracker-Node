const fs = require('fs').promises;
const { getTransporter } = require("../services/mail");

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

module.exports = {
    enviarCorreo, 
};