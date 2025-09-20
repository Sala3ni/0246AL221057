const mongoose = require('mongoose');

class DatabaseConnection {
  constructor() {
    this.connection = null;
  }

  async connect() {
    try {
      this.connection = await mongoose.connect(process.env.MONGODB_URI);
      console.log('Database connected successfully');
      return this.connection;
    } catch (error) {
      console.error('Database connection failed:', error.message);
      throw error;
    }
  }

  async disconnect() {
    if (this.connection) {
      await mongoose.disconnect();
      console.log('Database disconnected');
    }
  }
}

module.exports = new DatabaseConnection();