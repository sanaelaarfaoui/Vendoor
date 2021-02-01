const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productsRoutes = require('./routes/products');
const userRoutes = require('./routes/user');
const coopRoutes = require('./routes/coop');
const catRoutes = require('./routes/category');
const commentRoutes = require('./routes/comment');
const orderRoutes = require('./routes/order');
const uploadRoutes = require('./routes/upload');

const app = express();

mongoose.connect("mongodb://localhost:27017/example")
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connected to failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/products", productsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/coop", coopRoutes);
app.use("/api/category", catRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/upload", uploadRoutes);

module.exports = app;
