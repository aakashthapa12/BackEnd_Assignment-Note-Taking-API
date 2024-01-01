const express = require("express");
const app = express();

// Load config from .env file
require("dotenv").config();

// Middleware to parse JSON request body
app.use(express.json());

// Importing routes for Notes API
const noteRoutes = require("./routes/routesNote");

// Importing custom middleware 
const customMiddleware = require("./middlewares/Middleware"); 

// custom middleware
app.use(customMiddleware);

// Mount the Notes API routes
app.use("/api/v1", noteRoutes);

// Connect to the database
const dbConnect = require("./config/database"); // Ensure this module exports a function to connect to MongoDB
dbConnect();

// Default Route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the Notes API</h1>");
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server started successfully on port ${PORT}`);
  });
}

// Exportng the app for testing purposes
module.exports = app;





