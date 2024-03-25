// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que realiza una consulta a la base de datos para crear una entrada.
const insertEntryModel = async (title, place, description, userId) => {
    const pool = await getPool();

    // Insertamos la entrada.
    const [entry] = await pool.query(
        `INSERT INTO entries (title, place, description, userId) VALUES (?, ?, ?, ?)`,
        [title, place, description, userId],
    );

    // Retornamos el ID que la base de datos ha asignado a la entrada.
    return entry.insertId;
};

export default insertEntryModel;
