const express = require('express');
const events = require('events');

const remote = new events.EventEmitter();

const server = express();

server.use(express.json());

server.use((req, res, next) => {
  console.log('request incoming');
  console.log(req.method, req.url);
  next();
});

server.put('/spectate', (req, res) => {
  const { gameUrl } = req.body;
  remote.emit('spectate', gameUrl);
  res.json({ gameUrl });
});

module.exports = { remote, server };
