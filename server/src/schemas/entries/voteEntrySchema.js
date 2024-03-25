// Importamos joi.
import joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi.
const voteEntrySchema = joi.object({
    value: joi
        .number()
        .integer()
        .min(1)
        .max(5)
        .required()
        .messages(joiErrorMessages),
});

export default voteEntrySchema;
