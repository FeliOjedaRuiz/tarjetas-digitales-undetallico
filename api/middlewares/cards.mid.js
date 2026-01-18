const Template = require('../models/template.model');
const createError = require('http-errors');

module.exports.validateTemplateStructure = (req, res, next) => {
    const { templateId, content } = req.body;

    // 1. Verificamos que haya enviado un templateId
    if (!templateId) {
        return next(createError(400, 'Es necesario indicar un templateId'));
    }

    // 2. Buscamos la plantilla en la BD
    Template.findById(templateId)
        .then(template => {
            if (!template) {
                return next(createError(404, 'La plantilla indicada no existe'));
            }

            // 3. Revisamos campo por campo de la estructura
            const errors = {};
            const userContent = content || {}; // Evitamos error si content viene vacío

            template.structure.forEach(field => {
                const userValue = userContent[field.key];

                // A) VALIDACIÓN: ¿Es obligatorio y está vacío?
                if (field.required && !userValue) {
                    errors[field.key] = `El campo '${field.label}' es obligatorio.`;
                }

                // B) VALIDACIÓN DE TIPOS (Extra de seguridad)
                if (userValue) {
                    // Si es URL de YouTube
                    if (field.type === 'youtube_url' && !userValue.includes('youtube') && !userValue.includes('youtu.be')) {
                        errors[field.key] = 'Debe ser un enlace válido de YouTube';
                    }
                }
            });

            // 4. Si hubo errores, detenemos todo aquí
            if (Object.keys(errors).length > 0) {
                return next(createError(400, { 
                    message: 'Faltan datos o son incorrectos',
                    errors: errors 
                }));
            }

            // 5. ¡Todo bien! Pasamos al controlador
            next();
        })
        .catch(next);
};