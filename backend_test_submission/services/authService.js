const User = require('../models/User');
const UserDomain = require('../domain/User');
const { generateToken } = require('../config/jwt');
const cache = require('../cache/redisCache');

const registerUser = async (userData) => {
  const { email, password, validity = 30, statusCode = 'abcd1' } = userData;
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const user = new User({ email, password });
  await user.save();

  const userDomain = new UserDomain(user);
  const token = generateToken({ userId: user._id });
  
  cache.set(`user_${user._id}`, userDomain.toJSON());
  
  return { 
    token, 
    message: 'User registered successfully',
    validity,
    statusCode
  };
};

const loginUser = async (userData) => {
  const { email, password, validity = 30, statusCode = 'abcd1' } = userData;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken({ userId: user._id });
  const userDomain = new UserDomain(user);
  
  cache.set(`user_${user._id}`, userDomain.toJSON());
  
  return { 
    token, 
    message: 'Login successful',
    validity,
    statusCode
  };
};

module.exports = { registerUser, loginUser };