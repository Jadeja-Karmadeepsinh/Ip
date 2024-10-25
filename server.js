const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to log IP on every request
app.use((req, res, next) => {
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  // x-forwarded-for can be a comma-separated list; take the first IP in the list
  if (ip.includes(',')) {
    ip = ip.split(',')[0];
  }

  // Log the IP
  const logMessage = `Visitor IP: ${ip}\n`;
  fs.appendFileSync('ips.log', logMessage, 'utf8');

  console.log(logMessage); // Optionally, log to the console for debugging
  next();
});

app.get('/', (req, res) => {
  res.send('IP logged successfully');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
