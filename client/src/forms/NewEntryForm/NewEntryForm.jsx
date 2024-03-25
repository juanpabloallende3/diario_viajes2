// Importamos las prop-types.
import PropType from 'prop-types';

// Importamos los hooks.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Importamos los componentes.
import Loading from '../../components/Loading/Loading';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Inicializamos el componente.
const NewEntryForm = ({ insertEntryService, authToken }) => {
    // Importamos la función "navigate".
    const navigate = useNavigate();

    // Declaramos una variable en el State por cada elemento del formulario.
    const [title, setTitle] = useState('');
    const [place, setPlace] = useState('');
    const [description, setDescription] = useState('');
    const [photos, setPhotos] = useState([]);

    // Declaramos una variable en el State que indique si estamos haciendo una petición al servidor.
    const [loading, setLoading] = useState(false);

    // Función que maneja el envío del formulario.
    const handleSubmit = async (e) => {
        try {
            // Prevenimos el comportamiento por defecto del formulario.
            e.preventDefault();

            // Establecemos loading a true para deshabilitar los botones.
            setLoading(true);

            // Creamos la entrada y obtenemos el mensaje.
            const message = await insertEntryService({
                title,
                place,
                description,
                photos,
                authToken,
            });

            // Mostramos un mensaje indicando que todo ha ido bien.
            toast.success(message);

            // Después de crear la entrada redirigimos al Home.
            navigate('/');
        } catch (err) {
            toast.error(err.message);
        } finally {
            // Volvemos a estableces loading al valor original.
            setLoading(false);
        }
    };

    // Función que maneja el evento onChange del input de tipo file.
    const handleFiles = (e) => {
        // Creamos un array con las fotos seleccionadas.
        const files = Array.from(e.target.files);

        // Si hay tres fotos las convertimos a un array y las establecemos con setPhotos.
        if (files.length < 4) {
            setPhotos(files);
        } else {
            // Indicamos que solo puedes seleccionar 3 fotos.
            toast.error('Solo puedes seleccionar un máximo de 3 archivos');

            // Limpiamos la selección de archivos.
            e.target.value = null;
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='title'>Título:</label>
            <input
                type='text'
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <label htmlFor='place'>Ubicación:</label>
            <input
                type='text'
                id='place'
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                required
            />

            <label htmlFor='description'>Descripción:</label>
            <textarea
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Cuéntanos cómo te ha ido el viaje...'
                required></textarea>

            <input
                type='file'
                onChange={handleFiles}
                accept='image/png, image/jpeg'
                multiple
            />

            {loading ? (
                <Loading />
            ) : (
                <button disabled={loading}>Crear entrada</button>
            )}
        </form>
    );
};

// Validamos las props.
NewEntryForm.propTypes = {
    insertEntryService: PropType.func.isRequired,
    authToken: PropType.string.isRequired,
};

export default NewEntryForm;
