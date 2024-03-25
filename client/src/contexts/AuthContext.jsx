// Importamos las prop-types.
import PropType from 'prop-types';

// Importamos la función que crea un contexto y los hooks.
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Creamos el contexto.
export const AuthContext = createContext(null);

// Importamos la función toast.
import toast from 'react-hot-toast';

// Importamos los servicios.
import {
    getPrivateProfileService,
    signInService,
    signUpService,
    updateAvatarService,
    updateUsernameAndEmailService,
} from '../services/userService';

// Creamos el componente provider.
export const AuthProvider = ({ children }) => {
    // Importamos la función navigate.
    const navigate = useNavigate();

    // Declaramos una variable en el State para almacenar el token y los datos del usuario.
    const [authToken, setAuthToken] = useState(
        localStorage.getItem('authToken') || null
    );

    const [authUser, setAuthUser] = useState(null);

    // Declaramos una variable en el State que indique si estamos haciendo una petición al servidor.
    const [authLoading, setAuthLoading] = useState(false);

    // Creamos un useEffect que haga una petición para buscar los datos del usuario cada vez que se registre un
    // nuevo token.
    useEffect(() => {
        // Función que hace un fetch para buscar los datos del usuario.
        const fetchUser = async () => {
            try {
                // Establecemos loading a true para deshabilitar los botones.
                setAuthLoading(true);

                // Obtenemos el usuario.
                const user = await getPrivateProfileService(authToken);

                // Actualizamos los datos del usuario.
                setAuthUser(user);
            } catch (err) {
                toast.error(err.message);
            } finally {
                // Volvemos a estableces loading al valor original.
                setAuthLoading(false);
            }
        };

        // Si la variable "authToken" contiene un valor considerado verdadero por JavaScript (si hay token)
        // ejecutamos la función anterior.
        if (authToken) {
            fetchUser();
        }
    }, [authToken]);

    // Función de registro.
    const authRegister = async (username, email, password) => {
        try {
            // Establecemos loading a true para deshabilitar los botones.
            setAuthLoading(true);

            // Registramos el usuario y obtenemos el mensaje de respuesta satisfactoria.
            const message = await signUpService(username, email, password);

            // Si todo ha ido bien se lo indicamos al usuario.
            toast.success(message);

            // Redirigimos a login.
            navigate('/login');
        } catch (err) {
            toast.error(err.message);
        } finally {
            // Volvemos a estableces loading al valor original.
            setAuthLoading(false);
        }
    };

    // Función de login.
    const authLogin = async (email, password) => {
        try {
            // Establecemos loading a true para deshabilitar los botones.
            setAuthLoading(true);

            // Logueamos al usuario y obtenemos el token.
            const authToken = await signInService(email, password);

            // Almacenamos el token en el State.
            setAuthToken(authToken);

            // Almacenamos el token en el localStorage.
            localStorage.setItem('authToken', authToken);
        } catch (err) {
            toast.error(err.message);
        } finally {
            // Volvemos a estableces loading al valor original.
            setAuthLoading(false);
        }
    };

    // Función de cerrar sesión.
    const authLogout = () => {
        // Eliminamos los datos del usuario del State.
        setAuthUser(null);

        // Eliminamos el token del Stattoast.
        setAuthToken(null);

        // Eliminamos el token del localStorage.
        localStorage.removeItem('authToken');
    };

    // Función que edita el nombre de usuario y/o el email.
    const authEditUser = async (username, email) => {
        try {
            // Establecemos loading a true para deshabilitar los botones.
            setAuthLoading(true);

            // Actualizamos los datos y obtenemos los cambios en el usuario y el mensaje.
            const { message, user } = await updateUsernameAndEmailService(
                username,
                email,
                authToken
            );

            // Actualizamos los datos del usuario indicando el nuevo nombre de usuario y/o email. Para tal fin
            // creamos un nuevo objeto con las mismas propiedades que el usuario original pero modificando el nombre
            // de usuario y/o el email.
            setAuthUser({
                ...authUser,
                username: user.username ? user.username : authUser.username,
                email: user.email ? user.email : authUser.email,
            });

            // Enviamos al usuario un mensaje indicando que todo ha ido bien.
            toast.success(message);
        } catch (err) {
            toast.error(err.message);
        } finally {
            // Volvemos a estableces loading al valor original.
            setAuthLoading(false);
        }
    };

    // Función que edita el avatar del usuario.
    const authEditUserAvatar = async (avatar) => {
        try {
            // Establecemos loading a true para deshabilitar los botones.
            setAuthLoading(true);

            // Actualizamos el avatar del usuario y obtenemos el nuevo nombre y el mensaje.
            const { message, avatarName } = await updateAvatarService(
                avatar,
                authToken
            );

            // Actualizamos los datos del usuario indicando el nuevo avatar. Para tal fin creamos un nuevo
            // objeto con las mismas propiedades que el usuario original pero modificamos el avatar.
            setAuthUser({
                ...authUser,
                avatar: avatarName,
            });

            // Mostramos un mensaje indicando que todo ha ido bien.
            toast.success(message);
        } catch (err) {
            toast.error(err.message);
        } finally {
            // Volvemos a estableces loading al valor original.
            setAuthLoading(false);
        }
    };

    // Retornamos el componente provider.
    return (
        <AuthContext.Provider
            value={{
                authToken,
                authUser,
                authRegister,
                authLogin,
                authLogout,
                authEditUser,
                authEditUserAvatar,
                authLoading,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

// Validamos las props.
AuthProvider.propTypes = {
    children: PropType.node.isRequired,
};
