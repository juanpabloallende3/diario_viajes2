// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que realiza una consulta a la base de datos retornar el número total de entradas.
const selectTotalNumberOfEntriesModel = async () => {
    const pool = await getPool();

    // Obtenemos todas las entradas.
    const [entries] = await pool.query(
        `SELECT COUNT(id) AS totalEntries FROM entries`,
    );

    // Retornamos el número total de entradas.
    return entries[0].totalEntries;
};

export default selectTotalNumberOfEntriesModel;
