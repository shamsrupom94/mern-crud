const express = require('express');
const router = express.Router();
const UserController = require('../../user');
const Authenticator = require('../middleware/authenticator');

router.get('/', Authenticator.requiresLogin, UserController.getUserList);
router.get('/:id', Authenticator.requiresLogin, UserController.getCurrentUser)
router.post('/sign-up', UserController.signUp);
router.post('/login', UserController.login);
router.post('/logout', Authenticator.requiresLogin, UserController.logout);

module.exports = router;