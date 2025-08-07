const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware); // require login for all routes below

router.get('/', cartController.getCart);
router.post('/', cartController.addToCart);
router.delete('/:carId', cartController.removeFromCart);

module.exports = router;
