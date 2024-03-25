// Importamos las prop-types.
import PropType from 'prop-types';

// Importamos los hooks.
import { useState } from 'react';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Importamos los componentes.
import Stars from '../../components/Stars/Stars';

// Inicializamos el componente.
const AddVoteForm = ({
    insertEntryVoteService,
    addEntryVote,
    votes,
    entryId,
    authUser,
    authToken,
}) => {
    // Declaramos la media de votos de la entrada en el State.
    const [votesAvg, setVotesAvg] = useState(votes);

    // Función que permite enviar el voto al servidor.
    const handleAddVote = async (vote) => {
        try {
            // Solo puedes votar si estás logueado.
            if (authUser) {
                // Insertamos el voto y obtenemos a nueva media de votos.
                const newVotesAvg = await insertEntryVoteService(
                    vote,
                    entryId,
                    authToken
                );

                // Actualizamos el State de la entrada con la nueva media de votos.
                addEntryVote(newVotesAvg);

                // Actualizamos la media de votos en el State.
                setVotesAvg(newVotesAvg);
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className='stars-vote'>
            <Stars votesAvg={votesAvg} handleAddVote={handleAddVote} />
            <span>{votes} estrellas</span>
        </div>
    );
};

// Validamos las props.
AddVoteForm.propTypes = {
    insertEntryVoteService: PropType.func.isRequired,
    addEntryVote: PropType.func.isRequired,
    votes: PropType.number.isRequired,
    entryId: PropType.string.isRequired,
    authUser: PropType.object.isRequired,
    authToken: PropType.string.isRequired,
};

export default AddVoteForm;
