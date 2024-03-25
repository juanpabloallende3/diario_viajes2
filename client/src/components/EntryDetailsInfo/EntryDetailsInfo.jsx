// Importamos las prop-types.
import PropType from 'prop-types';

// Importamos las dependencias.
import moment from 'moment';

// Importamos los estilos.
import './EntryDetailsInfo.css';

// Inicializamos el componente.
const EntryDetailsInfo = ({ place, description, username, createdAt }) => {
    return (
        <ul className='entry-details'>
            <li>
                <strong>Lugar:</strong> {place}
            </li>
            <li>
                <strong>Descripción:</strong> {description}
            </li>
            <li>
                <strong>Usuario:</strong> {username}
            </li>
            <li>
                <strong>Fecha de creación:</strong>
                {moment(createdAt).format('DD/MM/YYYY [a las] HH:mm')}
            </li>
        </ul>
    );
};

// Validamos las props.
EntryDetailsInfo.propTypes = {
    place: PropType.string.isRequired,
    description: PropType.string.isRequired,
    username: PropType.string.isRequired,
    createdAt: PropType.string.isRequired,
};

export default EntryDetailsInfo;
