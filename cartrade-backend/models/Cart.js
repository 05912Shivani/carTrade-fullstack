const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  id: String,
  make: String,
  model: String,
  year: String,
  image: String,
  msrp: Number,
}, { _id: false }); 

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    unique: true
  },
  cars: [carSchema],
});

module.exports = mongoose.model('Cart', cartSchema);
