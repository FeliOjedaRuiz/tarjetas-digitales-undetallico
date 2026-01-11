require('dotenv').config();
const mongoose = require('mongoose');
const Template = require('../models/template.model');

const templatesData = require('../data/templates.data');

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => console.info(`🔌 Conectado a la BD. Iniciando actualización de plantillas...`))
  .catch((error) => console.error('❌ Error conectando a la base de datos:', error));

const seed = async () => {
  try {
    
    for (const template of templatesData) {
      
      const updatedTemplate = await Template.findOneAndUpdate(
        { slug: template.slug },
        template,
        { 
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
          runValidators: true
        }
      );
      
      console.log(`✅ Procesada: ${updatedTemplate.name} (ID: ${updatedTemplate._id})`);
    }

    console.log('🎉 Proceso terminado. Tus tarjetas están a salvo.');
    mongoose.disconnect();

  } catch (error) {
    console.error('❌ Error en el proceso de seed:', error);
    mongoose.disconnect();
  }
};

seed();