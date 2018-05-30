const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./middleware.js');

// connect to mongo

mongoose
.connect('mongodb://localhost/beardb')
.then(mongo => {
  console.log('connected to database');
})
.catch(err => {
  res.status(500).json(err);
  console.log('Error connecting to databse', err);
})

const bearController = require('./bears/bearController');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
// server.use(logger('loading'));


server.get('/', function(req, res) {
  res.status(200).json({ api: 'running' });
});

server.use('/api/bears', bearController);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n=== API running on http://localhost:${port} ===\n`);
});
