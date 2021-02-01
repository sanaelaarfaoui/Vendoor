const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ShoppingCart = require('../models/shoppingCart');
const Products = require('../models/product');

const shoppingCartRouter = express.Router();

shoppingCartRouter.use(bodyParser.json());

shoppingCartRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(cors.cors, (req, res, next) => {
        var shoppingCart = new ShoppingCart(req.session.shoppingCart);
        if (!req.session.shoppingCart) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json({err: 'There is no shopping cart!'});
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({
                products: shoppingCart.generateArray(),
                totalPrice: shoppingCart.totalPrice,
                totalProducts: shoppingCart.totalProducts
            });
        }
});

shoppingCartRouter.route('/checkout')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(cors.cors, (req, res, next) => {
        var shoppingCart = new ShoppingCart(req.session.shoppingCart);
        if (!req.session.shoppingCart) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json({err: 'There is no shopping cart!'});
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ totalPrice: shoppingCart.totalPrice });
        }
});

shoppingCartRouter.route('/:productId')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(cors.cors, (req, res, next) => {
        var shoppingCart = new ShoppingCart(req.session.shoppingCart ? req.session.shoppingCart : {});
        Products.findById(req.params.productId)
            .then((product) => {
                shoppingCart.addToCart(product, product._id);
                req.session.shoppingCart = shoppingCart;
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(shoppingCart);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(cors.corsWithOptions, (req, res, next) => {
        var shoppingCart = new ShoppingCart(req.session.shoppingCart ? req.session.shoppingCart : {});
        Products.findById(req.params.productId)
            .then((product) => {
                shoppingCart.removeFromCart(product, product._id);
                req.session.shoppingCart = shoppingCart;
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(shoppingCart);
            }, (err) => next(err))
            .catch((err) => next(err));
});



module.exports = shoppingCartRouter;
