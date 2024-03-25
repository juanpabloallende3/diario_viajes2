// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos las entradas.
import { notFoundError } from '../../services/errorService.js';

// Función que realiza una consulta a la base de datos retornar una entrada concreta.
const selectEntryByIdModel = async (entryId, userId = '') => {
    const pool = await getPool();

    // Intentamos localizar la entrada con el id recibido.
    const [entries] = await pool.query(
        `
            SELECT 
                e.id,
                e.title,
                e.place,
                e.description,
                e.userId,
                e.userId = ? AS owner,
                u.username,
                AVG(IFNULL(v.value, 0)) AS votes,
                BIT_OR(v.userId = ?) AS votedByMe,
                e.createdAt
            FROM entries e
            INNER JOIN users u ON u.id = e.userId
            LEFT JOIN entryVotes v ON v.entryId = e.id
            WHERE e.id = ?
        `,
        [userId, userId, entryId],
    );

    // Si no existe la entrada lanzamos un error.
    if (entries.length < 1 || entries[0].id === null) {
        notFoundError('entrada');
    }

    // Obtenemos un array con todas las fotos de la entrada.
    const [photos] = await pool.query(
        `SELECT id, name FROM entryPhotos WHERE entryId = ?`,
        [entryId],
    );

    // Agregamos las fotos a la entrada que está en la posición 0.
    entries[0].photos = photos;

    // Cambiamos el tipo de la propiedad "votes" de String a Number.
    entries[0].votes = Number(entries[0].votes);

    // Cambiamos el tipo de la propiedad "owner" de Number a Boolean.
    entries[0].owner = Boolean(entries[0].owner);

    // Cambiamos el tipo de la propiedad "votedByMe" de Number a Boolean.
    entries[0].votedByMe = Boolean(entries[0].votedByMe);

    // Retornamos la entrada de la posicón 0 con las fotos.
    return entries[0];
};

export default selectEntryByIdModel;
