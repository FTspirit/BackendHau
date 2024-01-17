const express = require('express');
const userRoute = require('./user.route');
const orderRoute = require('./order.route');
const roleRoute = require('./role.route');
const orderDetail = require('./order_detail.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/app',
    route: userRoute,
  },
  {
    path: '/app',
    route: orderRoute,
  },
  {
    path: '/app',
    route: roleRoute,
  },
  {
    path: '/app',
    route: orderDetail,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
