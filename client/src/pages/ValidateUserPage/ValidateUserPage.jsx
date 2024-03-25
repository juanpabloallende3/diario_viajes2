// Importamos los hooks.
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Importamos los servicios.
import { activateUserService } from '../../services/userService';

// Inicializamos el componente.
const ValidateUserPage = () => {
    // Obtenemos la función navigate.
    const navigate = useNavigate();

    // Obtenemos el path param con el código de registro.
    const { registrationCode } = useParams();

    // Utilizamos useEffect para validar al usuario cuando se monte el componente.
    useEffect(() => {
        // Realizamos el fetch.
        const fetchValidateUser = async () => {
            try {
                await activateUserService(registrationCode);

                // Si todo va bien redirigimos a login.
                navigate('/login');
            } catch (err) {
                toast.error(err.message);
            }
        };

        // Llamamos a la función anterior.
        fetchValidateUser();
    }, [navigate, registrationCode]);

    return (
        <main>
            <h2>Validación de usuario</h2>

            <p>Estamos validando tu usuario, por favor, espere.</p>
        </main>
    );
};

export default ValidateUserPage;
