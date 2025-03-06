const express = require('express'); // Importing the Express framework
const cors = require('cors'); // Importing CORS to handle cross-origin requests

const app = express(); // Creating an Express application instance
const PORT = 8000; // Defining the port number for the server

app.use(cors()); // Enabling CORS to allow requests from different origins

// API endpoint to greet users
app.get('/api/greet', (req, res) => {
  const name = req.query.name; // Extracting the 'name' parameter from query string
  if (name) {
    res.json({ message: `Hello, ${name}! Welcome to Younglabs.` }); // Sending a greeting message as a JSON response
  } else {
    res.status(400).json({ error: 'Name is required.' }); // Sending an error response if 'name' is missing
  }
});

// Starting the server and listening on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Logging a message when the server starts
});
