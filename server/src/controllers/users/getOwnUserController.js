// Importamos los modelos.
import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';

// Función controladora final que retorna los datos del usuario del token.
const getOwnUserController = async (req, res, next) => {
    try {
        // Necesitamos obtener el id del usuario que está encriptado en el token.
        // Eso lo haremos más adelante. Por el momento asignaremos un id manualmente.
        const userId = req.user.id;

        // Obtenemos los datos del usuario.
        const user = await selectUserByIdModel(userId);

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

export default getOwnUserController;
