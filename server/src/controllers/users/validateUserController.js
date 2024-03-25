// Importamos los modelos.
import updateActiveUserModel from '../../models/users/updateActiveUserModel.js';

// Función controladora final que valida a un usuario recién registrado.
const validateUserController = async (req, res, next) => {
    try {
        // Obtenemos el código de registro.
        const { registrationCode } = req.params;

        // Activamos el usuario.
        await updateActiveUserModel(registrationCode);

        res.send({
            status: 'ok',
            message: 'Usuario activado',
        });
    } catch (err) {
        next(err);
    }
};

export default validateUserController;
