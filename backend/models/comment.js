const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  productId: {type: String, require: true},
  userId: {type: String, require: true},
  content: {type: String, require: true}
}, {
  timestamps: true
});


module.exports = mongoose.model('Comment', commentSchema);
