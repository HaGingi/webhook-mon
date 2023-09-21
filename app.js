const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// Initialization
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Port setting
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  if (req.path !== '/webhook' && req.method === 'POST') {
    res.redirect(307, '/webhook');
  } else {
    next();
  }
});

app.use(express.static('public'));

// Webhook endpoint
app.post('/webhook', (req, res) => {
  const webhookData = req.body;
  console.log('Webhook received:', webhookData);
  io.emit('newWebhook', webhookData);
  res.sendStatus(200);
});

// Start server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
