const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  // 1. Relaciones (Vínculos)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template',
    required: true
  },

  // 2. Identidad Pública
  urlSlug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },

  // 3. Contenido Dinámico
  content: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },

  // 4. Configuración de la Tarjeta
  seoTitle: {
    type: String,
    default: 'Te han enviado una tarjeta especial'
    // Texto que sale en la pestaña del navegador o al compartir en WhatsApp
  },

  // 5. Estado y Negocio
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },

  paymentStatus: {
    type: String,
    enum: ['free', 'pending', 'paid'],
    default: 'free'
  },

  recipient: {
    type: String,
    trim: true,
    default: '' // Permitimos que esté vacío
  },

  sender: {
    type: String,
    trim: true,
    default: '' // Permitimos que esté vacío
  },

}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// --- NOTA IMPORTANTE PARA MONGOOSE Y MIXED ---
// Mongoose no detecta automáticamente cambios dentro de objetos "Mixed".
// Si editas el contenido, en tu controlador tendrás que usar card.markModified('content').

module.exports = mongoose.model('Card', CardSchema);