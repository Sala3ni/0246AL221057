const requestHandler = (req, res, next) => {
  // Handle JSON parsing errors
  if (req.body && typeof req.body === 'string') {
    try {
      req.body = JSON.parse(req.body);
    } catch (error) {
      return res.status(400).json({ 
        error: 'Invalid JSON format',
        message: 'Request body must be valid JSON'
      });
    }
  }

  // Validate content type for POST requests
  if (req.method === 'POST' && !req.is('application/json')) {
    return res.status(400).json({
      error: 'Invalid Content-Type',
      message: 'Content-Type must be application/json'
    });
  }

  next();
};

module.exports = requestHandler;