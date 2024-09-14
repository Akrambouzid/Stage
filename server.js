const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Define the webhook endpoint
app.post('/webhook', (req, res) => {
    console.log('Received webhook:', req.body);
    res.status(200).send('Webhook received successfully');
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log("Server is running on port ${PORT}");
});