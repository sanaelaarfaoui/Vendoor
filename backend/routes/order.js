const express = require('express');

const Order = require('../models/order');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();


router.post("", checkAuth, (req, res, next) => {
  const order = new Order({
    userId: req.body.userId,
    address: req.body.address,
    tel: req.body.tel,
    fullname: req.body.fullname,
    products: req.body.products,
    qte: req.body.qte,
    money: req.body.money,
    done: false
  });
  //return  res.status(201).json({});
  order.save().then(createdOrder => {
    res.status(201).json({
      message: 'Order Added successfully',
      orderId: createdOrder._id
    });
  });
});

router.get("", (req, res, next) => {
  Order.find().then(ordrs => {
    res.status(200).json({
      message: 'Orders fetched successfully',
      orders: ordrs
    });
  });
});

module.exports = router;
