require('dotenv').config();
const express = require('express');
const dbConnection = require('./db/connection');
const { startCarbonJob } = require('./jobs/carbonJob');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const apiRoutes = require('./routes/api');
const corsMiddleware = require('./middleware/cors');
const requestHandler = require('./middleware/requestHandler');
const loggingMiddleware = require('./logging_middleware');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json({ limit: '10mb' }));
app.use(loggingMiddleware);
app.use(requestHandler);

// Database connection
dbConnection.connect();

// Start background jobs
startCarbonJob();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api', apiRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Auth Microservice is running' });
});

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;