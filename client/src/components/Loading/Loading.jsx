// Importamos los estilos.
import './Loading.css';

// Inicializamos el componente.
const Loading = () => {
    return (
        <img
            src='/spinning-circles.svg'
            alt='Icono de loading'
            className='loading-svg'
        />
    );
};

export default Loading;
