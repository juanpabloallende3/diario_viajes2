// Importamos los modelos.
import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';
import updateUserModel from '../../models/users/updateUserModel.js';

// Importamos la función que valida esquemas.
import validateSchema from '../../utilities/validateSchema.js';

// Importamos el esquema de Joi.
import editUserSchema from '../../schemas/users/editUserSchema.js';

// Función controladora final que permite cambiar el nombre de usuario y/o el email.
const editUserController = async (req, res, next) => {
    try {
        // Validamos los datos con Joi.
        await validateSchema(editUserSchema, req.body);

        // Obtenemos los datos del body.
        let { username, email } = req.body;

        // Obtenemos los datos del usuario.
        const user = await selectUserByIdModel(req.user.id);

        // Si los datos que nos llegan del cliente coinciden con los datos actuales del usuario,
        // vaciamos el contenido de la variable.
        username = username === user.username ? null : username;
        email = email === user.email ? null : email;

        // Actualizamos los datos del usuario.
        await updateUserModel(username, email, req.user.id);

        // Enviamos una respuesta al cliente.
        res.send({
            status: 'ok',
            message: 'Usuario actualizado',
            data: {
                user: {
                    username,
                    email,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default editUserController;
