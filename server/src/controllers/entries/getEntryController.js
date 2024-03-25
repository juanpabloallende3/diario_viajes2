// Importamos los modelos.
import selectEntryByIdModel from '../../models/entries/selectEntryByIdModel.js';

// Función controladora final que retorna el listado de entradas.
const getEntryController = async (req, res, next) => {
    try {
        // Obtenemos el id de la entrada.
        const { entryId } = req.params;

        // Obtenemos la entrada. Es importante indicarle a JavaScript que la propiedad
        // "user" podría ser undefined.
        const entry = await selectEntryByIdModel(entryId, req.user?.id);

        res.send({
            status: 'ok',
            data: {
                entry,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getEntryController;
