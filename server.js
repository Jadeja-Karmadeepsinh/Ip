const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Route for the root ("/") URL
app.get('/', (req, res) => {
    res.send('Welcome! Please click the <a href="/track">tracking link</a> to log your IP.');
});

// Route for the tracking link ("/track")
app.get('/track', (req, res) => {
    // Get the IP address, handling both IPv4 and IPv6
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // If the IP is IPv6 localhost (::1), convert it to IPv4 localhost (127.0.0.1)
    if (ip === '::1') {
        ip = '127.0.0.1';
    }

    // Log the IP to the console and save it to a log file
    console.log(`Visitor IP: ${ip}`);
    fs.appendFileSync('ips.log', `Visitor IP: ${ip}\n`);

    // Respond to the visitor
    res.send('Thank you for clicking the link! Your IP has been logged.');
});

// Start the server, forcing it to use IPv4 (127.0.0.1) on port 3000
app.listen(port, '127.0.0.1', () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
});
