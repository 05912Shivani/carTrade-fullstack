// const express = require('express');
// const session = require('express-session');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));

// app.use(session({
//   secret: 'cartrade_secret',
//   resave: false,
//   saveUninitialized: false
  
// }));

// // Connect DB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB error:', err));

// // Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/cars', require('./routes/carRoutes'));
// app.use('/api/cart', require('./routes/cartRoutes'));

// // Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Parse JSON body
app.use(express.json());

// CORS: Allow frontend to communicate with backend
app.use(cors({
  origin: 'https://cartrade-frontend.onrender.com', // frontend URL
  credentials: true,
}));

app.set('trust proxy', 1); // 🛠️ Add this line

// Session Middleware with MongoDB store
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret_key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions',
    ttl: 14 * 24 * 60 * 60, // 14 days
  }),
  cookie: {
    httpOnly: true,
    secure: true,       // true because Render uses HTTPS
    sameSite: 'none',   // cross-origin allowed
  }
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cars', require('./routes/carRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));

// Handle root route
app.get('/', (req, res) => {
  res.send('🚗 CarTrade Backend is Running!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
