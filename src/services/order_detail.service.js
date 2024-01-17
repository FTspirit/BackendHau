/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */

const db = require('../models');
const logger = require('../config/logger');
const ApiError = require('../helpers/ApiError');

// Import Model
const { Order_Detail } = db;

/**
 * Get order detail
 * @param {int} id
 * @returns {Promise<Order_Detail>}
 */
const getOrderDetail = (id) => {
  return Order_Detail.findAll({
    where: {
      order_id: id,
    }
  })
};

/**
 * Create order detail
 * @param {object} orderDetailData
 * @returns {Promise<Order_Detail>}
 */
const createOrderDetail = (orderDetailData) => {
  return Order_Detail.create({
    order_id: orderDetailData.order_id,
    product_id: orderDetailData.product_id,
    quantity: orderDetailData.quantity,
    into_money: orderDetailData.into_money,
    date: orderDetailData.date,
  })
};

/**
 * Make data from order
 * @param {integer} id
 * @returns {Promise<Order>}
 */

const makeOrderDetailDTO = (orderDetailData) => {
  return detailOrder = {
    product_id: orderDetailData.product_id,
    quantity: orderDetailData.quantity,
    into_money: orderDetailData.into_money,
    date: orderDetailData.date
  }
}
module.exports = {
  getOrderDetail,
  makeOrderDetailDTO,
  createOrderDetail
};