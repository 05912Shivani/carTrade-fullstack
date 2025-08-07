const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  owner: String,
  contact: String,
  brand: String,
  model: String,
  year: Number,
  price: Number,
  fuelType: String,
  transmission: String,
  kmDriven: Number,
  location: String,
  image: String,
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
