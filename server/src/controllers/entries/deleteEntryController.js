// Importamos los modelos.
import selectEntryByIdModel from '../../models/entries/selectEntryByIdModel.js';
import deletePhotoModel from '../../models/entries/deletePhotoModel.js';
import deleteEntryModel from '../../models/entries/deleteEntryModel.js';

// Importamos los servicios.
import { deletePhoto } from '../../services/photoService.js';

// Importamos los errores.
import { unauthorizedUserError } from '../../services/errorService.js';

// Función controladora final que elimina una entrada.
const deleteEntryController = async (req, res, next) => {
    try {
        // Obtenemos el id de la entrada que queremos eliminar.
        const { entryId } = req.params;

        // Obtenemos los datos de la entrada.
        const entry = await selectEntryByIdModel(entryId);

        // Si no somos los dueños de la entrada y no somos administradores lanzamos un error.
        if (entry.userId !== req.user.id && req.user.role !== 'admin') {
            unauthorizedUserError();
        }

        // Recorremos el array de fotos.
        for (const photo of entry.photos) {
            // Eliminamos las foto de la carpeta de subida de archivos
            await deletePhoto(photo.name);

            // Eliminamos la foto de la base de datos.
            await deletePhotoModel(photo.id);
        }

        // Eliminamos la entrada.
        await deleteEntryModel(entryId);

        res.send({
            status: 'ok',
            message: 'Entrada eliminada',
        });
    } catch (err) {
        next(err);
    }
};

export default deleteEntryController;
