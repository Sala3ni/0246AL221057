const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../logs/requests.log');

// Ensure logs directory exists
const logsDir = path.dirname(logFile);
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip || req.connection.remoteAddress;
  const userAgent = req.get('User-Agent') || 'Unknown';
  
  const logData = {
    timestamp,
    method,
    url,
    ip,
    userAgent,
    body: req.body,
    headers: req.headers
  };
  
  const logEntry = `${timestamp} | ${method} ${url} | IP: ${ip} | Body: ${JSON.stringify(req.body)}\n`;
  
  // Console log
  console.log(`[${timestamp}] ${method} ${url} - ${ip}`);
  
  // File log
  fs.appendFile(logFile, logEntry, (err) => {
    if (err) console.error('Logging failed:', err);
  });
  
  // Response logging
  const originalSend = res.send;
  res.send = function(data) {
    const responseLog = `${timestamp} | RESPONSE: ${res.statusCode} | Data: ${data}\n`;
    fs.appendFile(logFile, responseLog, () => {});
    originalSend.call(this, data);
  };
  
  next();
};

module.exports = requestLogger;