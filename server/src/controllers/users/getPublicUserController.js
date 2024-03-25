// Importamos los modelos.
import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';

// Función controladora final que retorna la info pública de un usuario.
const getPublicUserController = async (req, res, next) => {
    try {
        // Obtenemos el path param "userId".
        const { userId } = req.params;

        // Obtenemos los datos del usuario utilizando el id anterior.
        const user = await selectUserByIdModel(userId);

        // Eliminamos la propiedad "email".
        delete user.email;

        res.send({
            status: 'ok',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getPublicUserController;
