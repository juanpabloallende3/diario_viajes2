// Importamos las prop-types.
import PropType from 'prop-types';

// Importamos los hooks.
import { useState } from 'react';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Inicializamos el componente.
const RegisterForm = ({ authRegister, authLoading }) => {
    // Declaramos una variable en el State por cada elemento del formulario.
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [repeatedPass, setRepeatedPass] = useState('');

    // Función que maneja el envío del formulario.
    const handleSubmit = (e) => {
        // Prevenimos el comportamiento por defecto del formulario.
        e.preventDefault();

        // Si las contraseñas coinciden registramos el usuario.
        if (pass === repeatedPass) {
            authRegister(username, email, pass);
        } else {
            toast.error('Las contraseñas no coinciden');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Usuario:</label>
            <input
                type='text'
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete='username'
                required
            />

            <label htmlFor='email'>Email:</label>
            <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete='email'
                required
            />

            <label htmlFor='pass'>Contraseña:</label>
            <input
                type='password'
                id='pass'
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                autoComplete='new-password'
                required
            />

            <label htmlFor='repeatedPass'>Repetir contraseña:</label>
            <input
                type='password'
                id='repeatedPass'
                value={repeatedPass}
                onChange={(e) => setRepeatedPass(e.target.value)}
                autoComplete='new-password'
                required
            />

            <button disabled={authLoading}>Registrarse</button>
        </form>
    );
};

// Validamos las props.
RegisterForm.propTypes = {
    authRegister: PropType.func.isRequired,
    authLoading: PropType.bool.isRequired,
};

export default RegisterForm;
