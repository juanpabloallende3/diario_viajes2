// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que realiza una consulta a la base de datos retornar el listado de entradas.
const selectAllEntriesModel = async (
    author = '',
    place = '',
    keyword = '',
    userId = '',
    limit,
    offset,
) => {
    const pool = await getPool();

    // Obtenemos todas las entradas.
    const [entries] = await pool.query(
        `
            SELECT 
                e.id,
                e.title,
                e.place,
                e.userId,
                e.userId = ? as owner,
                u.username,
                AVG(IFNULL(v.value, 0)) AS votes,
                BIT_OR(v.userId = ?) AS votedByMe,
                e.createdAt
            FROM entries e
            INNER JOIN users u ON u.id = e.userId
            LEFT JOIN entryVotes v ON v.entryId = e.id
            WHERE u.username LIKE ? AND place LIKE ? AND e.description LIKE ?
            GROUP BY e.id
            ORDER BY e.createdAt DESC
            LIMIT ? OFFSET ?
        `,
        [
            userId,
            userId,
            `%${author}%`,
            `%${place}%`,
            `%${keyword}%`,
            limit,
            offset,
        ],
    );

    // Recorremos todas las entradas para añadir sus fotos.
    for (const entry of entries) {
        // Obtenemos un array con todas las fotos de la entrada.
        const [photos] = await pool.query(
            `SELECT id, name FROM entryPhotos WHERE entryId = ?`,
            [entry.id],
        );

        // Agregamos las fotos a la entrada actual.
        entry.photos = photos;

        // Cambiamos el tipo de la propiedad "votes" de String a Number.
        entry.votes = Number(entry.votes);

        // Cambiamos el tipo de la propiedad "owner" de Number a Boolean.
        entry.owner = Boolean(entry.owner);

        // Cambiamos el tipo de la propiedad "votedByMe" de Number a Boolean.
        entry.votedByMe = Boolean(entry.votedByMe);
    }

    return entries;
};

export default selectAllEntriesModel;
