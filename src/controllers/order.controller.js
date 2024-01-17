/* eslint-disable camelcase */
/* eslint-disable no-shadow */
const { check } = require('prettier');
const catchAsync = require('../helpers/catchAsync');
const userService = require('../services/user.service');
const orderService = require('../services/order.service');
const orderDetailService = require('../services/order_detail.service');

const example = {
  user_id: '',
  status: '',
  total_amount: '',
  date: '',
  order_detail: [
    {
      product_id: '',
      quantity: '',
      into_money: '',
    },
    {
      product_id: '',
      quantity: '',
      into_money: '',
    },
    {
      product_id: '',
      quantity: '',
      into_money: '',
    },
  ],
};
const listOrder = catchAsync(async (req, res) => {
  const id = req.params.id;
  const checkUser = await userService.getUserById(id);
  const checkOrder = await orderService.getAllOrderdById(checkUser.id);
  const orderDetails = [];
  for (let i = 0; i < checkOrder.length; i++) {
    const orderDetail = await orderDetailService.getOrderDetail(checkOrder[i].id);
    console.log(orderDetail);
    const orderDetailData = [];
    for (let j = 0; j < orderDetail.length; j++) {
      const result = orderDetailService.makeOrderDetailDTO(orderDetail[j]);
      orderDetailData.push(result);
    }
    const makeDetailData = {
      order_id: checkOrder[i].id,
      user_id: checkOrder[i].user_id,
      status: checkOrder[i].status,
      total_amount: checkOrder[i].total_amount,
      details: orderDetailData
    }
    orderDetails.push(makeDetailData);
  }
  if (!checkOrder) {
    return res.status(500).send({ message: 'Order not existed!' });
  }
  res.status(200).send(orderDetails);
})

const createOrder = catchAsync(async (req, res) => {
  const result = await orderService.createOrder(req.body);
  res.status(200).send(result);
});

const deleteOrder = catchAsync(async (req, res) => {
  const { id } = req.body;
  const checkOrder = await orderService.getIdByOrder(id);
  if (!checkOrder) {
    return res.status(500).send({ message: 'Order not existed!' });
  }
  await checkOrder.destroy();
  res.status(200).send({ message: "Create order successfully!" });
});

const updateOrder = catchAsync(async (req, res) => {
  const { id } = req.body;
  const checkOrder = await orderService.getIdByOrder(id);
  if (!checkOrder) {
    return res.status(500).send({ message: 'Order not existed!' });
  }
  checkOrder.total_amount = req.body.total_amount || checkOrder.total_amount;
  checkOrder.status = req.body.status || checkOrder.status;
  checkOrder.user_id = req.body.user_id || checkOrder.user_id;
  checkOrder.save();
  return res.status(200).json({ message: 'Order updated successfully' });
})
module.exports = {
  createOrder,
  deleteOrder,
  updateOrder,
  listOrder
};
