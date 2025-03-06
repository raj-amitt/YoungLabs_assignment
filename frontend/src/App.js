import React, { useState } from 'react'; // Importing React and useState for state management
import './index.css'; // Importing external CSS for styling

function App() {
  // State variables to store user input, greeting message, and error message
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [error, setError] = useState('');

  // Function to fetch the greeting from the backend
  const handleGetGreeting = async () => {
    setError(''); // Reset error message
    setGreeting(''); // Reset greeting message

    if (!name.trim()) {
      // Check if the input is empty
      setError('Please enter your name.');
      return;
    }

    try {
      // Fetching the greeting from the backend API
      const response = await fetch(
        `http://localhost:8000/api/greet?name=${encodeURIComponent(name)}`
      );
      const data = await response.json();

      if (response.ok) {
        setGreeting(data.message); // Update greeting message if successful
      } else {
        setError(data.error || 'Something went wrong.'); // Handle API errors
      }
    } catch (err) {
      // Handle network errors
      setError(
        'Failed to fetch greeting. Make sure the server is running on port 8000.'
      );
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Get your greeting</h1>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update name state on input change
        />
        <button onClick={handleGetGreeting}>Get Greeting</button>
        {greeting && <p className="greeting-message">{greeting}</p>}{' '}
        {/* Display greeting if available */}
        {error && <p className="error-message">{error}</p>}{' '}
        {/* Display error if any */}
      </div>
    </div>
  );
}

export default App; // Exporting the App component
