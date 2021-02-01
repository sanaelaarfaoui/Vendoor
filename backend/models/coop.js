const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const coopSchema = mongoose.Schema({
  name: {type: String, require: true, unique: true},
  email: {type: String, require: true, unique: true},
  image: {type: String, require: true},
  description: {type: String, require: true},
  address: {type: String, require: true},
  tel: {type: String, require: true},
  password: {type: String, require: true}
});

coopSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Coop', coopSchema);
