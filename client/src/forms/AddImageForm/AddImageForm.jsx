// Importamos las prop-types.
import PropType from 'prop-types';

// Importamos los hooks.
import { useState } from 'react';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Importamos los estilos.
import './AddImageForm.css';

// Inicializamos el componente.
const AddImageForm = ({
    insertEntryPhotoService,
    addEntryPhoto,
    entryId,
    authToken,
}) => {
    // Declaramos una variable en el State por cada elemento del formulario.
    const [photo, setPhoto] = useState(null);

    // Función que maneja el envío del formulario.
    const handleSubmit = async (e) => {
        try {
            // Prevenimos el comportamiento por defecto del formulario.
            e.preventDefault();

            // Insertamos la foto y obtenemos sus datos y el mensaje.
            const { newPhoto, message } = await insertEntryPhotoService(
                photo,
                entryId,
                authToken
            );

            // Mostramos un mensaje indicando que todo ha ido bien.
            toast.success(message);

            // Actualizamos el State de la entrada con la nueva foto.
            addEntryPhoto(newPhoto);
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='file'
                onChange={(e) => setPhoto(e.target.files[0])}
                required
            />

            <button>Agregar</button>
        </form>
    );
};

// Validamos las props.
AddImageForm.propTypes = {
    insertEntryPhotoService: PropType.func.isRequired,
    addEntryPhoto: PropType.func.isRequired,
    entryId: PropType.number.isRequired,
    authToken: PropType.string.isRequired,
};

export default AddImageForm;
