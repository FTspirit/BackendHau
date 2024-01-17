
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
const catchAsync = require('../helpers/catchAsync');
const orderService = require('../services/order.service');

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

const createOrder = catchAsync(async (req, res) => {
    const result = await orderService.createOrder(req.body);
    res.status(200).send(result);
});

const deleteOrder = catchAsync(async (req, res) => {
    const { id } = req.body;
    const checkOrder = await orderService.getIdByOrder(id);
    if (!checkOrder) {
        return res.status(500).send({ message: 'Internal server error!' });
    }
    await orderService.deleteOrderById(checkOrder.id);
    res.status(200).send({ message: "Create order successfully!" });
});

const updateOrder = catchAsync(async (req, res) => {

})
module.exports = {
    createOrder,
    deleteOrder,
    updateOrder
};
