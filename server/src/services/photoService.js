// Importamos las dependencias.
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

// Importamos las variables de entorno.
import { UPLOADS_DIR } from '../../env.js';

// Importamos los errores.
import { deleteFileError, saveFileError } from './errorService.js';

// Función que guarda una imagen en la carpeta de subida de archivos.
export const savePhoto = async (file, width) => {
    try {
        // Ruta absoluta al directorio de subida de archivos.
        const uploadsDir = path.join(process.cwd(), UPLOADS_DIR);

        // Creamos la carpeta de subida de archivos si no existe con la ayuda del método "access".
        try {
            await fs.access(uploadsDir);
        } catch {
            // Si el método anterior lanza un error quiere decir que el directorio no existe.
            // En ese caso entraríamos en el catch y lo crearíamos.
            await fs.mkdir(uploadsDir);
        }

        // Creamos un objeto de tipo Sharp con la imagen recibida. Para crear la imagen tipo Sharp
        // es necesario pasarle a Sharp el buffer de datos que estará en la propiedad "data" del archivo
        // en cuestión.
        const sharpImg = sharp(file.data);

        // Redimensionamos la imagen.
        sharpImg.resize(width);

        // Generamos un nombre único para la imagen.
        const imgName = `${crypto.randomUUID()}.png`;

        // Ruta absoluta donde almacenaremos la imagen.
        const imgPath = path.join(uploadsDir, imgName);

        // Guardamos la imagen en la carpeta de subida de archivos.
        await sharpImg.toFile(imgPath);

        // Retornamos el nombre generado.
        return imgName;
    } catch (err) {
        console.error(err);
        saveFileError();
    }
};

// Función que elimina una imagen de la carpeta de subida de archivos.
export const deletePhoto = async (imgName) => {
    try {
        // Ruta absoluta al fichero que queremos eliminar.
        const imgPath = path.join(process.cwd(), UPLOADS_DIR, imgName);

        // Comprobamos si la imagen existe con la ayuda del método "access".
        try {
            await fs.access(imgPath);
        } catch {
            // Si el método anterior lanza un error quiere decir que la imagen no existe.
            // En ese caso finalizamos la función.
            return;
        }

        // Eliminamos el fichero.
        await fs.unlink(imgPath);
    } catch (err) {
        console.error(err);
        deleteFileError();
    }
};
