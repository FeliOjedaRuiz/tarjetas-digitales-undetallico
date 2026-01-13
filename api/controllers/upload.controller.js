const createError = require('http-errors');
const cloudinary = require('cloudinary').v2; // Asegúrate de tener esto importado

module.exports.upload = (req, res, next) => {
  // Multer (cloudinary.config) ya ha procesado el archivo y lo ha puesto en req.file
  if (!req.file) {
    return next(createError(400, 'No se ha subido ningún archivo o el formato no es válido.'));
  }

  // Devolvemos la URL pública para que el frontend la pueda usar
  res.json({ 
    url: req.file.path,
    filename: req.file.filename // Útil si luego quieres borrarla
  });
};

module.exports.delete = async (req, res, next) => {
  const { url } = req.body;

  if (!url) {
    return next(createError(400, 'URL is required'));
  }

  try {
    // Extraer el public_id de la URL de Cloudinary
    // Ejemplo: .../upload/v1234/folder/imagen.jpg -> folder/imagen
    const regex = /\/upload\/(?:v\d+\/)?(.+)\.[a-z]+$/;
    const match = url.match(regex);
    const publicId = match ? match[1] : null;

    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
    res.status(200).json({ message: 'Image deleted' });
  } catch (error) {
    next(error);
  }
};