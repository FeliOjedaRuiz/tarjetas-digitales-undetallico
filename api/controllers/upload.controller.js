const createError = require('http-errors');

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