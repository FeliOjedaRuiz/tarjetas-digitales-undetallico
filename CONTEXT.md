📝 Contexto del Proyecto: "Un Detallico"
Parte 1: Objetivo y Funcionalidades
Objetivo: Plataforma SaaS para crear y enviar tarjetas de regalo digitales personalizadas. Los usuarios (Admins) crean tarjetas basadas en plantillas y comparten un enlace único con el destinatario.

Funcionalidades principales:

Gestión de Plantillas (Templates): Catálogo de diseños base con estilos (colores/fuentes) y estructuras de datos predefinidas.

Creador de Tarjetas (Admin Panel): * Filtro de plantillas por categorías dinámicas.

Formulario dinámico que cambia según la "estructura" de la plantilla elegida.

Previsualización en tiempo real (WYSIWYG) que renderiza el componente final exacto dentro de un "frame" de smartphone.

Visualización Pública: Ruta /ver/:slug donde el destinatario ve su tarjeta con animaciones y contenido multimedia (fotos, galerías, videos de YouTube, música de Spotify).

Generación de Slugs: URLs amigables y únicas basadas en el destinatario.

Parte 2: Arquitectura y Especificaciones Técnicas
🏗️ Arquitectura del Sistema
Stack: MERN (MongoDB, Express, React, Node.js).

Frontend: React con Vite y Tailwind CSS.

Backend: API REST con Node.js/Express, autenticación JWT e integración con Cloudinary para gestión de imágenes.

⚙️ Lógica Técnica Clave
Estructura Dinámica (Data Driven UI):

Cada Template en la BD tiene un campo structure (array de objetos).

El frontend itera este array para renderizar el DynamicForm. Los campos definen su key, label, type (text, textarea, image, image_array, spotify_url, youtube_url).

Mapeo de Componentes (Pattern Strategy):

Las plantillas visuales viven en src/components/templates/.

Se utiliza un objeto literal (TEMPLATE_COMPONENTS) para mapear el slug de la base de datos con el componente React correspondiente.

Gestión de Categorías:

Las categorías para filtrar plantillas se gestionan mediante un archivo de configuración centralizado (categories.config.js), permitiendo un filtrado rápido mediante query parameters (?category=...) en la API.

Servicios y API:

Cliente de Axios configurado en base-api.js con interceptores de respuesta para limpiar el objeto data y manejar errores de sesión (401).

Servicio de fotos centralizado que gestiona la subida de FormData a Cloudinary.

📂 Estructura de Datos Prevista
Card: Contiene el recipient, el urlSlug y un objeto content. Este objeto content es un JSON flexible cuyas llaves coinciden con las keys definidas en la structure de la plantilla.

"Dentro del catálogo, hemos definido un 'Master Template' (slug: master-template). Este componente es la referencia técnica del proyecto, ya que está diseñado para soportar y renderizar todas las opciones de personalización disponibles en el sistema: textos simples, dedicatorias largas, selectores de color, subida de imagen de portada, galerías múltiples y embebidos de video/audio. Su objetivo es doble: servir como la opción más completa para el usuario y como entorno de pruebas para asegurar que cualquier nuevo tipo de campo añadido a la structure se comporte correctamente en el DynamicForm y en la vista final."