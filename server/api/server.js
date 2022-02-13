const express = require('express');
const server = express();

const lootRouter = require('./loot/loot-router');

server.use(express.json());

server.use('/api/loot', lootRouter);

module.exports = server;