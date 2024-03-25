// Importamos los modelos.
import insertEntryModel from '../../models/entries/insertEntryModel.js';
import insertPhotoModel from '../../models/entries/insertPhotoModel.js';

// Importamos la función que permite guardar una foto en disco.
import { savePhoto } from '../../services/photoService.js';

// Importamos la función que valida esquemas.
import validateSchema from '../../utilities/validateSchema.js';

// Importamos el esquema de Joi.
import newEntrySchema from '../../schemas/entries/newEntrySchema.js';

// Función controladora final que agrega una nueva entrada.
const newEntryController = async (req, res, next) => {
    try {
        // Validamos los datos con Joi. Fusionamos en un solo objeto las propiedades de body y de files
        // con Object.assign.
        await validateSchema(
            newEntrySchema,
            Object.assign(req.body, req.files),
        );

        // Obtenemos los campos necesarios del body.
        const { title, place, description } = req.body;

        // Insertamos la entrada y obtenemos el ID que la base de datos le ha otorgado.
        const entryId = await insertEntryModel(
            title,
            place,
            description,
            req.user.id,
        );

        // Array donde pushearemos las posibles fotos.
        const photos = [];

        // Si "req.files" existe quiere decir que hay algún archivo en la petición.
        if (req.files) {
            // Obtenemos un array con los valores de las propiedades de "req.files", es decir, un array
            // de objetos donde cada objeto será una foto. Para asegurarme de que el array de fotos solo
            // tenga tres fotos podemos hacer un slice por seguridad.
            const photosArr = Object.values(req.files).slice(0, 3);

            // Recorro el array de fotos.
            for (const photo of photosArr) {
                // Guardamos la foto en la carpeta de subida de archivos y obtenemos el nombre
                // que se le ha asignado.
                const photoName = await savePhoto(photo);

                // Guardamos la foto en la base de datos y obtenemos el ID que le ha asignado la base de datos.
                const photoId = await insertPhotoModel(photoName, entryId);

                // Pusheamos la foto al array de fotos.
                photos.push({
                    id: photoId,
                    name: photoName,
                });
            }
        }

        res.status(201).send({
            status: 'ok',
            message: 'Entrada creada',
            data: {
                entry: {
                    id: entryId,
                    title,
                    place,
                    description,
                    userId: req.user.id,
                    photos,
                    createdAt: new Date(),
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default newEntryController;
