// Importamos los hooks.
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Importamos los servicios.
import { selectAllEntriesService } from '../services/entryService';

// Inicializamos el hook.
const useEntries = () => {
    // Declaramos una variable en el State para almacenar las entradas.
    const [entries, setEntries] = useState([]);

    // Declaramos una variable en el State para almacenar el query string (ej: "?author=david93&place=valencia")
    const [searchParams, setSearchParams] = useSearchParams();

    // Declaramos dos variables para almacenar la página siguiente y anterior.
    const [prevPage, setPrevPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);

    // Declaramos una variable en el State que indique si estamos haciendo una petición al servidor.
    const [loading, setLoading] = useState(false);

    // Utilizamos un useEffect para buscar las entradas cuando se monta un componente.
    useEffect(() => {
        // Función que busca las entradas.
        const fetchEntries = async () => {
            try {
                // Establecemos loading a true para deshabilitar los botones.
                setLoading(true);

                // Obtenemos las entradas, la página anterior, actual y siguiente.
                const { entries, prevPage, nextPage, currentPage } =
                    await selectAllEntriesService(searchParams);

                // Actualizamos las entradas en el State.
                setEntries(entries);

                // Actualizamos las páginas.
                setPrevPage(prevPage);
                setCurrentPage(currentPage);
                setNextPage(nextPage);
            } catch (err) {
                toast.error(err.message);
            } finally {
                // Volvemos a estableces loading al valor original.
                setLoading(false);
            }
        };

        // Llamamos a la función anterior.
        fetchEntries();
    }, [searchParams]);

    // Retornamos los valores deseados.
    return {
        entries,
        setSearchParams,
        prevPage,
        currentPage,
        nextPage,
        loading,
    };
};

export default useEntries;
