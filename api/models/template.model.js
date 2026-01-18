const mongoose = require('mongoose');

const FieldConfigSchema = new mongoose.Schema({
  key: { type: String, required: true },
  label: { type: String, required: true },
  type: {
    type: String,
    enum: [
      'text', 'textarea', 'image', 'image_array',
      'youtube_url', 'spotify_url', 'video_file', 'video_caption'
    ],
    required: true
  },
  required: { type: Boolean, default: false },
  placeholder: { type: String },
  helpText: { type: String },
  maxItems: { type: Number }
}, { _id: false });

const TemplateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  thumbnailUrl: { type: String },

  categories: {
    type: [String],
    index: true,
    default: ['Otros']
  },

  price: {
    type: Number,
    default: 0,
    min: 0
  },

  isPremium: { type: Boolean, default: false },
  structure: [FieldConfigSchema],

  defaultStyles: {
    colors: {
      background: { type: String, default: '#ffffff' }, // Fondo de la página
      card: { type: String, default: '#ffffff' },       // Fondo del contenedor del mensaje
      primary: { type: String, default: '#000000' },    // Botones o bordes
      text: { type: String, default: '#333333' }        // Color de la letra
    },
    fonts: {
      title: { type: String, default: 'serif' },        // Para H1, H2
      body: { type: String, default: 'sans-serif' },    // Para párrafos
      accent: { type: String, default: 'cursive' }      // Para firmas o detalles
    }
  }
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

module.exports = mongoose.model('Template', TemplateSchema);