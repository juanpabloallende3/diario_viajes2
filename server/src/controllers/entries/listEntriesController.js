// Importamos los modelos.
import selectAllEntriesModel from '../../models/entries/selectAllEntriesModel.js';
import selectTotalNumberOfEntriesModel from '../../models/entries/selectTotalNumberOfEntriesModel.js';

// Función controladora final que retorna el listado de entradas. Permite filtrar por autor
// y por palabra clave.
const listEntriesController = async (req, res, next) => {
    try {
        // Obtenemos los query params corespondientes.
        let { author, place, keyword, page = 1 } = req.query;

        // Modificamos el tipo de la variable page de String a Number.
        page = Number(page);

        // Calculamos el offset badado en la página actual (8 entradas por página).
        const limit = 4;
        const offset = (page - 1) * limit;

        // Obtenemos el número total de entradas.
        const totalEntries = await selectTotalNumberOfEntriesModel();

        // Calculamos el número total de páginas.
        const totalPages = Math.ceil(totalEntries / limit);

        // Obtenemos el listado de entradas. Es importante indicarle a JavaScript que la
        // propiedad "user" podría ser undefined.
        const entries = await selectAllEntriesModel(
            author,
            place,
            keyword,
            req.user?.id,
            limit,
            offset,
        );

        res.send({
            status: 'ok',
            data: {
                totalPages,
                // Si queremos ir a la página anterior será "page - 1" salvo si estamos ya en la página 0.
                prevPage: page > 1 ? page - 1 : null,
                currentPage: page,
                // Si queremos ir a la página siguiente será "page + 1" salvo si estamos ya en la última página.
                nextPage: page < totalPages ? page + 1 : null,
                entries,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default listEntriesController;
