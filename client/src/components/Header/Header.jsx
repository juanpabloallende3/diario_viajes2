// Importamos los hooks.
import { useContext } from 'react';

// Importamos el contexto.
import { AuthContext } from '../../contexts/AuthContext';

// Importamos los componentes.
import { Link, NavLink } from 'react-router-dom';

// Importamos las variables de entorno.
const { VITE_API_URL } = import.meta.env;

// Importamos los estilos.
import './Header.css';

// Inicializamos el componente.
const Header = () => {
    // Importamos los datos del usuario y la función de cerrar sesión.
    const { authUser, authLogout } = useContext(AuthContext);

    return (
        <header>
            <div className='title'>
                <Link to='/'>
                    <img src='/diario-viajes-logo.svg' alt='Logo Twitter' />
                    <h1>Diario de Viajes</h1>
                </Link>
            </div>

            {authUser && (
                <div className='user-data'>
                    <span>@{authUser.username}</span>
                    {/* Si el usuario tiene avatar lo mostramos, si no mostramos un avatar por defecto. */}
                    <img
                        src={
                            authUser.avatar
                                ? `${VITE_API_URL}/${authUser.avatar}`
                                : '/default-avatar.png'
                        }
                        alt={`Avatar de ${authUser.username}`}
                    />
                </div>
            )}

            <nav>
                <label htmlFor='show-menu'>
                    <img src='/menu-icon.png' alt='Icono de menú' />
                </label>
                <input type='checkbox' id='show-menu' />

                <ul className='nav-links'>
                    {!authUser ? (
                        <>
                            {/* Si no estamos logueados (si existe usuario) mostramos el registro y el login. */}
                            <li>
                                <NavLink to='/register'>Registro</NavLink>
                            </li>
                            <li>
                                <NavLink to='/login'>Login</NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            {/* Si estamos logueados (si existe usuario) mostramos el botón de cerrar sesión. */}
                            <li>
                                <NavLink to='/entries'>Crear entrada</NavLink>
                            </li>
                            <li>
                                <NavLink to='/profile'>Perfil</NavLink>
                            </li>
                            <li>
                                <button onClick={authLogout}>
                                    Cerrar sesión
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
