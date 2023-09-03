const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  if (req.path !== '/webhook' && req.method === 'POST') {
    res.redirect(307, '/webhook');
  } else {
    next();
  }
});

app.use(express.static('public'));

app.post('/webhook', (req, res) => {
  const webhookData = req.body;
  console.log('Webhook received:', webhookData);
  io.emit('newWebhook', webhookData);
  res.sendStatus(200);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
