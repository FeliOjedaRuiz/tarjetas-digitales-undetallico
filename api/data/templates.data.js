module.exports = [
  {
    name: 'Master Template (Todo Incluido)',
    slug: 'master-template',
    description: 'Plantilla base con sistema de diseño avanzado y todos los campos.',
    thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
    categories: ['Master'],
    price: 0,
    isPremium: false,

    defaultStyles: {
      colors: {
        background: '#f3f4f6',  // Un gris muy suave para el fondo web
        card: '#ffffff',        // Blanco puro para la tarjeta
        primary: '#ec4899',     // Un rosa vibrante para botones
        text: '#1f2937'         // Gris oscuro casi negro para leer bien
      },
      fonts: {
        title: 'Playfair Display', // Una fuente con serifa elegante
        body: 'Lato',              // Una sans-serif limpia para leer
        accent: 'Dancing Script'   // Una cursiva manual para firmas
      }
    },

    structure: [
      {
        key: 'coverImage',
        label: 'Foto de Portada (Regalo)',
        type: 'image',
        required: false
      },
      {
        key: 'mainTitle',
        label: 'Título Principal (Hero)',
        type: 'text',
        placeholder: 'Para ti, con todo mi amor',
        required: false
      },
      {
        key: 'message',
        label: 'Dedicatoria',
        type: 'textarea',
        placeholder: 'Mi amor, caminar a tu lado es mi regalo favorito. Gracias por ser mi refugio, mi risa y mi lugar seguro. No necesito que sea San Valentín para decirte que te amo, pero hoy celebro con más fuerza la suerte de tenerte. Eres mi presente y mi futuro.',
        required: false
      },
      {
        key: 'gallery',
        label: 'Galería de Fotos',
        type: 'image_array',
        maxItems: 8,
        required: false
      },
      {
        key: 'musicUrl',
        label: 'Enlace YouTube (Música/Video)',
        type: 'youtube_url',
        required: false
      },
      {
        key: 'showVideo',
        label: '¿Mostrar reproductor de video?',
        type: 'boolean',
        default: true
      },
      {
        key: 'videoCaption',
        label: 'Título del Video',
        type: 'video_caption',
        placeholder: 'Nuestra canción especial',
        required: false
      },
      {
        key: 'finalMessage',
        label: 'Mensaje Final',
        type: 'text',
        placeholder: 'Gracias por ser mi persona favorita',
        required: false
      },
      {
        key: 'finalSubtitle',
        label: 'Subtítulo Final',
        type: 'text',
        placeholder: 'Feliz San Valentín 💕',
        required: false
      }
    ]
  },
  {
    name: 'Corazones Mágicos',
    slug: 'valentine-hearts',
    description: 'Diseño romántico con corazones flotantes y tonos rosa/rojo.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=600&h=800',
    categories: ['San Valentín'],
    price: 0,
    isPremium: false,

    defaultStyles: {
      colors: {
        background: '#fff1f2',
        card: '#ffffff',
        primary: '#E11D48',
        text: '#4c0519'
      },
      fonts: {
        title: 'Dancing Script',
        body: 'Outfit',
        accent: 'Dancing Script'
      }
    },

    structure: [
      {
        key: 'coverImage',
        label: 'Foto de Portada',
        type: 'image',
        required: false
      },
      {
        key: 'mainTitle',
        label: 'Título Principal',
        type: 'text',
        placeholder: 'Porque eres mi persona favorita, quería decirte...',
        required: false
      },
      {
        key: 'message',
        label: 'Tu Mensaje',
        type: 'textarea',
        placeholder: 'Mi amor, caminar a tu lado es mi regalo favorito. Gracias por ser mi refugio, mi risa y mi lugar seguro. No necesito que sea San Valentín para decirte que te amo, pero hoy celebro con más fuerza la suerte de tenerte. Eres mi presente y mi futuro.',
        required: false
      },
      {
        key: 'gallery',
        label: 'Galería de Momentos',
        type: 'image_array',
        maxItems: 8,
        required: false
      },
      {
        key: 'musicUrl',
        label: 'Enlace YouTube (Música/Video)',
        type: 'youtube_url',
        required: false
      },
      {
        key: 'showVideo',
        label: '¿Mostrar reproductor de video?',
        type: 'boolean',
        default: true
      },
      {
        key: 'videoCaption',
        label: 'Título del Video',
        type: 'video_caption',
        placeholder: 'Nuestra canción favorita',
        required: false
      },
      {
        key: 'finalMessage',
        label: 'Mensaje Final',
        type: 'text',
        placeholder: 'Queria desearte: ¡Feliz San Valentín ❤️!',
        required: false
      }
    ]
  },
  {
    name: 'Primavera de Amor',
    slug: 'valentine-spring-flowers',
    description: 'Diseño elegante con motivos florales en acuarela y tipografía dorada.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523308458373-c6f61ae1fd21?auto=format&fit=crop&q=80&w=600&h=800', // TODO: Reemplazar con captura real
    categories: ['San Valentín'],
    price: 0,
    isPremium: false,

    defaultStyles: {
      colors: {
        background: '#FFF0F5',
        card: '#FFFFFF',
        primary: '#D4AF37', // Dorado
        text: '#4A4A4A'
      },
      fonts: {
        title: 'Playfair Display',
        body: 'Lato',
        accent: 'Dancing Script'
      }
    },

    structure: [
      // NOTA: No incluimos 'coverImage' para que sea fija según el diseño
      {
        key: 'mainTitle',
        label: 'Título Principal',
        type: 'text',
        placeholder: 'Nuestro amor florece cada día',
        required: true
      },
      {
        key: 'message',
        label: 'Dedicatoria',
        type: 'textarea',
        placeholder: 'Eres como la primavera: llenas de luz, color y vida todo lo que tocas. Gracias por dejarme crecer a tu lado.',
        required: true
      },
      {
        key: 'gallery',
        label: 'Nuestros Recuerdos',
        type: 'image_array',
        maxItems: 8,
        required: false
      },
      {
        key: 'musicUrl',
        label: 'Canción Especial (YouTube)',
        type: 'youtube_url',
        required: false
      },
      {
        key: 'showVideo',
        label: '¿Mostrar video?',
        type: 'boolean',
        default: true
      },
      {
        key: 'videoCaption',
        label: 'Título del Video',
        type: 'video_caption',
        placeholder: 'Nuestra canción',
        required: false
      },
      {
        key: 'finalMessage',
        label: 'Despedida',
        type: 'text',
        placeholder: 'Te amo infinitamente',
        required: false
      }
    ]
  }
];