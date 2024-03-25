// Importamos los hooks.
import { useContext } from 'react';

// Importamos el contexto.
import { AuthContext } from '../../contexts/AuthContext';

// Importamos los componentes.
import { Navigate } from 'react-router-dom';

// Importamos el formulario.
import UserProfileForm from '../../forms/UserProfileForm/UserProfileForm';

// Importamos las variables de entorno.
const { VITE_API_URL } = import.meta.env;

// Importamos los estilos.
import './UserProfilePage.css';

// Inicializamos el componente.
const UserProfilePage = () => {
    // Importamos el token.
    const { authUser, authEditUser, authEditUserAvatar, authLoading } =
        useContext(AuthContext);

    // Si el usuario NO está logueado redirigimos a la página principal. No nos interesa
    // que un usuario NO logueado pueda acceder a su perfil, no tiene sentido.
    if (!authUser) {
        return <Navigate to='/' />;
    }

    return (
        <main className='profile-page'>
            <h2>Perfil</h2>

            {/* Si el usuario tiene avatar lo mostramos, si no mostramos un avatar por defecto. */}
            <img
                src={
                    authUser.avatar
                        ? `${VITE_API_URL}/${authUser.avatar}`
                        : '/default-avatar.png'
                }
                alt={`Avatar de ${authUser.username}`}
            />

            <UserProfileForm
                authUser={authUser}
                authEditUser={authEditUser}
                authEditUserAvatar={authEditUserAvatar}
                authLoading={authLoading}
            />
        </main>
    );
};

export default UserProfilePage;
