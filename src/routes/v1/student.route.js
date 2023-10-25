const express = require('express');

const router = express.Router();
// Controllers
const { studentController } = require('../../controllers');

// /* Routing */

/* Car */
router.post('/login', studentController.login);
router.post('/loginV2', studentController.loginV2);
router.post('/loginV3', studentController.loginV3);
router.post('/schedule', studentController.schedule);

module.exports = router;
