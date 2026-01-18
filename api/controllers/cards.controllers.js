const Card = require('../models/card.model');
const createError = require('http-errors');
const { generateUniqueSlug } = require('../utils/slugGenerator');

// 1. Crear Tarjeta
module.exports.create = (req, res, next) => {
  const autoSlug = generateUniqueSlug(req.body.recipient);

  const cardData = {
    ...req.body,
    userId: req.user.id,
    urlSlug: autoSlug
  };

  Card.create(cardData)
    .then((card) => res.status(201).json(card))
    .catch((error) => {
      if (error.code === 11000 && error.keyPattern.urlSlug) {
        return next(createError(409, 'Error generando el enlace único.'));
      }
      next(error);
    });
};

module.exports.list = (req, res, next) => {
  const criteria = {};
  const isAdmin = req.user.role === 'admin';

  if (!isAdmin) {
    criteria.userId = req.user.id;
  }

  Card.find(criteria)
    .populate('userId', 'name email')
    .sort({ createdAt: -1 })
    .then((cards) => res.json(cards))
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  Card.findById(req.params.id)
    .populate('templateId')
    .then((card) => {
      if (!card) return next(createError(404, 'Tarjeta no encontrada'));

      const isAdmin = req.user.role === 'admin';

      if (!isAdmin && card.userId.toString() !== req.user.id) {
        return next(createError(403, 'No tienes permiso para ver esta tarjeta'));
      }
      res.json(card);
    })
    .catch(next);
};

module.exports.getBySlug = (req, res, next) => {
  Card.findOne({ urlSlug: req.params.slug })
    .populate('userId', 'name email')
    .populate('templateId')
    .then((card) => {
      if (!card) {
        return next(createError(404, 'Tarjeta no encontrada'));
      }
      res.json(card);
    })
    .catch(next);
};

module.exports.update = (req, res, next) => {
  if (req.body.urlSlug) delete req.body.urlSlug;

  Card.findById(req.params.id)
    .then((card) => {
      if (!card) return next(createError(404, 'Tarjeta no encontrada'));

      const isAdmin = req.user.role === 'admin';

      if (!isAdmin && card.userId.toString() !== req.user.id) {
        return next(createError(403, 'No puedes editar una tarjeta que no es tuya'));
      }

      Object.assign(card, req.body);
      return card.save();
    })
    .then((card) => res.json(card))
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  Card.findById(req.params.id)
    .then(card => {
      if (!card) return next(createError(404, 'Tarjeta no encontrada'));

      const isAdmin = req.user.role === 'admin';

      if (!isAdmin && card.userId.toString() !== req.user.id) {
        return next(createError(403, 'No tienes permiso para eliminar esta tarjeta'));
      }

      return Card.deleteOne({ _id: req.params.id });
    })
    .then(() => res.status(204).send())
    .catch(next);
};