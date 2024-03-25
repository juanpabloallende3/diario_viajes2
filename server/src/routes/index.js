// Importamos las dependencias.
import express from 'express';

// Importamos las rutas.
import userRoutes from './userRoutes.js';
import entryRoutes from './entryRoutes.js';

// Creamos un router.
const router = express.Router();

// Middleware que indica a express dónde están las rutas.
router.use(userRoutes);
router.use(entryRoutes);

export default router;
