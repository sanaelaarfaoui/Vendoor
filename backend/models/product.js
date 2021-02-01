const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {type: String, require: true},
  coop: {type: mongoose.Schema.Types.ObjectId},
  description: {type: String, require: true},
  category: {type: String},
  image: {type : String},
  price: {type : mongoose.Number},
  note: {type : mongoose.Number}
});

module.exports = mongoose.model('Product', productSchema);
