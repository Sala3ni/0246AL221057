const express = require('express');
const { register, login } = require('../controllers/authController');
const { validateUser, validateRequest } = require('../utils/validation');
const router = express.Router();

// Register
router.post('/register', validateUser, validateRequest, register);

// Login
router.post('/login', validateUser, validateRequest, login);

module.exports = router;