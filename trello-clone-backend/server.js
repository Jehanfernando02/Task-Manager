require('dotenv').config();
const express = require('express');
const connectDB = require("./config/database.js");
const admin = require('firebase-admin');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Initialize Firebase Admin SDK
// admin.initializeApp({
//   credential: admin.credential.applicationDefault(), 
// });

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Firebase ID Token Verification Middleware
const verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization && req.headers.authorization.split("Bearer ")[1];
  
  if (!idToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ error: 'Invalid ID token' });
  }
};

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/boards', verifyToken, require('./routes/boardRoutes'));
app.use('/api/lists', verifyToken, require('./routes/listRoutes'));
// Add other routes

// Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
