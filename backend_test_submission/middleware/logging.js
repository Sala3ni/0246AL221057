const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../logs/app.log');

// Ensure logs directory exists
const logsDir = path.dirname(logFile);
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const loggingMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip || req.connection.remoteAddress;
  
  const logEntry = `${timestamp} - ${method} ${url} - IP: ${ip} - Body: ${JSON.stringify(req.body)}\n`;
  
  // Log to console
  console.log(`${timestamp} - ${method} ${url} - ${ip}`);
  
  // Log to file
  fs.appendFile(logFile, logEntry, (err) => {
    if (err) console.error('Logging error:', err);
  });
  
  // Log response
  const originalSend = res.send;
  res.send = function(data) {
    const responseLog = `${timestamp} - Response: ${res.statusCode} - ${data}\n`;
    fs.appendFile(logFile, responseLog, () => {});
    originalSend.call(this, data);
  };
  
  next();
};

module.exports = loggingMiddleware;