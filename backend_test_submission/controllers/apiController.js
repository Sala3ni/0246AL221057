// GET API examples
const getAllUsers = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Users retrieved successfully',
      data: []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// POST API examples  
const createData = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Missing Fields',
        message: 'Name and email are required'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Data created successfully',
      data: { name, email }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error', 
      message: error.message
    });
  }
};

module.exports = { getAllUsers, createData };