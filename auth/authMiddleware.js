const basicAuth = require('basic-auth');
require('dotenv').config(); // Load environment variables

// Define the username and password for basic authentication
const username = process.env.AUTH_USERNAME;
const password = process.env.AUTH_PASSWORD;

module.exports = (req, res, next) => {
  const user = basicAuth(req);

  // Check if provided credentials match the expected credentials
  if (!user || user.name !== username || user.pass !== password) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Notes API"');
    res.status(401).json({ message: 'Authentication failed. Please check your credentials.' });
  } else {
    next(); // Authentication successful, proceed to the next middleware
  }
};

