// Importamos las prop-types.
import PropType from 'prop-types';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Importamos los servicios.
import { deleteEntryPhotoService } from '../../services/entryService';

// Importamos las variables de entorno.
const { VITE_API_URL } = import.meta.env;

// Importamos los estilos.
import './EntryDetailsGallery.css';

// Inicializamos el componente.
const EntryDetailsGallery = ({
    place,
    photos,
    entryId,
    userId,
    authUser,
    authToken,
    deleteEntryPhoto,
}) => {
    // Función que se encarga de eliminar una foto cuando se clicka en el botón.
    const handleDeletePhoto = async (photoId) => {
        try {
            // Le preguntamos al usuario si quiere eliminar la foto.
            if (confirm('¿Deseas eliminar la foto?')) {
                // Borramos la foto en el servidor.
                await deleteEntryPhotoService(entryId, photoId, authToken);

                // Borramos la foto en el State.
                deleteEntryPhoto(photoId);
            }
        } catch (err) {
            toast(err.message);
        }
    };

    return (
        <div className='gallery'>
            {photos.length > 0 ? (
                photos.map((photo) => {
                    return (
                        <div className='img-container' key={photo.id}>
                            <img
                                src={`${VITE_API_URL}/${photo.name}`}
                                alt={`Foto de ${place}`}
                            />

                            {/* Si somos los dueños de la entrada... */}
                            {authUser?.id === userId && (
                                <div
                                    className='delete-icon'
                                    onClick={() => handleDeletePhoto(photo.id)}>
                                    <img
                                        src='/delete.svg'
                                        alt='Icono de eliminar foto'
                                    />
                                </div>
                            )}
                        </div>
                    );
                })
            ) : (
                <div className='img-container'>
                    <img
                        src='/default-entry-img.png'
                        alt={`Foto de ${place}`}
                    />
                </div>
            )}
        </div>
    );
};

// Validamos las props.
EntryDetailsGallery.propTypes = {
    place: PropType.string.isRequired,
    photos: PropType.array.isRequired,
    entryId: PropType.number.isRequired,
    userId: PropType.number.isRequired,
    authUser: PropType.object,
    authToken: PropType.string.isRequired,
    deleteEntryPhoto: PropType.func.isRequired,
};

export default EntryDetailsGallery;
