// Importamos las dependencias.
import jwt from 'jsonwebtoken';

// Importamos las variables de entorno.
import { SECRET } from '../../env.js';

// Importamos los errores.
import { invalidTokenError } from '../services/errorService.js';

// Función controladora intermedia que desencripta el token y crea la propiedad "req.user".
// NO lanza error si falta el token.
const authUserOptionalController = async (req, res, next) => {
    try {
        // Obtenemos el token.
        const { authorization } = req.headers;

        // Si hay token lo desencriptamos.
        if (authorization) {
            // Variable que almacenará la info del token.
            let tokenInfo;

            try {
                // Desencriptamos el token.
                tokenInfo = jwt.verify(authorization, SECRET);

                // Si hemos llegado hasta aquí quiere decir que el token ya se ha desencriptado.
                // Creamos la propiedad "user" en el objeto "request" (es una propiedad inventada).
                req.user = tokenInfo;
            } catch (err) {
                console.error(err);

                // Si salta un error en el bloque try probablemente este en inglés. Para no mezclar idiomas
                // a la hora de enviar info al cliente vamos a personalizar nuestro propio error en español.
                invalidTokenError();
            }
        }

        // Pasamos el control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    }
};

export default authUserOptionalController;
