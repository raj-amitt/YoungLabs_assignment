import React, { useState } from 'react';
import './index.css';

function App() {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [error, setError] = useState('');

  const handleGetGreeting = async () => {
    setError('');
    setGreeting('');
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/greet?name=${encodeURIComponent(name)}`
      );
      const data = await response.json();

      if (response.ok) {
        setGreeting(data.message);
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setError('Failed to fetch greeting. Make sure the server is running on port 8000.');
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
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleGetGreeting}>Get Greeting</button>
        {greeting && <p className="greeting-message">{greeting}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default App;
