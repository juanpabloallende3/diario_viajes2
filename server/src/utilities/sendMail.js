// Importamos las dependencias.
import nodemailer from 'nodemailer';

// Importamos las variables de entorno.
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } from '../../env.js';

// Importamos los errores.
import { sendEmailError } from '../services/errorService.js';

// Creamos un transporte (una conexión) para poder enviar emails con nodemailer.
const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
});

// Función que envía un email al usuario.
const sendMail = async (email, subject, body) => {
    try {
        // Creamos un objeto con la configuración del email.
        const mailOptions = {
            from: SMTP_USER,
            to: email,
            subject,
            text: body,
        };

        // Enviamos el email.
        await transport.sendMail(mailOptions);
    } catch (err) {
        console.error(err);
        sendEmailError();
    }
};

export default sendMail;
