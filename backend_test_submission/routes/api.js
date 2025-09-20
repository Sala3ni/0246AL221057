const express = require('express');
const { getAllUsers, createData } = require('../controllers/apiController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// GET APIs
router.get('/users', authMiddleware, getAllUsers);

// POST APIs  
router.post('/data', authMiddleware, createData);

module.exports = router;