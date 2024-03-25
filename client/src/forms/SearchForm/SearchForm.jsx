// Importamos las prop-types.
import PropType from 'prop-types';

// Importamos los hooks.
import { useState } from 'react';

// Importamos los estilos.
import './SearchForm.css';

// Inicializamos el componente.
const SearchForm = ({ setSearchParams, loading }) => {
    // Declaramos una variable en el State por cada elemento del formulario.
    const [author, setAuthor] = useState('');
    const [place, setPlace] = useState('');

    // Función que maneja el envío del formulario.
    const handleSubmit = (e) => {
        // Prevenimos el comportamiento por defecto del formulario.
        e.preventDefault();

        // Establecemos los query params.
        setSearchParams(
            new URLSearchParams({
                author,
                place,
            })
        );
    };

    return (
        <form onSubmit={handleSubmit} className='search-form'>
            <div>
                <label htmlFor='author'>Autor:</label>
                <input
                    type='text'
                    id='author'
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor='place'>Lugar:</label>
                <input
                    type='text'
                    id='place'
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                />
            </div>

            <button disabled={loading}>Buscar</button>
        </form>
    );
};

// Validamos las props.
SearchForm.propTypes = {
    setSearchParams: PropType.func.isRequired,
    loading: PropType.bool.isRequired,
};

export default SearchForm;
