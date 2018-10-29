const knex = require('knex');

const knexConfig = require('../knexfile');

// use the development knex schema
module.exports = knex(knexConfig.development);