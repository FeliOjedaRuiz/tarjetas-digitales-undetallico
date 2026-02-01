# 🚀 Estado del Despliegue - "Un Detallico"

**Última actualización:** 01/02/2026

## 🌐 Información de Producción (Fly.io)

- **Nombre de la App:** `tarjetas-digitales-undetallico`
- **URL Pública:** [https://tarjetas-digitales-undetallico.fly.dev](https://tarjetas-digitales-undetallico.fly.dev)
- **Región:** `lhr` (London)

## ⚙️ Configuración Actual

### Variables de Entorno y Secretos

Las siguientes variables están configuradas en Fly.io (`fly secrets list`):

- `MONGODB_URI`: Conexión a MongoDB Atlas.
- `JWT_SECRET`: Firma de tokens.
- `CLOUDINARY_NAME`, `KEY`, `SECRET`: Servicio de imágenes.
- `CORS_ORIGIN`: `https://tarjetas-digitales-undetallico.fly.dev`.

### Configuración de Build (Vite)

- **Desarrollo (`.env`):** `VITE_API_URL=http://localhost:8080/api/v1`
- **Producción (`.env.production`):** `VITE_API_URL=/api/v1` (Ruta relativa para Docker).

### Seguridad y CSP (Helmet)

En `api/app.js` se ha configurado CSP para permitir recursos externos:

- **Imágenes:** `res.cloudinary.com`, `images.unsplash.com`.
- **Fuentes:** `fonts.gstatic.com` (Google Fonts).
- **Estilos:** `fonts.googleapis.com`.

## 📝 Historial de Despliegues

### 01/02/2026 - Fix de Producción y CSP

- **Problema:** Fallo de conexión en producción (IP local en build) y bloqueo de imágenes/fuentes por CSP.
- **Solución:**
  1.  Se creó `web/.env.production` con ruta relativa `/api/v1`.
  2.  Se configuró `api/app.js` con Helmet CSP permisivo para Cloudinary y Google Fonts.
  3.  Se desplegó exitosamente en `tarjetas-digitales-undetallico`.

## 🛠️ Cómo Desplegar

1.  Asegúrate de tener sesión iniciada: `fly auth login`.
2.  Ejecuta desde la raíz:
    ```bash
    fly deploy
    ```
