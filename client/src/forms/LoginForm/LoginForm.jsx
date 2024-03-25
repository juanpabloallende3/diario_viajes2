// Importamos las prop-types.
import PropType from 'prop-types';

// Importamos los hooks.
import { useState } from 'react';

// Inicializamos el componente.
const LoginForm = ({ authLogin, authLoading }) => {
    // Declaramos una variable en el State por cada elemento del formulario.
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    // Función que maneja el envío del formulario.
    const handleSubmit = (e) => {
        // Prevenimos el comportamiento por defecto del formulario.
        e.preventDefault();

        authLogin(email, pass);
    };

    return (
        <form onSubmit={handleSubmit}>
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

            <button disabled={authLoading}>Loguearse</button>
        </form>
    );
};

// Validamos las props.
LoginForm.propTypes = {
    authLogin: PropType.func.isRequired,
    authLoading: PropType.bool.isRequired,
};

export default LoginForm;
