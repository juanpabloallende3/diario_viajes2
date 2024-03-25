// Importamos las dependencias.
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Importamos los modelos.
import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';

// Importamos la función que valida esquemas.
import validateSchema from '../../utilities/validateSchema.js';

// Importamos el esquema de Joi.
import loginUserSchema from '../../schemas/users/loginUserSchema.js';

// Importamos los errores.
import {
    invalidCredentialsError,
    pendingActivationError,
} from '../../services/errorService.js';

// Importamos las variables de entorno.
import { SECRET } from '../../../env.js';

// Función controladora final que logea a un usuario retornando un token.
const loginUserController = async (req, res, next) => {
    try {
        // Validamos los datos con Joi.
        await validateSchema(loginUserSchema, req.body);

        const { email, password } = req.body;

        // Seleccionamos los datos del usuario.
        const user = await selectUserByEmailModel(email);

        // Variable que almacenará un valor booleano indicando si la contraseña es correcto o no.
        let validPass;

        // Si existe un usuario comprobamos si la contraseña coincide.
        if (user) {
            // Comprobamos si la contraseña que nos llega del cliente coincide con la del usuario seleccionado.
            validPass = await bcrypt.compare(password, user.password);
        }

        // Si no existe usuario o si las contraseñas no coinciden lanzamos un error.
        if (!user || !validPass) {
            invalidCredentialsError();
        }

        // Si el usuario no está activo lanzamos un error.
        if (!user.active) {
            pendingActivationError();
        }

        // Creamos un objeto con la info que queremos meter en el token.
        const tokenInfo = {
            id: user.id,
            role: user.role,
        };

        // Creamos el token.
        const token = jwt.sign(tokenInfo, SECRET, {
            expiresIn: '7d',
        });

        res.status(201).send({
            status: 'ok',
            data: {
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default loginUserController;
