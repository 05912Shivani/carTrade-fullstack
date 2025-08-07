const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const MongoStore = require('connect-mongo');

app.set('trust proxy', 1); // Required for secure cookies on Render

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'https://cartrade-frontend.onrender.com',
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'cartrade_secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions'
  }),
  cookie: {
    httpOnly: true,
    secure: true,        // Required for cross-site HTTPS
    sameSite: 'none',    // Required for cross-site cookies
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cars', require('./routes/carRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
