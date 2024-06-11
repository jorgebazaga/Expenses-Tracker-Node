const fs = require('fs').promises;
const nodemailer = require('nodemailer');

let transporterInstance = null;

async function getTransporter() {
    if (!transporterInstance) {
        try {
            const jsonData = await fs.readFile('mail.config.json');
            const config = JSON.parse(jsonData);
            
            transporterInstance = nodemailer.createTransport(config);
            console.log("Conexión SMTP establecida correctamente.")
        } catch (error) {
            console.error('Error de Conexión SMTP', error);
            throw new Error('Error de Conexión SMTP');
        }
    }
    return transporterInstance;
}

module.exports = {
    getTransporter
};