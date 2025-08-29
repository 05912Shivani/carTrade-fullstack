const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/',authMiddleware,carController.addCar);
router.get('/',authMiddleware,carController.getAllCars);
router.get('/:id', carController.getCarById);
router.delete('/:id', carController.deleteCar);


module.exports = router;
