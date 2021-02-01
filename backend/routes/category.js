const express = require('express');

const Category = require('../models/category');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();


router.post("",(req, res, next) => {
  const category = new Category({
    name: req.body.name
  });
  category.save().then(createdCat => {
    res.status(201).json({
      message: 'Category Added successfully',
      cat: createdCat._id
    });
  });
});

router.get("", (req, res, next) => {
  Category.find().then(cats => {
    //console.log(products);
    res.status(200).json({
      message: 'Category fetched successfully',
      categories: cats
    });
  });
});

router.get('/:id', (req, res, next) => {
  Category.findById(req.params.id).then(product => {
    if(product){
      res.status(200).json(product);
    }else{
      res.status(404).json({message: "Category not found"});
    }
  })
});

router.delete('/:id', (req, res, next) => {
  Category.deleteOne({ _id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Category Deleted"});
  });
});



module.exports = router;
