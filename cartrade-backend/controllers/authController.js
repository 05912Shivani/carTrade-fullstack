const User = require('../models/User');
const bcrypt = require('bcrypt'); // Import bcrypt library for password hashing

// ================== SIGNUP ==================
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;  // Extract name, email, and password from request body

    const existingUser = await User.findOne({ email }); // Check if a user with the same email exists
    if (existingUser) return res.status(400).json({ message: 'Email already registered' }); // Return error if email is already used

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with 10 salt rounds
    const user = await User.create({ name, email, password: hashedPassword }); // Create a new user in the database

    req.session.userId = user._id; // Store the user's ID in the session for authentication
    res.status(201).json({ message: 'Signup successful', user: { name: user.name, email: user.email } });   // Send user info without password
  } catch (err) {
    res.status(500).json({ message: 'Server error' }); // Handle any server errors
  }
};
// ================== LOGIN ==================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body; // Extract email and password from request body

    const user = await User.findOne({ email }); // Find user by email
    if (!user) return res.status(401).json({ message: 'Invalid credentials' }); // If not found, return error

    const isMatch = await bcrypt.compare(password, user.password); // Compare entered password with stored hash
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });  // If password doesn't match, return error

    req.session.userId = user._id; // Store the user ID in session for future requests
    res.json({ message: 'Login successful', user: { name: user.name, email: user.email } }); // Send user info without password
  } catch (err) {
    res.status(500).json({ message: 'Server error' }); // Handle server errors
  }
};
// ================== LOGOUT ==================
exports.logout = (req, res) => {
  req.session.destroy(() => {  // Destroy the session data
    res.clearCookie('connect.sid');  // Clear the session cookie from client
    res.json({ message: 'Logged out' }); // Send confirmation response
  });
};
// ================== GET CURRENT USER ==================
exports.getCurrentUser = async (req, res) => {
  if (!req.session.userId) // If there is no userId in session
    return res.status(401).json({ message: 'Not logged in' }); // User is not authenticated

  const user = await User.findById(req.session.userId).select('-password'); // Fetch user by ID excluding password field
  res.json(user);  // Send user data
};
