const express = require('express');

const router = express.Router();
// Controllers
const { userController } = require('../../controllers');

// /* Routing */

/* Car */
router.post('/user/login', userController.login);
router.post('/user/register', userController.register);
router.post('/user/delete', userController.deleteUserById);
router.post('/user/update', userController.updateUserById);
router.get('/user/:id', userController.getUserById);

module.exports = router;
