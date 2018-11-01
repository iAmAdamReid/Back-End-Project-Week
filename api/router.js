var express = require('express'),
router = express.Router(),
middlewares = require('../config/middlewares.js');

router.all('*', middlewares.authenticate);

router.get('/', function(req, res, next){
    return res.send('This is a test.')
});

router.post()