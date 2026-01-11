# 🗺️ Roadmap de Desarrollo: Plataforma de Tarjetas Digitales
**Stack:** MERN (MongoDB, Express, React, Node.js) + Vite + Tailwind

Este documento detalla el plan de acción paso a paso para construir la arquitectura escalable basada en "Templates" (Base de datos) y "Design Mapper" (Frontend).

---

## 📂 Fase 0: Arquitectura y Configuración Inicial
**Objetivo:** Preparar el entorno de desarrollo y la estructura de carpetas correcta para la escalabilidad.

- [ ] **Inicializar Repositorio:** `git init`, crear `.gitignore` (ignorar `node_modules`, `.env`).
- [ ] **Estructura de Carpetas Backend:**
    - `src/models/` (Esquemas de BD)
    - `src/controllers/` (Lógica)
    - `src/routes/` (Endpoints)
    - `src/scripts/` (Para scripts de mantenimiento/seeds)
- [ ] **Estructura de Carpetas Frontend:**
    - `src/components/templates/` (Aquí vivirán los diseños visuales)
    - `src/utils/` (Aquí irá el `mapper.js`)
    - `src/hooks/` (Custom hooks para fetch de datos)
- [ ] **Instalación de Dependencias Base:**
    - **Backend:** `express`, `mongoose`, `cors`, `dotenv`, `nodemon`.
    - **Frontend:** `vite`, `react-router-dom`, `axios`, `tailwindcss`.

---

## 🛠 Fase 1: Backend - El Cimiento (API & Datos)
**Objetivo:** Lograr que los datos fluyan correctamente antes de tocar la interfaz visual.

### 1.1. Modelado de Datos (Mongoose Schemas)
Definir la estructura en `src/models/`.

- [ ] **User Model (`User.js`):** Datos básicos, email, password (hash), rol.
- [ ] **Template Model (`Template.js`):**
    - `slug`: String único (ID para el Frontend Mapper).
    - `structure`: Array de objetos (Define los campos del formulario: type, label, key).
    - `isPremium`: Boolean.
- [ ] **Card Model (`Card.js`):**
    - Referencias: `userId` y `templateId`.
    - `urlSlug`: La url pública (ej: "juan-perez").
    - `content`: Tipo `Map` o `Mixed` (Donde se guardan los datos variables).

### 1.2. Semilla de Datos (Seed Script)
Poblar la base de datos con los primeros diseños sin necesidad de crear un panel de administrador todavía.

- [ ] Crear `src/scripts/seedTemplates.js`.
- [ ] Definir array con 2 templates de prueba (ej: "Minimal V1" y "Gold Premium").
- [ ] Programar la lógica para limpiar la colección `templates` e insertar los nuevos.
- [ ] Ejecutar `node src/scripts/seedTemplates.js` y verificar en MongoDB Compass.

### 1.3. API Endpoints
Crear las rutas en `src/routes/` y controladores en `src/controllers/`.

- [ ] **Auth:** `POST /register`, `POST /login`.
- [ ] **Templates:** - `GET /api/templates` (Listado para el selector).
    - `GET /api/templates/:slug` (Detalle para cargar config del formulario).
- [ ] **Cards (Privado):** `POST /api/cards` (Crear), `GET /api/cards` (Listar mis tarjetas).
- [ ] **Public View (CRÍTICO):** - `GET /api/public/cards/:urlSlug`.
    - **Requisito:** Debe usar `.populate('templateId')` para devolver qué diseño usar.

---

## 🎨 Fase 2: Frontend - Motor de Renderizado
**Objetivo:** Crear el sistema que "traduce" datos de la BD en componentes visuales de React.

### 2.1. Diseños Base (Componentes)
- [ ] Crear `src/components/templates/MinimalTemplate.jsx`.
- [ ] Crear `src/components/templates/GoldTemplate.jsx`.
- [ ] **Requisito:** Ambos deben recibir `data` por props y renderizarla.

### 2.2. El Mapper (Registry Pattern)
- [ ] Crear `src/utils/designMapper.js`.
- [ ] Importar los componentes y exportar el objeto:
  ```javascript
  export const DESIGN_MAPPER = {
    'minimal-v1': MinimalTemplate,
    'gold-premium': GoldTemplate
  };