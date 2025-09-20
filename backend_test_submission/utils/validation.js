const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

const validateUser = (req, res, next) => {
  try {
    const { email, password, validity, statusCode } = req.body;
    
    // Check if body exists
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ 
        error: 'Invalid Request Body',
        message: 'Request body must be a valid JSON object',
        statusCode: 'abcd1'
      });
    }
    
    // Check required fields
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Missing Fields',
        message: 'Email and password are required',
        statusCode: 'abcd1'
      });
    }
    
    // Validity validation (must be 30)
    if (validity !== undefined && validity !== 30) {
      return res.status(400).json({ 
        error: 'Invalid Validity',
        message: 'Validity must be 30',
        statusCode: 'abcd1'
      });
    }
    
    // Status code validation (must be abcd1)
    if (statusCode !== undefined && statusCode !== 'abcd1') {
      return res.status(400).json({ 
        error: 'Invalid Status Code',
        message: 'Status code must be abcd1',
        statusCode: 'abcd1'
      });
    }
    
    // Type validation
    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ 
        error: 'Invalid Data Type',
        message: 'Email and password must be strings',
        statusCode: 'abcd1'
      });
    }
    
    if (!validateEmail(email)) {
      return res.status(400).json({ 
        error: 'Invalid Email',
        message: 'Invalid email format',
        statusCode: 'abcd1'
      });
    }
    
    if (!validatePassword(password)) {
      return res.status(400).json({ 
        error: 'Invalid Password',
        message: 'Password must be at least 6 characters',
        statusCode: 'abcd1'
      });
    }
    
    next();
  } catch (error) {
    return res.status(400).json({ 
      error: 'Validation Error',
      message: 'Request validation failed',
      statusCode: 'abcd1'
    });
  }
};

const validateRequest = (req, res, next) => {
  const { validity, statusCode } = req.body;
  
  if (validity !== 30) {
    return res.status(400).json({
      error: 'Invalid Validity',
      message: 'Validity must be 30',
      statusCode: 'abcd1'
    });
  }
  
  if (statusCode !== 'abcd1') {
    return res.status(400).json({
      error: 'Invalid Status Code', 
      message: 'Status code must be abcd1',
      statusCode: 'abcd1'
    });
  }
  
  next();
};

module.exports = { validateEmail, validatePassword, validateUser, validateRequest };