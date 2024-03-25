// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que realiza una consulta a la base de datos para agregar una foto a una entrada.
const insertPhotoModel = async (photoName, entryId) => {
    const pool = await getPool();

    // Insertamos la foto.
    const [photo] = await pool.query(
        `INSERT INTO entryPhotos (name, entryId) VALUES (?, ?)`,
        [photoName, entryId],
    );

    // Retornamos el ID que la base de datos ha asignado a la foto.
    return photo.insertId;
};

export default insertPhotoModel;
