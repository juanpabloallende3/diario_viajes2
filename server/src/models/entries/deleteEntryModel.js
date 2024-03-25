// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que realiza una consulta a la base de datos para eliminar una entrada.
const deleteEntryModel = async (entryId) => {
    const pool = await getPool();

    // Eliminamos los votos vinculados a la entrada.
    await pool.query(`DELETE FROM entryVotes WHERE entryId = ?`, [entryId]);

    // Después de borrar los votos podemos proceder a borrar la entrada.
    await pool.query(`DELETE FROM entries WHERE id = ?`, [entryId]);
};

export default deleteEntryModel;
