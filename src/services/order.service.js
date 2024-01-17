/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */

const db = require('../models');
const logger = require('../config/logger');
const ApiError = require('../helpers/ApiError');
const orderDetailService = require('./order_detail.service');
const { or } = require('sequelize');

// Import Model
const { Order, Order_Detail } = db;

/**
 * Create order
 * @param {object} orderData
 * @returns {Promise<Order>}
 */
const createOrder = async (userData) => {
  const orderData = {
    total_amount: userData.total_amount,
    status: userData.status,
    user_id: userData.user_id,
  };
  const createOrder = await Order.create(orderData);
  console.log(userData, 'User Data');
  const orderDetail = [];
  if (createOrder) {
    for (let i = 0; i < userData.order_detail.length; i++) {
      const orderDetailData = {
        order_id: createOrder.id,
        product_id: userData.order_detail[i].product_id,
        quantity: userData.order_detail[i].quantity,
        into_money: userData.order_detail[i].into_money,
        date: userData.date,
      };
      orderDetail.push(orderDetailData);
      await orderDetailService.createOrderDetail(orderDetailData);
    }
  }
  const resultData = makeOrderDTO(orderData, createOrder.id, orderDetail);
  return resultData;
};

/**
 * Make data from order
 * @param {object} orderData
 * @returns {Promise<Order>}
 */
const makeOrderDTO = (orderData, id, orderDetail) => {
  return (dataOrder = {
    id,
    user_id: orderData.user_id,
    status: orderData.status,
    total_amount: orderData.total_amount,
    date: orderData.date,
    orderDetail: orderDetail,
  });
};

/**
 * Get order by id
 * @param {integer} id
 * @returns {Promise<Order>}
 */

const getIdByOrder = (id) => {
  return (orderData = Order.findOne({
    where: {
      id,
    },
  }));
};

/**
 * Get order by user_id
 * @param {integer} id
 * @returns {Promise<Order>}
 */

const getAllOrderdById = (id) => {
  return (orderData = Order.findAll({
    where: {
      user_id: parseInt(id),
    },
  }));
};

const getOrderByUser = (id) => {
  return (orderData = Order.findAll({
    where: {
      id,
    },
  }));
};

/**
 * Delete data from order
 * @param {integer} id
 * @returns {Promise<Order>}
 */

const deleteOrderById = (id) => {
  console.log(id);
  return Order.destroy({
    where: {
      id,
    },
  });
};

/**
 * Updae data from order
 * @param {integer} id
 * @returns {Promise<Order>}
 */

const updateOrderById = () => {};

module.exports = {
  createOrder,
  deleteOrderById,
  updateOrderById,
  getIdByOrder,
  getAllOrderdById,
};
