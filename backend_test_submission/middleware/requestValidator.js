const validateRequestBody = (req, res, next) => {
  const { validity, statusCode } = req.body;
  
  // Set defaults if not provided
  if (!req.body.validity) {
    req.body.validity = 30;
  }
  
  if (!req.body.statusCode) {
    req.body.statusCode = 'abcd1';
  }
  
  // Validate values
  if (req.body.validity !== 30) {
    return res.status(400).json({
      error: 'Invalid Validity',
      message: 'Validity must be 30',
      statusCode: 'abcd1'
    });
  }
  
  if (req.body.statusCode !== 'abcd1') {
    return res.status(400).json({
      error: 'Invalid Status Code',
      message: 'Status code must be abcd1', 
      statusCode: 'abcd1'
    });
  }
  
  next();
};

module.exports = { validateRequestBody };