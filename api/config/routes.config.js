const express = require('express');
const router = express.Router();

const users = require('../controllers/users.controllers');
const templates = require('../controllers/templates.controllers');
const cards = require('../controllers/cards.controllers');
const upload = require('../controllers/upload.controller.js');

const secure = require('../middlewares/secure.mid');
const usersMid = require('../middlewares/users.mid');
const cardsMid = require('../middlewares/cards.mid');

const fileUploader = require('../config/cloudinary.config');

// USERS
router.post('/users', users.create);
router.post('/login', users.login);
router.post(
	'/sendRestoreEmail/:email',
	usersMid.exists,
	users.sendRestoreEmail
);
router.post(
	'/restorepassword/:userId',
	usersMid.checkUser,
	users.restorePassword
);
router.get('/users/:userId', secure.auth, secure.isAuthorized, users.detail);
router.patch(
	'/users/:userId',
	secure.isAdmin,
	usersMid.clientExists,
	users.update
);
router.get('/users', secure.isAdmin, users.list);

// --- TEMPLATES ---
// Públicas: Cualquiera puede ver qué diseños hay disponibles
router.get('/templates', templates.list);
router.get('/templates/:id', templates.detail);

// CARDS

// 1. RUTAS PÚBLICAS (Para que cualquiera vea la tarjeta con el slug)
router.get('/cards/profile/:slug', cards.getBySlug);
// 2. RUTAS PRIVADAS (Requieren login)
router.post('/cards', secure.auth, secure.isAdmin, cardsMid.validateTemplateStructure, cards.create);
router.get('/cards', secure.auth, secure.isAdmin, cards.list);
router.get('/cards/:id', secure.auth, cards.detail);
// router.patch('/cards/:id', secure.auth, cardsMid.isOwner, cards.update);
router.delete('/cards/:id', secure.auth, cards.delete);

// UPLOADS
router.post(
  '/upload', 
  secure.auth,
  fileUploader.single('file'),
  upload.upload
);

module.exports = router;




