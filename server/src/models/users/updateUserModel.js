// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos los errores.
import {
    userAlreadyRegisteredError,
    emailAlreadyRegisteredError,
} from '../../services/errorService.js';

// Función que realiza una consulta a la base de datos para actualizar el nombre de usuario y/o el email.
const updateUserModel = async (username, email, userId) => {
    const pool = await getPool();

    // Si el usuario ha enviado un nuevo nombre de usuario lo actualizamos.
    if (username) {
        // Buscamos en la base de datos algún usuario con ese nombre.
        const [users] = await pool.query(
            `SELECT id FROM users WHERE username = ?`,
            [username],
        );

        // Si existe algún usuario con ese nombre lanzamos un error.
        if (users.length > 0) {
            userAlreadyRegisteredError();
        }

        // Actualizamos el avatar del usuario.
        await pool.query(`UPDATE users SET username = ? WHERE id = ?`, [
            username,
            userId,
        ]);
    }

    // Si el usuario ha enviado un nuevo email  lo actualizamos.
    if (email) {
        // Buscamos en la base de datos algún usuario con ese email.
        const [users] = await pool.query(
            `SELECT id FROM users WHERE email = ?`,
            [email],
        );

        // Si existe algún usuario con ese email lanzamos un error.
        if (users.length > 0) {
            emailAlreadyRegisteredError();
        }

        // Actualizamos el avatar del usuario.
        await pool.query(`UPDATE users SET email = ? WHERE id = ?`, [
            email,
            userId,
        ]);
    }
};

export default updateUserModel;
