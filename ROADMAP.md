# 🗺️ Roadmap V2: Consolidación y Experiencia de Usuario
**Estado Actual:** Creación básica y Visualización funcional.
**Objetivo:** Centralizar la arquitectura, gestionar usuarios (Dashboard) y habilitar contenido multimedia.

---

## 🧹 Fase 1: Refactorización y Arquitectura (Inmediato)
**Objetivo:** Eliminar código duplicado y preparar el terreno para nuevas plantillas.

### 1.1. Centralización del Mapper (Design Pattern)
- [ ] Crear `src/utils/designMapper.js`.
- [ ] Exportar objeto `DESIGN_MAPPER` que vincule `slugs` con `Componentes`.
- [ ] Refactorizar `CreateCardPage.jsx` para usar el mapper importado.
- [ ] Refactorizar `CardViewerPage.jsx` para usar el mapper importado.

---

## 🖼️ Fase 2: Gestión Multimedia (Imágenes)
**Objetivo:** Permitir que los usuarios suban sus propias fotos en las tarjetas.

### 2.1. Backend Uploads
- [x] Controlador `upload.controller.js` (Ya existente).
- [ ] Verificar ruta `POST /api/upload` en `routes/upload.routes.js`.
- [ ] Configurar Middleware Multer (Cloudinary o Local) correctamente.

### 2.2. Frontend Integration
- [x] Crear componente `ImageUploadField.jsx`.
- [x] Integrarlo en `DynamicForm` cuando el tipo de campo sea `image`.
- [x] Conectar con el endpoint y guardar la URL retornada en el `form state`.

---

## 👤 Fase 3: Dashboard de Usuario
**Objetivo:** Que el usuario pueda ver, editar y eliminar sus tarjetas creadas.

### 3.1. Vista de Listado (Dashboard)
- [x] Crear `src/pages/DashboardPage.jsx`.
- [x] Consumir endpoint `GET /api/cards` (Cards del usuario logueado).
- [x] Mostrar tarjetas en una grilla/lista con acciones (Ver, Editar, Eliminar).

### 3.2. Acciones
- [ ] **Eliminar:** Botón con confirmación -> `DELETE /api/cards/:id`.
- [ ] **Editar:** Botón que redirija a `/edit/:id`.

---

## ✏️ Fase 4: Edición de Tarjetas
**Objetivo:** Reutilizar la lógica de creación para modificar tarjetas existentes.

### 4.1. Adaptar CreateCardPage
- [ ] Modificar `CreateCardPage` para aceptar un `id` opcional (modo edición).
- [ ] Si hay ID, hacer fetch de la tarjeta y pre-llenar el `form` y `selectedTemplate`.
- [ ] Cambiar el botón de "Finalizar" a "Guardar Cambios" (`PUT` en lugar de `POST`).

---

## 🚀 Fase 5: Polish & Deploy
- [ ] **Feedback UI:** Añadir "Toasts" (Notificaciones flotantes) para éxito/error.
- [ ] **Loading States:** Mejorar los spinners de carga.
- [ ] **Deploy:** Configurar variables de entorno para producción (Vercel/Render).
- [ ] **Mantenimiento:** Script (Cron Job) para eliminar imágenes huérfanas de Cloudinary.