// Importamos los componentes.
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Importamos las páginas.
import HomePage from './pages/HomePage/HomePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ValidateUserPage from './pages/ValidateUserPage/ValidateUserPage';
import LoginPage from './pages/LoginPage/LoginPage';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';
import EntryDetailsPage from './pages/EntryDetailsPage/EntryDetailsPage';
import NewEntryPage from './pages/NewEntryPage/NewEntryPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

// Inicializamos el componente.
const App = () => {
    return (
        <>
            <Header />

            {/* Este componente se encargará de renderizar los mensajes que queramos mostrar al usuario. */}
            <Toaster
                position='top-center'
                toastOptions={{
                    duration: 3000,
                }}
            />

            {/* Todas las rutas han de definirse dentro del componente <Routes>. */}
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route
                    path='/users/validate/:registrationCode'
                    element={<ValidateUserPage />}
                />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/profile' element={<UserProfilePage />} />
                <Route
                    path='/entries/:entryId'
                    element={<EntryDetailsPage />}
                />
                <Route path='/entries' element={<NewEntryPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </>
    );
};

export default App;
