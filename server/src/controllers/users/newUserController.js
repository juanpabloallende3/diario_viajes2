// Importamos las dependencias.
import crypto from 'crypto';

// Importamos los modelos.
import insertUserModel from '../../models/users/insertUserModel.js';

// Importamos la función que envía emails.
import sendMail from '../../utilities/sendMail.js';

// Importamos la función que valida esquemas.
import validateSchema from '../../utilities/validateSchema.js';

// Importamos el esquema de Joi.
import newUserSchema from '../../schemas/users/newUserSchema.js';

// Importamos las variables de entorno.
import { CLIENT_URL } from '../../../env.js';

// Función controladora final que crea un nuevo usuario.
const newUserController = async (req, res, next) => {
    try {
        // Validamos los datos con Joi.
        await validateSchema(newUserSchema, req.body);

        // Obtenemos los datos del body.
        const { username, email, password } = req.body;

        // Creamos un código de registro.
        const registrationCode = crypto.randomBytes(15).toString('hex');

        // Insertamos el usuario.
        await insertUserModel(username, email, password, registrationCode);

        // Asunto del email de verificación.
        const emailSubject = 'Activa tu usuario en Diario de Viajes :)';

        // Cuerpo del email de verificación.
        const emailBody = `
            ¡Bienvenid@ ${username}!

            Gracias por registrarte en Diario de Viajes. Para activar tu cuenta, haz clic en el siguiente enlace:

            <a href="${CLIENT_URL}/users/validate/${registrationCode}">¡Activar mi cuenta!</a>
        `;

        // Enviamos el email de verificación al usuario.
        await sendMail(email, emailSubject, emailBody);

        res.status(201).send({
            status: 'ok',
            message:
                'Usuario creado. Por favor, verifica tu usuario mediante el email que has recibido en tu email',
        });
    } catch (err) {
        next(err);
    }
};

export default newUserController;
