const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  // JSON parsing error
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ 
      error: 'Invalid JSON',
      message: 'Request body contains invalid JSON'
    });
  }
  
  // Validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      error: 'Validation Error',
      message: err.message 
    });
  }
  
  // Duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({ 
      error: 'Duplicate Entry',
      message: 'Email already exists' 
    });
  }
  
  // Type error (string expected bool)
  if (err.name === 'TypeError') {
    return res.status(400).json({ 
      error: 'Type Error',
      message: 'Invalid data type in request'
    });
  }
  
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: 'Something went wrong on the server'
  });
};

module.exports = errorHandler;