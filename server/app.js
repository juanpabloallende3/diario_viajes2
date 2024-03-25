// Importamos las dependencias.
import express from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import cors from 'cors';

// Obtenemos las variables de entorno.
import { PORT, UPLOADS_DIR } from './env.js';

// Importamos las rutas.
import routes from './src/routes/index.js';

// Importamos las funciones controladoras finales de los errores.
import {
    errorController,
    notFoundController,
} from './src/controllers/errors/index.js';

// Creamos el servidor.
const app = express();

// Middleware que lee un body en formato JSON.
app.use(express.json());

// Middleware que lee un body en formato form-data (para trabajar con archivos). Los archivos
// no estarán disponibles en "req.body", si no en "req.files". Todo lo que no sea un archivo
// sí estará disponible en "req.body".
app.use(fileUpload());

// Middleware que indica a Express cuál es el directorio de subida de archivos.
app.use(express.static(UPLOADS_DIR));

// Middleware que evita problemas de conexión entre cliente y servidor.
app.use(cors());

// Middleware que muestra info sobre la petición entrante.
app.use(morgan('dev'));

// Middleware que indica a express dónde están las rutas.
app.use(routes);

// Middleware de ruta no encontrada.
app.use(notFoundController);

// Middleware de manejo de errores.
app.use(errorController);

// Le indicamos al servidor que escuche peticiones en un puerto concreto.
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
