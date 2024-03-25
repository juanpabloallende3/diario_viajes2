// Importamos los hooks.
import { useContext } from 'react';

// Importamos el contexto.
import { AuthContext } from '../../contexts/AuthContext';

// Importamos los componentes.
import { Navigate } from 'react-router-dom';

// Importamos el formulario.
import NewEntryForm from '../../forms/NewEntryForm/NewEntryForm';

// Importamos los servicios.
import { insertEntryService } from '../../services/entryService';

// Inicializamos el componente.
const NewEntryPage = () => {
    // Importamos los datos del usuario y el token.
    const { authUser, authToken } = useContext(AuthContext);

    // Si el usuario NO está logueado redirigimos a la página principal. No nos interesa
    // que un usuario NO logueado pueda ver el formulario de creación de nueva entrada.
    if (!authUser) {
        return <Navigate to='/' />;
    }

    return (
        <main>
            <h2>Nueva entrada</h2>

            <NewEntryForm
                insertEntryService={insertEntryService}
                authToken={authToken}
            />
        </main>
    );
};

export default NewEntryPage;
