// Importamos los hooks.
import useEntries from '../../hooks/useEntries';

// Importamos los componentes.
import EntryListItem from '../../components/EntryListItem/EntryListItem';
import Loading from '../../components/Loading/Loading';
import SearchForm from '../../forms/SearchForm/SearchForm';

// Importamos los estilos.
import './HomePage.css';

// Inicializamos el componente.
const HomePage = () => {
    // Importamos las entradas.
    const {
        entries,
        setSearchParams,
        prevPage,
        currentPage,
        nextPage,
        loading,
    } = useEntries();

    return (
        <main>
            <h2>Entradas del diario</h2>

            <SearchForm setSearchParams={setSearchParams} loading={loading} />

            <ul className='entry-list'>
                {/* Si el array de entradas está vacío y loading es true... */}
                {entries.length < 1 && loading ? (
                    <Loading />
                ) : entries.length === 0 ? (
                    <li>¡No se ha encontrado ningún resultado!</li>
                ) : (
                    entries.map((entry) => {
                        return <EntryListItem key={entry.id} entry={entry} />;
                    })
                )}
            </ul>

            <div className='buttons'>
                <button
                    className='prev-page'
                    onClick={() => {
                        // Establecemos el query param con la página previa.
                        setSearchParams(
                            new URLSearchParams({
                                page: prevPage,
                            })
                        );
                    }}
                    disabled={!prevPage}>
                    ◀️
                </button>
                <span>{currentPage}</span>
                <button
                    className='next-page'
                    onClick={() => {
                        // Establecemos el query param con la página previa.
                        setSearchParams(
                            new URLSearchParams({
                                page: nextPage,
                            })
                        );
                    }}
                    disabled={!nextPage}>
                    ▶️
                </button>
            </div>
        </main>
    );
};

export default HomePage;
