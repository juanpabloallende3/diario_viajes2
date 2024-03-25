// Importamos los hooks.
import { useState, useEffect } from 'react';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Importamos los servicios.
import { selectEntryByIdService } from '../services/entryService';

// Inicializamos el hook.
const useEntry = (entryId) => {
    // Declaramos una variable en el State para almacenar la entrada.
    const [entry, setEntry] = useState(null);

    // Utilizamos un useEffect para buscar la entrada cuando se monta un componente.
    useEffect(() => {
        // Función que busca las entradas.
        const fetchEntry = async () => {
            try {
                // Obtenemos la entrada.
                const entry = await selectEntryByIdService(entryId);

                // Actualizamos las entradas en el State.
                setEntry(entry);
            } catch (err) {
                toast.error(err.message);
            }
        };

        // Llamamos a la función anterior.
        fetchEntry();
    }, [entryId]);

    // Función que actualiza la entrada en el State para agregar la nueva foto.
    const addEntryPhoto = (newPhoto) => {
        // Creamos un nuevo array de fotos donde figuren las fotos que ya existan, más las nueva foto.
        const updatedPhotos = [...entry.photos, newPhoto];

        // Actualizamos la entrada en el State.
        setEntry({
            ...entry,
            photos: updatedPhotos,
        });
    };

    // Función que actualiza la entrada en el State para eliminar una foto.
    const deleteEntryPhoto = (photoId) => {
        // Creamos un nuevo array de fotos donde filtraremos las fotos cuyo ID no coincida con la
        // foto que queremos eliminar. De esta forma solo quedarán las fotos que NO queremos eliminar.
        const updatedPhotos = entry.photos.filter(
            (photo) => photo.id !== photoId
        );

        // Actualizamos la entrada en el State.
        setEntry({
            ...entry,
            photos: updatedPhotos,
        });
    };

    // Función que actualiza la media de votos de la entrada en el State.
    const addEntryVote = (votesAvg) => {
        // Actualizamos la entrada.
        setEntry({
            ...entry,
            votes: votesAvg,
        });
    };

    // Retornamos los valores deseados.
    return { entry, addEntryPhoto, deleteEntryPhoto, addEntryVote };
};

export default useEntry;
