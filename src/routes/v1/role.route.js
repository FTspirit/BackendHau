const express = require('express');

const router = express.Router();
// Controllers
const { roleController } = require('../../controllers');

// /* Routing */
router.post('/role/create', roleController.createRole);
router.get('/role/list', roleController.listRole);
router.post('/role/delete', roleController.deleteRole);
router.post('/role/update', roleController.updateRole);

module.exports = router;
