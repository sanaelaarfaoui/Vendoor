const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId:{
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    tel: {
      type: String,
      required: true
    },
    fullname: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    qte: {
        type: Array,
        required: true
    },
    money: {
        type: Array,
        required: true
    },
    done:{
        type: Boolean,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
