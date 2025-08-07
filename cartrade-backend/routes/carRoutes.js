const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router.post('/', carController.addCar);
router.get('/', carController.getAllCars);
router.get('/:id', carController.getCarById);
router.delete('/:id', carController.deleteCar);


module.exports = router;
