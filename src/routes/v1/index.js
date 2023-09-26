const express = require('express');
const studentRoute = require('./student.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/api',
    route: studentRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
