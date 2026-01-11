const Template = require('../models/template.model');
const createError = require('http-errors');

// 1. Listar Plantillas
module.exports.list = (req, res, next) => {
  // Podrías filtrar por categoría si te lo piden por query params
  const criteria = {};
  if (req.query.category) {
      criteria.categories = req.query.category;
  }

  Template.find(criteria)
    .then((templates) => res.json(templates))
    .catch(next);
};

// 2. Detalle de Plantilla (Por ID o Slug)
module.exports.detail = (req, res, next) => {
  // Aquí buscamos por ID, pero podrías cambiarlo a slug si prefieres URLs más bonitas
  Template.findById(req.params.id)
    .then((template) => {
      if (!template) return next(createError(404, 'Plantilla no encontrada'));
      res.json(template);
    })
    .catch(next);
};