const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Coop = require('../models/coop');

const router = express.Router();


router.delete('/:id', (req, res, next) => {
  Coop.deleteOne({ _id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "User Deleted"});
  });
});


router.get("", (req, res, next) => {
  Coop.find().then(coops => {
    res.status(200).json({
      message: 'Coops fetched successfully',
      coops: coops
    });
  });
});


router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10,)
    .then(hash => {
      const coop = new Coop({
        name: req.body.name,
        email: req.body.email,
        image: req.body.image,
        description: req.body.description,
        address: req.body.address,
        tel: req.body.tel,
        password: hash
      });
      coop.save()
        .then(result => {
          res.status(201).json({
            message: "Cooperativev cretaed",
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
});

router.post('/login', (req, res, next) => {
  let fetchedCoop;

  Coop.findOne({ email: req.body.email})
    .then(coop => {
      if(!coop){
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedCoop = coop;
      return bcrypt.compare(req.body.password, coop.password);
    })
    .then(result => {
      if(!result){
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        {
          name: fetchedCoop.name, email: fetchedCoop.email, currId: fetchedCoop._id},
          "secret_this_should_be_longer",
          {expiresIn: "1h" }
        );
        res.status(200).json({
          currId: fetchedCoop._id,
          token: token,
          expiresIn: 3600
        });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});

router.get("", (req, res, next) => {
  Coop.find().then(coops => {
    res.status(200).json({
      message: 'Coops fetched successfully',
      cooperatives: coops
    });
  });
});

router.get("/:id", (req, res, next) => {
  Coop.findById(req.params.id).then(coop => {
    if(coop){
      res.status(200).json(coop);
    }else{
      res.status(404).json({ message: "Ereur 404 : Coopérative not found"});
    }
  });
});

module.exports = router;
