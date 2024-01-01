// Error handling middleware
function errorHandler(err, req, res, next) {
    console.error(err.stack);
  
    // Handle specific types of errors
    if (err.name === 'ValidationError') {
      // Handle validation errors (e.g., missing fields)
      return res.status(400).json({ error: err.message });
    }
  
    if (err.name === 'CastError') {
      // Handle invalid object ID errors
      return res.status(400).json({ error: 'Invalid ID' });
    }
  
    // Handle other errors
    res.status(500).json({ error: 'Something went wrong' });
  }
  
  module.exports = errorHandler;
  