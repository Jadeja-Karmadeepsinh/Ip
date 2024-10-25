const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;  // Use process.env.PORT for Render or fallback to 3000 locally

app.get('/', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  fs.appendFileSync('ips.log', `Visitor IP: ${ip}\n`);
  res.send('IP logged successfully');
});

app.listen(port, '0.0.0.0', () => {  // Bind to '0.0.0.0' to make the app accessible externally
  console.log(`Server is running on port ${port}`);
});
