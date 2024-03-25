// Importamos joi.
import joi from 'joi';

// Importamos el esquema que verifica una imagen.
import imgSchema from '../imgSchema.js';

// Creamos el esquema de Joi.
const addPhotoSchema = joi.object({
    photo: imgSchema.required(),
});

export default addPhotoSchema;
