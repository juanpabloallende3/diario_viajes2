// Importamos las prop-types.
import PropType from 'prop-types';

// Importamos los estilos.
import './Stars.css';

// Inicializamos el componente.
const Stars = ({ votesAvg, handleAddVote }) => {
    // Array que almacenará la etiqueta <img> de cada una de las cinco estrellas.
    const stars = [];

    // Dado que hay que pintar cinco estrellas, creamos un bucle que se repita cinco veces.
    for (let i = 1; i <= 5; i++) {
        // Seleccionamos la ruta a la estrella rellena (en caso de que "i" sea menor o igual a "votesAvg")
        // a la estrella vacía.
        const starPath = i <= votesAvg ? '/star-fill.svg' : '/star-empty.svg';

        // Pusheamos la estrella en cuestión. Añadimos la función de votar y el valor del index.
        stars.push(
            <img src={starPath} key={i} onClick={() => handleAddVote(i)} />
        );
    }

    return <div className='stars-container'>{stars}</div>;
};

// Validamos las props.
Stars.propTypes = {
    votesAvg: PropType.number.isRequired,
    handleAddVote: PropType.func.isRequired,
};

export default Stars;
