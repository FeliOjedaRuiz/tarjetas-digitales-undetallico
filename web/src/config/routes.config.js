const express = require('express');
const router = express.Router();

const users = require('../controllers/users.controllers');

const secure = require('../middlewares/secure.mid');
const usersMid = require('../middlewares/users.mid');

// const fileUploader = require('../config/cloudinary.config');

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

// // PHOTOS
// router.post(
// 	'/upload',
// 	secure.isAdmin,
// 	fileUploader.single('photoUrl'),
// 	photos.upload
// );

module.exports = router;




