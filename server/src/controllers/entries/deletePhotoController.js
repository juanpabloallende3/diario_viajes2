// Importamos los modelos.
import selectEntryByIdModel from '../../models/entries/selectEntryByIdModel.js';
import deletePhotoModel from '../../models/entries/deletePhotoModel.js';

// Importamos los servicios.
import { deletePhoto } from '../../services/photoService.js';

// Importamos los errores.
import {
    notFoundError,
    unauthorizedUserError,
} from '../../services/errorService.js';

// Función controladora final que elimina una foto de una entrada.
const deletePhotoController = async (req, res, next) => {
    try {
        // Obtenemos los path params.
        const { entryId, photoId } = req.params;

        // Seleccionamos la entrada.
        const entry = await selectEntryByIdModel(entryId);

        // Si no somos los dueños de la entrada lanzamos un error.
        if (entry.userId !== req.user.id) {
            unauthorizedUserError();
        }

        // Localizamos la foto que queremos eliminar. Debemos asegurarnos de que los ID que
        // comparamos sean de tipo numérico. El path param será tipo string, lo convertimos a
        // Number.
        const photo = entry.photos.find(
            (photo) => photo.id === Number(photoId),
        );

        // Si la foto no existe lanzamos un error.
        if (!photo) {
            notFoundError('foto');
        }

        // Borramos la foto de la carpeta de subida de archivos.
        await deletePhoto(photo.name);

        // Borramos la foto del disco.
        await deletePhotoModel(photoId);

        res.send({
            status: 'ok',
            message: 'Foto eliminada',
        });
    } catch (err) {
        next(err);
    }
};

export default deletePhotoController;
