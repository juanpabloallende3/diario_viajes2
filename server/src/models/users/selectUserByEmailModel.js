// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que realiza una consulta a la base de datos para seleccionar un usuario con un email dado.
const selectUserByEmailModel = async (email) => {
    const pool = await getPool();

    // Comprobamos si hay algún usuario con el email proporcionado.
    const [users] = await pool.query(
        `SELECT id, password, role, active FROM users WHERE email = ?`,
        [email],
    );

    // Por motivos de seguridad trataremos de no darle ninguna pista al usuario que está
    // tratando de logearse así que no indicaremos si lo que está mal es el email o es la
    // contraseña.

    // El array de usuarios solo podrá contener un único usuario dado que el email
    // no puede repetirse. Retornamos al usuario que se encuentra en la posición 0,
    // es decir, retornamos el objeto en lugar de retornar un array con un elemento.
    // En caso de que no se haya encontrado a ningún usuario retornaremos undefined.
    return users[0];
};

export default selectUserByEmailModel;
