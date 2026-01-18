# 🗺️ Plan de Implementación: "Un Detallico" v1.0 (Production Ready)

#### 🛡️ Fase 1: Seguridad y Robustez (Backend)
*Prioridad Alta - Protege la aplicación de ataques básicos y datos maliciosos.*

1.  **Implementar Rate Limiting:**
    *   Instalar `express-rate-limit`.
    *   Configurar un límite general para la API (ej: 100 peticiones/15min).
    *   Configurar un límite estricto para `/api/cards` (creación) y `/api/upload` (subidas) para evitar spam.
2.  **Sanitización de Datos:**
    *   Instalar `express-mongo-sanitize` para prevenir inyección NoSQL.
    *   Instalar `xss-clean` o similar para limpiar los inputs de texto (evitar scripts en los mensajes de las tarjetas).
3.  **Headers de Seguridad:**
    *   Instalar `helmet` para configurar headers HTTP seguros automáticamente.

#### ⚡ Fase 2: Rendimiento y Escalabilidad (Dashboard)
*Prioridad Media/Alta - Evita que el dashboard colapse cuando tengas muchos usuarios.*

1.  **Backend: Paginación en API:**
    *   Modificar el endpoint `GET /api/cards` en el controlador.
    *   Aceptar parámetros `page` y `limit` (ej: `?page=1&limit=9`).
    *   Devolver estructura paginada: `{ data: [...], total, page, pages }`.
2.  **Frontend: Lógica de Paginación:**
    *   Actualizar `cardsService.js` para enviar los parámetros.
    *   Actualizar `DashboardPage.jsx` para gestionar el estado de la página actual.
    *   Añadir botones de "Anterior" y "Siguiente" en la interfaz.

#### 🎨 Fase 3: Experiencia de Usuario (UX Polish)
*Prioridad Media - Hace que la app se sienta profesional.*

1.  **Sistema de Notificaciones (Toasts):**
    *   Instalar `sonner` (librería ligera y bonita para React).
    *   Crear un componente o hook global para las notificaciones.
    *   Reemplazar todos los `alert("Guardado")` por `toast.success("Guardado")`.
    *   Reemplazar todos los `alert("Error")` por `toast.error("Error")`.
2.  **Modales de Confirmación:**
    *   Crear un componente `ConfirmModal.jsx` reutilizable.
    *   Reemplazar `window.confirm()` en el Dashboard (al borrar) y en el Creador (al salir).
3.  **Skeletons de Carga:**
    *   Crear un componente `CardSkeleton.jsx` (rectángulo gris animado).
    *   Mostrarlo en el Dashboard mientras `loading` es true, en lugar del texto plano.

#### 🧹 Fase 4: Mantenimiento y Optimización
*Prioridad Baja - Ahorro de costes y limpieza a largo plazo.*

1.  **Optimización de Imágenes (Cloudinary):**
    *   Crear un helper `getOptimizedImageUrl(url, width)` en el frontend.
    *   Usar este helper en `DashboardPage` (thumbnails pequeños) y en los Templates (imágenes ajustadas al dispositivo).
2.  **Cron Job de Limpieza:**
    *   Crear un script en el backend que busque imágenes en Cloudinary subidas hace >24h que no estén referenciadas en ninguna `Card` de la base de datos y las borre.