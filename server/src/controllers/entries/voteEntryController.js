// Importamos los modelos.
import selectEntryByIdModel from '../../models/entries/selectEntryByIdModel.js';
import insertVoteModel from '../../models/entries/insertVoteModel.js';

// Importamos la función que valida esquemas.
import validateSchema from '../../utilities/validateSchema.js';

// Importamos el esquema de Joi.
import voteEntrySchema from '../../schemas/entries/voteEntrySchema.js';

// Importamos los errores.
import { cannotVoteOwnEntryError } from '../../services/errorService.js';

// Función controladora final que permite votar una entrada.
const voteEntryController = async (req, res, next) => {
    try {
        // Validamos los datos con Joi.
        await validateSchema(voteEntrySchema, req.body);

        // Obtenemos el id de la entrada que queremos votar.
        const { entryId } = req.params;

        // Obtenemos el valor del voto.
        const { value } = req.body;

        // Obtenemos la entrada.
        const entry = await selectEntryByIdModel(entryId);

        // Si somos los dueños de la entrada lanzamos un error.
        if (entry.userId === req.user.id) {
            cannotVoteOwnEntryError();
        }

        // Insertamos el voto y obtenemos la media de votos
        const votesAvg = await insertVoteModel(value, entryId, req.user.id);

        res.status(201).send({
            status: 'ok',
            message: 'Votación realizada',
            data: {
                entry: {
                    votes: votesAvg,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default voteEntryController;
