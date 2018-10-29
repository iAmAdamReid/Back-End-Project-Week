const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// use the db schema defined in the config file
const db = require('../data/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan());

server.get('/', (req, res) => {
    res.send('Server is running.');
});

module.exports = server;