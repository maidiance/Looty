const express = require('express');
const cors = require('cors');

const lootRouter = require('./loot/loot-router');
const usersRouter = require('./users/user-router');

const server = express();
server.use(express.json());
server.use(cors());

server.use('/api/loot', lootRouter);
server.use('/api/users', usersRouter);

module.exports = server;