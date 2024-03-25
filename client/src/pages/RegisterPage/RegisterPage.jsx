// Importamos los hooks.
import { useContext } from 'react';

// Importamos el contexto.
import { AuthContext } from '../../contexts/AuthContext';

// Importamos los componentes.
import { Navigate } from 'react-router-dom';

// Importamos el formulario.
import RegisterForm from '../../forms/RegisterForm/RegisterForm';

// Inicializamos el componente.
const RegisterPage = () => {
    // Importamos la función de registro y el token.
    const { authUser, authRegister, authLoading } = useContext(AuthContext);

    // Si el usuario ya está logueado redirigimos a la página principal. No nos interesa
    // que un usuario ya logueado pueda ver el formulario de login, no tiene sentido.
    if (authUser) {
        return <Navigate to='/' />;
    }

    return (
        <main>
            <h2>Registro</h2>

            <RegisterForm
                authRegister={authRegister}
                authLoading={authLoading}
            />
        </main>
    );
};

export default RegisterPage;
