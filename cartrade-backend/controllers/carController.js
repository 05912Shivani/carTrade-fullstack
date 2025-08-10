const Car = require('../models/Car');

// @desc    Add new car
// @route   POST /api/cars
// @access  Public (for now)


exports.addCar = async (req, res) => {
  try {
    // Destructure the car details from request body
    const { owner, contact,name, brand, year, price, location, image } = req.body; 

    // Create a new Car document with provided details
    const newCar = new Car({
      owner, 
      contact,
      name,
      brand,
      year,
      price,
      location,
      image, 
    });

 // Save the new car in MongoDB
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);  // Respond with status 201 (Created) and the saved car
  } catch (err) {
    console.error('Error adding car:', err);
    res.status(500).json({ message: 'Server Error' }); // Send 500 if something goes wrong
  }
};

// ================== GET ALL CARS ==================
// @desc    Get all cars
// @route   GET /api/cars
// @access  Public
exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find(); // Fetch all cars from DB
    res.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ message: 'Server error while fetching cars.' });
  }
};
// ================== GET SINGLE CAR ==================
// @desc    Get single car by ID
// @route   GET /api/cars/:id
// @access  Public
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);  // Find car by ID from URL params
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({ message: 'Server error while fetching car.' });
  }

  
};
// ================== DELETE CAR ==================
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
