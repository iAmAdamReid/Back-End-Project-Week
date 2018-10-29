const knex = require('knex');

const knexConfig = require('../knexfile.js');

// use the development knex schema
module.exports = knex(knexConfig.development);