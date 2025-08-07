const Cart = require('../models/Cart');
const Car = require('../models/Car');

// Get Cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.session.userId }).populate('cars');
    if (!cart) return res.json({ cars: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cart' });
  }
};

// Add to Cart
exports.addToCart = async (req, res) => {
  const { car } = req.body;

  if (!car || !car.id) {
    return res.status(400).json({ message: 'Invalid car data' });
  }

  try {
    let cart = await Cart.findOne({ userId: req.session.userId });

    if (!cart) {
      cart = new Cart({
        userId: req.session.userId,
        cars: [car],
      });
    } else {
      const exists = cart.cars?.some((c) => c?.id === car.id);
      if (!exists) {
        cart.cars.push(car);
      }
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ message: 'Error adding to cart' });
  }
};

// Remove from Cart
exports.removeFromCart = async (req, res) => {
  const carId = req.params.carId;
  try {
    let cart = await Cart.findOne({ userId: req.session.userId });
    if (cart) {
      cart.cars = cart.cars.filter(id => id.toString() !== carId);
      await cart.save();
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error removing from cart' });
  }
};
