// Función controladora final que utilizaremos en el middleware de manejo de errores.
// eslint-disable-next-line no-unused-vars
const errorController = (err, req, res, next) => {
    console.error(err);

    res.status(err.httpStatus || 500).send({
        status: 'error',
        message: err.message,
    });
};

export default errorController;
