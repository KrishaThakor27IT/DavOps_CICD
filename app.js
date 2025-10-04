// app.js

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.status(200).send('Hello, World! This is my CI-CD Node.js Application.');
});

app.get('/status', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// The app.listen call is wrapped in a check to avoid it running during tests
// This makes the app exportable for testing purposes.
if (require.main === module) {
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
}

module.exports = app;