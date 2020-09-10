const express = require('express');
const router = express.Router();
const TaskController = require('../../task');
const Authenticator = require('../middleware/authenticator');

router.get('/', TaskController.getAllTasks);
router.get('/user', Authenticator.requiresLogin, TaskController.getTaskByUser);
router.post('/create', Authenticator.requiresLogin, TaskController.createTask);

module.exports = router;