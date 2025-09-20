const User = require('../models/User');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getDashboard = (req, res) => {
  res.json({ 
    message: 'Welcome to dashboard',
    userId: req.user.userId,
    timestamp: new Date().toISOString()
  });
};

module.exports = { getProfile, getDashboard };