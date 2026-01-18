const rateLimit = require('express-rate-limit');

// 1. Limite general para toda la API (Protección básica DDoS/Brute Force)
module.exports.apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 150, // Límite de peticiones por ventana por IP
  standardHeaders: true, // Retorna info de límites en los headers `RateLimit-*`
  legacyHeaders: false, // Deshabilita los headers `X-RateLimit-*`
  message: {
    status: 429,
    message: 'Demasiadas peticiones desde esta IP, por favor intenta de nuevo más tarde.'
  }
});

// 2. Limite estricto para creación de contenido (Evitar spam de tarjetas)
module.exports.createContentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 20, // Máximo 20 tarjetas creadas por hora por IP
  message: {
    status: 429,
    message: 'Has creado demasiadas tarjetas recientemente. Intenta de nuevo en una hora.'
  }
});

// 3. Limite estricto para subidas (Evitar saturación de Cloudinary)
module.exports.uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 50, // Máximo 50 subidas por hora
  message: {
    status: 429,
    message: 'Límite de subida de imágenes excedido. Intenta de nuevo más tarde.'
  }
});