// Importamos las prop-types.
import PropType from 'prop-types';

// Importamos los servicios.
import { insertEntryPhotoService } from '../../services/entryService';

// Importamos los formularios.
import AddImageForm from '../../forms/AddImageForm/AddImageForm';

// Importamos los estilos.
import './EntryDetailsAddPhoto.css';

// Inicializamos el componente.
const EntryDetailsAddPhoto = ({
    userId,
    entryId,
    photos,
    addEntryPhoto,
    authToken,
    authUser,
}) => {
    return (
        <div className='add-photo'>
            {/* Si somos los dueños de la entrada... */}
            {authUser?.id === userId && (
                <>
                    {/* Si somos los dueños de la entrada y tenemos cero fotos... */}
                    {photos.length === 0 && (
                        <h3>
                            ¡No has agregado ninguna foto a esta entrada! ¿A qué
                            esperas?
                        </h3>
                    )}

                    {/* Si somos los dueños de la entrada y tenemos una foto... */}
                    {photos.length === 1 && (
                        <h3>¡Todavía puedes agregar dos fotos más!</h3>
                    )}

                    {/* Si somos los dueños de la entrada y tenemos dos fotos... */}
                    {photos.length === 2 && (
                        <h3>¡Todavía puedes agregar una fotos más!</h3>
                    )}

                    {/* Si hay menos de tres fotos mostramos el input. */}
                    {photos.length < 3 && (
                        <AddImageForm
                            insertEntryPhotoService={insertEntryPhotoService}
                            addEntryPhoto={addEntryPhoto}
                            entryId={entryId}
                            authToken={authToken}
                        />
                    )}
                </>
            )}
        </div>
    );
};

// Validamos las props.
EntryDetailsAddPhoto.propTypes = {
    entryId: PropType.number.isRequired,
    userId: PropType.number.isRequired,
    photos: PropType.array.isRequired,
    addEntryPhoto: PropType.func.isRequired,
    authToken: PropType.string.isRequired,
    authUser: PropType.object,
};

export default EntryDetailsAddPhoto;
