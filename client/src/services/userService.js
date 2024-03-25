// Importamos las variables de entorno.
const { VITE_API_URL } = import.meta.env;

// Función que realiza una petición al servidor para registrar un usuario.
export const signUpService = async (username, email, password) => {
    // Obtenemos una respuesta.
    const res = await fetch(`${VITE_API_URL}/users/register`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });

    // Obtenemos el body.
    const body = await res.json();

    // Si hay algún error lo lanzamos.
    if (body.status === 'error') {
        throw new Error(body.message);
    }

    // Retornamos el mensagedel body que indica que todo ha ido bien.
    return body.message;
};

// Función que realiza una petición al servidor para loguear un usuario.
export const signInService = async (email, password) => {
    // Obtenemos una respuesta.
    const res = await fetch(`${VITE_API_URL}/users/login`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    // Obtenemos el body.
    const body = await res.json();

    // Si hay algún error lo lanzamos.
    if (body.status === 'error') {
        throw new Error(body.message);
    }

    // Retornamos el token.
    return body.data.token;
};

// Función que realiza una petición al servidor para activar un usuario.
export const activateUserService = async (registrationCode) => {
    // Obtenemos una respuesta.
    const res = await fetch(
        `${VITE_API_URL}/users/validate/${registrationCode}`,
        {
            method: 'put',
        }
    );

    // Obtenemos el body.
    const body = await res.json();

    // Si hay algún error lo lanzamos.
    if (body.status === 'error') {
        throw new Error(body.message);
    }
};

// Función que realiza una petición al servidor para obtener los datos del usuario del token.
export const getPrivateProfileService = async (authToken) => {
    // Obtenemos una respuesta.
    const res = await fetch(`${VITE_API_URL}/users`, {
        headers: {
            Authorization: authToken,
        },
    });

    // Obtenemos el body.
    const body = await res.json();

    // En este caso no tiene mucho sentido mostrar un error si el token no es correcto. Ninguna
    // página web nos informa de esto, por tanto, tampoco tiene sentido hacerlo aquí.

    // Retornamos los datos del usuario. Si el token es incorrecto la propiedad "data" no existirá,
    // por tanto, "user" tampoco. Para evitar que salte un error automático indicamos con la interrogación
    // que "data" podría ser undefined en algún momento.
    return body.data?.user;
};

// Función que realiza una petición al servidor para editar el nombre de usuario y/o el email.
export const updateUsernameAndEmailService = async (
    username,
    email,
    authToken
) => {
    // Obtenemos el response.
    const res = await fetch(`${VITE_API_URL}/users`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            Authorization: authToken,
        },
        body: JSON.stringify({
            username,
            email,
        }),
    });

    // Obtenemos el body.
    const body = await res.json();

    // Si hay algún error lo lanzamos.
    if (body.status === 'error') {
        throw new Error(body.message);
    }

    // Retornamos los datos del usuario actualizados y el mensaje.
    return {
        message: body.message,
        user: body.data.user,
    };
};

// Función que realiza una petición al servidor para editar el avatar del usuario.
export const updateAvatarService = async (avatar, authToken) => {
    // Creamos un objeto FormData para almacenar el archivo antes de enviarlo.
    const formData = new FormData();

    // Agregamos el avatar al formData.
    formData.append('avatar', avatar);

    // Obtenemos el response.
    const res = await fetch(`${VITE_API_URL}/users/avatar`, {
        method: 'put',
        headers: {
            Authorization: authToken,
        },
        body: formData,
    });

    // Obtenemos el body.
    const body = await res.json();

    // Si hay algún error lo lanzamos.
    if (body.status === 'error') {
        throw new Error(body.message);
    }

    // Retornamos el nuevo nombre que el servidor le ha dado al avatar y el mensaje.
    return {
        message: body.message,
        avatarName: body.data.avatar.name,
    };
};
