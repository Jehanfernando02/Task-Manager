require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database.js');
const admin = require('firebase-admin');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Match your frontend's Vite default port (update if using 3000)
  credentials: true,
}));

// Middleware
app.use(express.json()); // Parse JSON bodies (single instance)

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json'); // Ensure this file exists in your project root
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Connect to MongoDB
connectDB();

// Firebase ID Token Verification Middleware
const verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];

  if (!idToken) {
    console.log('No token provided in request');
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    console.log('Token verified for user:', decodedToken.uid); // Debug log
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    res.status(401).json({ error: 'Invalid ID token', details: error.message });
  }
};

// Routes
app.use('/api/auth', require('./routes/authRoutes'));    // /api/auth/login
app.use('/api/boards', verifyToken, require('./routes/boardRoutes')); // /api/boards
app.use('/api/lists', verifyToken, require('./routes/listRoutes'));   // /api/lists
app.use('/api/tasks', verifyToken, require('/routes/taskRoutes'));   // /api/tasks
app.use('/api/users', verifyToken, require('/routes/userRoutes.js'));   // /api/users
app.get('/', (req, res) => res.json({ message: 'Trello Clone Backend is running' }));

// Root route for basic health check
app.get('/', (req, res) => {
  res.json({ message: 'Trello Clone Backend is running' });
});

// Error Handler (must be after all routes)
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});