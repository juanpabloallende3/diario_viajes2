// Importamos los modelos.
import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';
import updateUserAvatarModel from '../../models/users/updateUserAvatarModel.js';

// Importamos los servicios.
import { deletePhoto, savePhoto } from '../../services/photoService.js';

// Importamos la función que valida esquemas.
import validateSchema from '../../utilities/validateSchema.js';

// Importamos el esquema de Joi.
import editUserAvatarSchema from '../../schemas/users/editUserAvatarSchema.js';

// Función controladora final que permite cambiar el avatar de un usuario.
const editUserAvatarController = async (req, res, next) => {
    try {
        // Validamos los datos con Joi. Si "files" no existe enviamos un objeto vacío de lo contrario
        // se generaría un error.
        await validateSchema(editUserAvatarSchema, req.files || {});

        // Obtenemos los datos del usuario.
        const user = await selectUserByIdModel(req.user.id);

        // Comprobamos si el usuario tiene un avatar previo. De ser así lo eliminamos.
        if (user.avatar) {
            await deletePhoto(user.avatar);
        }

        // Guardamos el nuevo avatar en la carpeta de subida de archivos. Especificamos
        // en el segundo argumento un ancho de 150px para la redimensión.
        const avatarName = await savePhoto(req.files.avatar, 150);

        // Guardamos el nombre del avatar en la base de datos.
        await updateUserAvatarModel(avatarName, req.user.id);

        // Enviamos una respuesta al cliente.
        res.send({
            status: 'ok',
            message: 'Avatar actualizado',
            data: {
                avatar: {
                    name: avatarName,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default editUserAvatarController;
