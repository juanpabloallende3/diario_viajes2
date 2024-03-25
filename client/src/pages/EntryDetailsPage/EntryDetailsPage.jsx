// Importamos los hooks.
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import useEntry from '../../hooks/useEntry';

// Importamos los formularios.
import AddVoteForm from '../../forms/AddVoteForm/AddVoteForm';

// Importamos el contexto.
import { AuthContext } from '../../contexts/AuthContext';

// Importamos los servicios.
import { insertEntryVoteService } from '../../services/entryService';

// Importamos los componentes.
import EntryDetailsInfo from '../../components/EntryDetailsInfo/EntryDetailsInfo';
import EntryDetailsGallery from '../../components/EntryDetailsGallery/EntryDetailsGallery';
import EntryDetailsAddPhoto from '../../components/EntryDetailsAddPhoto/EntryDetailsAddPhoto';

// Inicializamos el componente.
const EntryDetailsPage = () => {
    // Obtenemos los datos del usuario y el token.
    const { authUser, authToken } = useContext(AuthContext);

    // Obtenemos el path param con el ID de la entrada.
    const { entryId } = useParams();

    // Importamos la entrada.
    const { entry, addEntryPhoto, deleteEntryPhoto, addEntryVote } =
        useEntry(entryId);

    return (
        <main>
            {entry && (
                <>
                    <h2>{entry.title}</h2>

                    <EntryDetailsInfo
                        place={entry.place}
                        description={entry.description}
                        votes={entry.votes}
                        username={entry.username}
                        createdAt={entry.createdAt}
                    />

                    <AddVoteForm
                        insertEntryVoteService={insertEntryVoteService}
                        addEntryVote={addEntryVote}
                        votes={entry.votes}
                        entryId={entryId}
                        authUser={authUser}
                        authToken={authToken}
                    />

                    <EntryDetailsGallery
                        place={entry.place}
                        photos={entry.photos}
                        entryId={entry.id}
                        userId={entry.userId}
                        authUser={authUser}
                        authToken={authToken}
                        deleteEntryPhoto={deleteEntryPhoto}
                    />

                    <EntryDetailsAddPhoto
                        userId={entry.userId}
                        entryId={entry.id}
                        photos={entry.photos}
                        addEntryPhoto={addEntryPhoto}
                        authToken={authToken}
                        authUser={authUser}
                    />
                </>
            )}
        </main>
    );
};

export default EntryDetailsPage;
