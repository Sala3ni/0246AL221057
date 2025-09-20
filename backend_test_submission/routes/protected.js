const express = require('express');
const authMiddleware = require('../middleware/auth');
const { getProfile, getDashboard } = require('../controllers/userController');
const router = express.Router();

// Protected routes
router.get('/profile', authMiddleware, getProfile);
router.get('/dashboard', authMiddleware, getDashboard);

module.exports = router;