const express = require('express');

const router = express.Router();
// Controllers
const { studentController } = require('../../controllers');

// /* Routing */

/* Car */
router.post('/login', studentController.login);
router.post('/schedule', studentController.schedule);

module.exports = router;
