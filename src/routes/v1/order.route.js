const express = require('express');

const router = express.Router();
// Controllers
const { orderController } = require('../../controllers');

// /* Routing */
router.post('/order/create', orderController.createOrder);
router.post('/order/delete', orderController.deleteOrder);
router.post('/order/update', orderController.updateOrder);
router.get('/order/:id', orderController.listOrder);

module.exports = router;
