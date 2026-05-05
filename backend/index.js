// This MUST be the first line to load your .env file
require('dotenv').config();
const connectDB = require('./config/MongoDB');
const express = require('express');
const cors = require('cors');
const path = require("path");
 // Import the database connection function

const app = express();

// --- Middleware ---
app.use(express.json()); // To parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing (consider restricting this in production)

// --- Static Folders ---
// Serve profile images, resumes, and offer letters as static files
app.use('/profileImgs', express.static(path.join(__dirname, 'public/profileImgs')));
app.use('/resume', express.static(path.join(__dirname, 'public/resumes')));
app.use('/offerLetter', express.static(path.join(__dirname, 'public/offerLetter')));

// --- API Routes ---
app.use('/user', require('./routes/user.route'));
app.use('/student', require('./routes/student.route'));
app.use('/tpo', require('./routes/tpo.route'));
app.use('/management', require('./routes/management.route'));
app.use('/admin', require('./routes/superuser.route'));
app.use('/company', require('./routes/company.route'));

// --- Error Handling Middleware ---
// Handle 404 - Not Found errors
app.use((req, res, next) => {
  res.status(404).json({ message: 'The requested resource was not found.' });
});

// Handle all other server errors
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging
  res.status(500).json({ message: 'Something went wrong on the server!' });
});


// --- Function to Start the Server ---
const startServer = async () => {
  try {
    // 1. Connect to the database first
    await connectDB();

    // 2. Start the Express server only after a successful database connection
    const PORT = process.env.PORT || 4518; // Use port from .env or default to 4518
    app.listen(PORT, () => {
      console.log(`Server is running successfully on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database. Server did not start.", error);
    process.exit(1); // Exit the application with a failure code
  }
};

// --- Start the Application ---
startServer();