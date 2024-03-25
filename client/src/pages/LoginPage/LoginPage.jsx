// Importamos los hooks.
import { useContext } from 'react';

// Importamos el contexto.
import { AuthContext } from '../../contexts/AuthContext';

// Importamos los componentes.
import { Navigate } from 'react-router-dom';

// Importamos el formulario.
import LoginForm from '../../forms/LoginForm/LoginForm';

// Inicializamos el componente.
const LoginPage = () => {
    // Importamos la función de login y el token.
    const { authUser, authLogin, authLoading } = useContext(AuthContext);

    // Si el usuario ya está logueado redirigimos a la página principal. No nos interesa
    // que un usuario ya logueado pueda ver el formulario de login, no tiene sentido.
    if (authUser) {
        return <Navigate to='/' />;
    }

    return (
        <main>
            <h2>Login</h2>

            <LoginForm authLogin={authLogin} authLoading={authLoading} />
        </main>
    );
};

export default LoginPage;
