// Importamos las prop-types.
import PropType from 'prop-types';

// Importamos los hooks.
import { useState } from 'react';

// Inicializamos el componente.
const UserProfileForm = ({
    authUser,
    authEditUser,
    authEditUserAvatar,
    authLoading,
}) => {
    // Declaramos una variable en el State por cada elemento del formulario.
    const [username, setUsername] = useState(authUser.username);
    const [email, setEmail] = useState(authUser.email);
    const [avatar, setAvatar] = useState(null);

    // Función que maneja el envío del formulario de editar avatar.
    const handleAvatarSubmit = (e) => {
        // Prevenimos el comportamiento por defecto del formulario.
        e.preventDefault();

        authEditUserAvatar(avatar);
    };

    // Función que maneja el envío del formulario de editar nombre de usuario y/o email.
    const handleUsernameEmailSubmit = (e) => {
        // Prevenimos el comportamiento por defecto del formulario.
        e.preventDefault();

        authEditUser(username, email);
    };

    return (
        <>
            <form onSubmit={handleAvatarSubmit}>
                <input
                    type='file'
                    onChange={(e) => setAvatar(e.target.files[0])}
                    accept='image/png, image/jpeg'
                    required
                />
                <button>Editar</button>
            </form>

            <form onSubmit={handleUsernameEmailSubmit}>
                <label htmlFor='username'>Usuario:</label>
                <input
                    type='text'
                    id='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete='username'
                />

                <label htmlFor='email'>Email:</label>
                <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete='email'
                />

                <button disabled={authLoading}>Editar</button>
            </form>
        </>
    );
};

// Validamos las props.
UserProfileForm.propTypes = {
    authUser: PropType.object.isRequired,
    authEditUser: PropType.func.isRequired,
    authEditUserAvatar: PropType.func.isRequired,
    authLoading: PropType.bool.isRequired,
};

export default UserProfileForm;
