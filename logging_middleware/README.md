# Logging Middleware

## Description
Request/Response logging middleware for Express.js applications.

## Features
- Logs all incoming requests
- Logs response data and status codes
- Saves logs to file system
- Console logging for development

## Usage
```javascript
const requestLogger = require('./logging_middleware');
app.use(requestLogger);
```

## Log Format
```
2024-01-01T10:00:00.000Z | POST /api/auth/login | IP: 127.0.0.1 | Body: {"email":"test@example.com"}
2024-01-01T10:00:00.000Z | RESPONSE: 200 | Data: {"token":"jwt_token_here"}
```

## Files
- `index.js` - Main logging middleware
- Logs saved to `../logs/requests.log`