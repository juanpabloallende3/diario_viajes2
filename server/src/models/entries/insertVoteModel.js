// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos los errores.
import { voteAlreadyExistsError } from '../../services/errorService.js';

// Función que realiza una consulta a la base de datos votar una entrada.
const insertVoteModel = async (value, entryId, userId) => {
    const pool = await getPool();

    // Comprobamos si ya existe un voto previo por parte del usuario que está intentando
    // votar.
    const [votes] = await pool.query(
        `SELECT id FROM entryVotes WHERE entryId = ? AND userId = ?`,
        [entryId, userId],
    );

    // Si el usuario ya ha votado la entrada lanzamos un error.
    if (votes.length > 0) {
        voteAlreadyExistsError();
    }

    // Insertamos el voto.
    await pool.query(
        `INSERT INTO entryVotes (value, entryId, userId) VALUES (?, ?, ?)`,
        [value, entryId, userId],
    );

    // Obtenemos la media de votos.
    const [votesAvg] = await pool.query(
        `SELECT AVG(value) AS avg FROM entryVotes WHERE entryId = ?`,
        [entryId],
    );

    // Retornamos la media de votos.
    return Number(votesAvg[0].avg);
};

export default insertVoteModel;
