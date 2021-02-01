const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10,)
    .then(hash => {
      const user = new User({
        username: req.body.username,
        email:  req.body.email,
        password: hash,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        type: false
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: "User cretaed",
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


router.delete('/:id', (req, res, next) => {
  User.deleteOne({ _id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "User Deleted"});
  });
});


router.get("", (req, res, next) => {
  User.find().then(users => {
    res.status(200).json({
      message: 'Users fetched successfully',
      users: users
    });
  });
});
/*
router.post('/login', (req, res, next) => {

  let fetchedUser;
  User.findOne({ email: req.body.email})
    .then(user => {
      if(!user){
        return res.status(401).json({
          message: "Auth failed"
        });
      }

      fetchedUser = user;
      console.log("fetched = " + fetchedUser.password + " | Req user = " + req.body.password);
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      console.log(result);
      if(!result){
        console.log("Error 1");
        return res.status(401).json({
          message: "Auth failed"
        });
      }

      const token = jwt.sign(
        {
          username: fetchedUser.username, email: fetchedUser.email, currId: fetchedUser._id},
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
      console.log("Error 2");
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});*/
router.post('/login', (req, res, next) => {
  let fetchedUser;

  User.findOne({ email: req.body.email})
    .then(user => {
      if(!user){
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if(!result){
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        {
          name: fetchedUser.name, email: fetchedUser.email, currId: fetchedUser._id},
          "secret_this_should_be_longer",
          {expiresIn: "1h" }
        );
        res.status(200).json({
          currId: fetchedUser._id,
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

// get user from id
router.post("/getUser", (req, res, next) => {
  let fetchedUser;
  User.findById(req.body.id)
    .then(user => {
      if(!user){
        return res.status(401).json({
          message: "No user"
        });
      }
      fetchedUser = user;
      res.status(200).json({
        id: fetchedUser._id,
        username: fetchedUser.username,
        email: fetchedUser.email,
        firstname: fetchedUser.firstname,
        lastname: fetchedUser.lastname
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Error !!!"
      });
    });
});

module.exports = router;
