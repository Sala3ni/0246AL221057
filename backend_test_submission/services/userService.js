const User = require('../models/User');
const UserDomain = require('../domain/User');
const cache = require('../cache/redisCache');

const getUserProfile = async (userId) => {
  // Check cache first
  const cached = cache.get(`user_${userId}`);
  if (cached) {
    return cached.value;
  }

  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new Error('User not found');
  }

  const userDomain = new UserDomain(user);
  cache.set(`user_${userId}`, userDomain.toJSON());
  
  return userDomain.toJSON();
};

module.exports = { getUserProfile };