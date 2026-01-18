# 🎨 Guía de Creación de Nuevos Templates

Esta guía documenta el proceso completo para añadir un nuevo diseño de tarjeta a la plataforma "Un Detallico". El proceso requiere cambios tanto en el Backend (definición de datos y estructura) como en el Frontend (componente visual y mapeo).

---

## 📋 Resumen del Proceso
1.  **Backend:** Definir la metadata, estilos por defecto y estructura del formulario en `templates.data.js`.
2.  **Frontend:** Crear el componente visual React en `src/components/templates/`.
3.  **Frontend:** Registrar el componente en el `designMapper.js`.
4.  **Base de Datos:** Ejecutar el seed para cargar el nuevo template.

---

## 🛠️ Paso 1: Definición de Datos (Backend)

El primer paso es decirle a la base de datos que existe un nuevo diseño y qué campos necesita que el usuario rellene.

**Archivo:** `api/data/templates.data.js`

Añade un nuevo objeto al array exportado. Asegúrate de que el `slug` sea único.

```javascript
{
  name: 'Nombre del Diseño',
  slug: 'nombre-unico-del-diseno', // ID único para vincular con el frontend
  description: 'Descripción corta para el selector.',
  thumbnailUrl: 'URL_DE_IMAGEN_PREVIA', // Sube una captura a Cloudinary
  categories: ['Cumpleaños', 'Amor'], // Deben coincidir con categories.config.js
  price: 0,
  isPremium: false,

  // Estilos base que se pasarán al componente (opcional, pero recomendado)
  defaultStyles: {
    colors: {
      background: '#ffffff',
      primary: '#ff0000',
      text: '#000000'
    },
    fonts: {
      title: 'Playfair Display',
      body: 'Lato'
    }
  },

  // ⚠️ IMPORTANTE: Esto define el formulario que verá el usuario
  structure: [
    {
      key: 'mainTitle',       // Nombre de la variable en el JSON de contenido
      label: 'Título',        // Label del input
      type: 'text',           // text, textarea, image, image_array, youtube_url, boolean
      placeholder: 'Feliz día',
      required: true
    },
    {
      key: 'coverPhoto',
      label: 'Foto de Portada',
      type: 'image'
    },
    // ... más campos
  ]
}
```

---

## 🎨 Paso 2: Crear Componente Visual (Frontend)

Ahora debes crear el componente React que renderizará la tarjeta. Este componente recibirá los datos que el usuario rellenó en el formulario definido arriba.

**Ubicación:** `web/src/components/templates/`
**Convención:** `[Nombre]Template.jsx` (ej: `BirthdayBalloonsTemplate.jsx`)

```jsx
import React from 'react';

// El componente recibe la prop 'card' completa
const BirthdayBalloonsTemplate = ({ card }) => {
  // 1. Extraer el contenido (lo que rellenó el usuario)
  const { content } = card;
  
  // 2. Extraer estilos (definidos en el template data)
  const styles = card.templateId?.defaultStyles || {};

  return (
    <div 
      className="min-h-screen w-full overflow-x-hidden"
      style={{ backgroundColor: styles.colors?.background }}
    >
      {/* Ejemplo de uso de campo de texto */}
      <h1 
        className="text-4xl font-bold text-center mt-10"
        style={{ fontFamily: styles.fonts?.title, color: styles.colors?.text }}
      >
        {content.mainTitle || 'Título por defecto'}
      </h1>

      {/* Ejemplo de uso de imagen */}
      {content.coverPhoto && (
        <img 
          src={content.coverPhoto} 
          alt="Portada" 
          className="w-full h-64 object-cover mt-4"
        />
      )}

      {/* Ejemplo de uso de array de imágenes (Galería) */}
      {content.gallery?.length > 0 && (
        <div className="grid grid-cols-2 gap-2 p-4">
          {content.gallery.map((img, idx) => (
            <img key={idx} src={img} className="rounded-lg" />
          ))}
        </div>
      )}
    </div>
  );
};

export default BirthdayBalloonsTemplate;
```

---

## 🔗 Paso 3: Registrar en el Mapper (Frontend)

Para que la aplicación sepa qué componente pintar cuando la API devuelve el slug `nombre-unico-del-diseno`, hay que vincularlos.

**Archivo:** `web/src/utils/designMapper.js`

```javascript
// 1. Importar tu nuevo componente
import MasterTemplate from '../components/templates/MasterTemplate';
import ValentineHeartsTemplate from '../components/templates/ValentineHeartsTemplate';
import BirthdayBalloonsTemplate from '../components/templates/BirthdayBalloonsTemplate'; // <-- TU NUEVO IMPORT

// 2. Añadirlo al objeto de mapeo
const DESIGN_MAPPER = {
  'master-template': MasterTemplate,
  'valentine-hearts': ValentineHeartsTemplate,
  'nombre-unico-del-diseno': BirthdayBalloonsTemplate, // <-- VINCULACIÓN (Slug: Componente)
};

export const getTemplateComponent = (slug) => {
  return DESIGN_MAPPER[slug] || MasterTemplate; // Fallback al Master si no existe
};
```

---

## 🌱 Paso 4: Actualizar Base de Datos (Seed)

Finalmente, hay que insertar la definición del template en MongoDB.

1.  Abre una terminal en la carpeta `api`.
2.  Ejecuta el comando de seed (asegúrate de tener el script configurado en package.json o ejecútalo con node):

```bash
# Ejemplo si tienes el script en package.json
npm run seed:templates

# O directamente con node
node seeds/templates.seed.js
```

---

## ✅ Checklist de Verificación

1.  [ ] **Backend:** El objeto en `templates.data.js` tiene un `slug` único.
2.  [ ] **Backend:** Los campos en `structure` tienen las `keys` correctas.
3.  [ ] **Frontend:** El componente existe en `src/components/templates/`.
4.  [ ] **Frontend:** El componente usa `card.content.[key]` coincidiendo con el backend.
5.  [ ] **Frontend:** El `designMapper.js` importa y asigna el componente al slug correcto.
6.  [ ] **DB:** Se ha ejecutado el seed sin errores.
7.  [ ] **Test:** En `/create`, al seleccionar el nuevo diseño, aparecen los campos correctos y la previsualización funciona.