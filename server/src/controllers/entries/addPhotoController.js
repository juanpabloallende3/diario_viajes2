// Importamos los modelos.
import selectEntryByIdModel from '../../models/entries/selectEntryByIdModel.js';
import insertPhotoModel from '../../models/entries/insertPhotoModel.js';

// Importamos los servicios.
import { savePhoto } from '../../services/photoService.js';

// Importamos los servicios.
import validateSchema from '../../utilities/validateSchema.js';

// Importamos el esquema.
import addPhotoSchema from '../../schemas/entries/addPhotoSchema.js';

// Importamos los errores.
import {
    photoLimitReachedError,
    unauthorizedUserError,
} from '../../services/errorService.js';

// Función controladora final que agrega una foto a una entrada.
const addPhotoController = async (req, res, next) => {
    try {
        // Validamos el body con Joi. Dado que "files" podría no existir enviamos un objeto vacío
        // si se da el caso.
        await validateSchema(addPhotoSchema, req.files || {});

        // Obtenemos los path params.
        const { entryId } = req.params;

        // Obtenemos la foto.
        const photo = req.files?.photo;

        // Seleccionamos la entrada.
        const entry = await selectEntryByIdModel(entryId);

        // Si no somos los dueños de la entrada lanzamos un error.
        if (entry.userId !== req.user.id) {
            unauthorizedUserError();
        }

        // Si la entrada tiene más de 3 fotos lanzamos un error.
        if (entry.photos.length > 2) {
            photoLimitReachedError();
        }

        // Guardamos la foto en la carpeta de subida de archivos. Le mandamos como argumentos
        // la foto y el ancho. Obtenemos el nombre que se ha generado.
        const photoName = await savePhoto(photo, 1000);

        // Guardamos la foto en la base de datos y obtenemos su ID.
        const photoId = await insertPhotoModel(photoName, entryId);

        res.status(201).send({
            status: 'ok',
            message: 'Foto agregada',
            data: {
                photo: {
                    id: photoId,
                    name: photoName,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default addPhotoController;
