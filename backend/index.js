const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8000;

app.use(cors());

app.get('/api/greet', (req, res) => {
  const name = req.query.name;
  if (name) {
    res.json({ message: `Hello, ${name}! Welcome to Younglabs.` });
  } else {
    res.status(400).json({ error: "Name is required." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
