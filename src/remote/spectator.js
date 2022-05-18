const express = require('express');
const events = require('events');

const remote = new events.EventEmitter();

const server = express();

server.use(express.json());

server.put('/spectate', (req, res) => {
  const { gameUrl } = req.body;
  remote.emit('spectate', gameUrl);
  res.json({ gameUrl });
});

module.exports = { remote, server };
