const Car = require('../models/Car');

// @desc    Add new car
// @route   POST /api/cars
// @access  Public (for now)


exports.addCar = async (req, res) => {
  try {
    const { owner, contact,name, brand, year, price, location, image } = req.body; // ✅ include image

    const newCar = new Car({
      owner, 
      contact,
      name,
      brand,
      year,
      price,
      location,
      image, // ✅ save image
    });

    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (err) {
    console.error('Error adding car:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};


// @desc    Get all cars
// @route   GET /api/cars
// @access  Public
exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ message: 'Server error while fetching cars.' });
  }
};

// @desc    Get single car by ID
// @route   GET /api/cars/:id
// @access  Public
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({ message: 'Server error while fetching car.' });
  }

  
};
exports.deleteCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const deletedCar = await Car.findByIdAndDelete(carId);

    if (!deletedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json({ message: 'Car deleted successfully' });
  } catch (err) {
    console.error('Delete car error:', err);
    res.status(500).json({ message: 'Server error while deleting car' });
  }
};
