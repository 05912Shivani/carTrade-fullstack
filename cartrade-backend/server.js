const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());

// CORS setup for frontend URL
app.use(cors({
  origin: 'https://cartrade-frontend.onrender.com',
  credentials: true,
}));

// Session middleware with MongoDB storage
app.use(session({
  secret: process.env.SESSION_SECRET || 'cartrade_secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI, // Set this in Render environment
    collectionName: 'sessions',
    ttl: 14 * 24 * 60 * 60 // 14 days
  }),
  cookie: {
    httpOnly: true,
    secure: true,       // Use true because Render uses HTTPS
    sameSite: 'none'    // Allow cross-origin
  }
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cars', require('./routes/carRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
