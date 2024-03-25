// Importamos las variables de entorno.
const { VITE_API_URL } = import.meta.env;

// Función que realiza una petición al servidor para obtener todas las entradas.
export const selectAllEntriesService = async (searchParams) => {
    // Obtenemos una respuesta.
    const res = await fetch(`${VITE_API_URL}/entries?${searchParams}`);

    // Obtenemos el body.
    const body = await res.json();

    // Si hay algún error lo lanzamos.
    if (body.status === 'error') {
        throw new Error(body.message);
    }

    // Retornamos la propiedad data dentro de la cuál estarán las entradas, la página siguiente y anterior
    // entre otras cosas.
    return body.data;
};

// Función que realiza una petición al servidor para obtener los datos de una entrada con un ID dado.
export const selectEntryByIdService = async (entryId) => {
    // Obtenemos una respuesta.
    const res = await fetch(`${VITE_API_URL}/entries/${entryId}`);

    // Obtenemos el body.
    const body = await res.json();

    // Si hay algún error lo lanzamos.
    if (body.status === 'error') {
        throw new Error(body.message);
    }

    // Retornamos los datos de la entrada.
    return body.data.entry;
};

// Función que realiza una petición al servidor para crear una nueva entrada.
export const insertEntryService = async ({
    title,
    place,
    description,
    photos,
    authToken,
}) => {
    // Creamos un FormData.
    const formData = new FormData();

    // Pusheamos las propiedades necesarias al form data.
    formData.append('title', title);
    formData.append('place', place);
    formData.append('description', description);

    // Recorremos el array de fotos y las pusheamos.
    for (let i = 0; i < photos.length; i++) {
        formData.append(`photo${i + 1}`, photos[i]);
    }

    // Obtenemos una respuesta.
    const res = await fetch(`${VITE_API_URL}/entries`, {
        method: 'post',
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

    // Retornamos el mensaje de éxito.
    return body.message;
};

// Función que realiza una petición al servidor para agregar una foto a una entrada existente.
export const insertEntryPhotoService = async (photo, entryId, authToken) => {
    // Creamos el FormData.
    const formData = new FormData();

    // Agregamos la foto.
    formData.append('photo', photo);

    // Obtenemos una respuesta.
    const res = await fetch(`${VITE_API_URL}/entries/${entryId}/photos`, {
        method: 'post',
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

    // Retornamos los datos de la nueva foto y el mensaje.
    return {
        message: body.message,
        newPhoto: body.data.photo,
    };
};

// Función que realiza una petición al servidor para borrar una foto de una entrada.
export const deleteEntryPhotoService = async (entryId, photoId, authToken) => {
    // Obtenemos una respuesta.
    const res = await fetch(
        `${VITE_API_URL}/entries/${entryId}/photos/${photoId}`,
        {
            method: 'delete',
            headers: {
                Authorization: authToken,
            },
        }
    );

    // Obtenemos el body.
    const body = await res.json();

    // Si hay algún error lo lanzamos.
    if (body.status === 'error') {
        throw new Error(body.message);
    }
};

// Función que realiza una petición al servidor para votar una entrada.
export const insertEntryVoteService = async (value, entryId, authToken) => {
    // Obtenemos una respuesta.
    const res = await fetch(`${VITE_API_URL}/entries/${entryId}/votes`, {
        method: 'post',
        headers: {
            Authorization: authToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            value: Number(value),
        }),
    });

    // Obtenemos el body.
    const body = await res.json();

    // Si hay algún error lo lanzamos.
    if (body.status === 'error') {
        throw new Error(body.message);
    }

    // Retornamos la nueva media de votos de la entrada.
    return body.data.entry.votes;
};
