const express = require('express');

const Product = require('../models/product');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();


router.post("", checkAuth, (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    coop: req.currAuthData.currId,
    //coop: null,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image,
    price: req.body.price,
    note: 0
  });
  console.log(req.currAuthData);
  //return  res.status(201).json({});
  product.save().then(createdProduct => {
    res.status(201).json({
      message: 'Product Added successfully',
      productId: createdProduct._id
    });
  });
});

router.get("", (req, res, next) => {
  Product.find().then(products => {
    //console.log(products);
    res.status(200).json({
      message: 'Products fetched successfully',
      products: products
    });
  });
});

router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id).then(product => {
    if(product){
      res.status(200).json(product);
    }else{
      res.status(404).json({message: "Product not found"});
    }
  })
});

router.delete('/:id', checkAuth, (req, res, next) => {
  Product.deleteOne({ _id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Product Deleted"});
  });
});


router.get("", (req, res, next) => {
  Product.find().then(products => {
    //console.log(products);
    res.status(200).json({
      message: 'Products fetched successfully',
      products: products
    });
  });
});

router.get('/cat/:catName', (req, res, next) => {
  Product.find({category: req.params.catName}).then(products => {
     //console.log(products);
     res.status(200).json({
        message: 'Products fetched successfully',
        products: products
      });
  })
});

router.get('/coop/:coopId', (req, res, next) => {
  Product.find({coop: req.params.coopId}).then(products => {
     if(products){
      res.status(200).json({
        message: 'Products fetched successfully',
        products: products
      });
     }else{
      res.status(404).json({
        message: 'No Products found'
      });
     }

  })
});


router.get('/s/:q', (req, res, next) => { //search product by name  http://localhost:3000/products/search?name=h
  console.log(req.params.q)
    Product.find({
      name: {$regex:new RegExp(req.params.q, "i")}
    }).limit(10).exec()
        .then((products) => {

            if(products.length > 0){
              res.status(200).json({
                message: 'Products searched successfully',
                products: products
              });
            }else{
              console.log("no product");
              res.status(404).json({
                message: 'No product found',
                products: products
              });
            }
        });
});
module.exports = router;
