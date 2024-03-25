// Importamos las prop-types.
import PropType from 'prop-types';

// Importamos las dependencias.
import moment from 'moment';

// Importamos los componentes.
import { Link } from 'react-router-dom';

// Importamos las variables de entorno.
const { VITE_API_URL } = import.meta.env;

// Importamos los estilos.
import './EntryListItem.css';

// Inicializamos el componente.
const EntryListItem = ({ entry }) => {
    return (
        <Link to={`/entries/${entry.id}`} className='entry-item'>
            <li>
                <div className='entry-img'>
                    <img
                        src={
                            entry.photos[0]?.name
                                ? `${VITE_API_URL}/${entry.photos[0]?.name}`
                                : '/default-entry-img.png'
                        }
                        alt={entry.place}
                    />
                </div>
                <div className='entry-info'>
                    <div>
                        <h3>{entry.title}</h3>

                        <p>
                            <strong>Lugar:</strong> {entry.place}
                        </p>

                        <p>
                            <strong>Creado por:</strong> {entry.username}
                        </p>

                        <p>
                            <strong>Media de votos:</strong>{' '}
                            {!entry.votes ? 'Sin votos' : entry.votes}
                        </p>
                    </div>
                    <div>
                        <time>
                            {moment(entry.createdAt).format(
                                'DD/MM/YYYY [a las] HH:mm'
                            )}
                        </time>
                    </div>
                </div>
            </li>
        </Link>
    );
};

// Validamos las props.
EntryListItem.propTypes = {
    entry: PropType.object.isRequired,
};

export default EntryListItem;
