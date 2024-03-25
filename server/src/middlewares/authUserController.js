// Importamos las dependencias.
import jwt from 'jsonwebtoken';

// Importamos las variables de entorno.
import { SECRET } from '../../env.js';

// Importamos los errores.
import {
    notAuthenticatedError,
    invalidTokenError,
} from '../services/errorService.js';

// Función controladora intermedia que desencripta el token y crea la propiedad "req.user".
// Si no hay token lanza un error.
const authUserController = async (req, res, next) => {
    try {
        // Siempre debemos enviar el token a través de la propiedad "Authorization" de los headers.
        // Aunque la propiedad "Authorization" se escriba con "A" mayúscula, en node la recibimos
        // con la "a" minúscula.
        const { authorization } = req.headers;

        // Si falta el token lanzamos un error.
        if (!authorization) {
            notAuthenticatedError();
        }

        // Variable que almacenará la info del token.
        let tokenInfo;

        try {
            // Desencriptamos el token.
            tokenInfo = jwt.verify(authorization, SECRET);

            // Si hemos llegado hasta aquí quiere decir que el token ya se ha desencriptado.
            // Creamos la propiedad "user" en el objeto "request" (es una propiedad inventada).
            req.user = tokenInfo;

            // Pasamos el control a la siguiente función controladora. Dado que todas las funciones
            // controladoras tienen acceso al objeto request, la siguiente función controladora tendrá
            // acceso a req.user.id (el id del token).
            next();
        } catch (err) {
            console.error(err);

            // Si salta un error en el bloque try probablemente este en inglés. Para no mezclar idiomas
            // a la hora de enviar info al cliente vamos a personalizar nuestro propio error en español.
            invalidTokenError();
        }
    } catch (err) {
        next(err);
    }
};

export default authUserController;
