var express = require('express');
var router = express.Router();
var Client = require('../model/client');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/id/:userId', function (req, res, next) {
    let user_id = req.params['userId'];
    Client.prototype.findById(user_id, (response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(response));
    });
});

router.get('/name/:name', function (req, res, next) {
    let name = req.params['name'];
    Client.prototype.filterByName(name, (response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(response));
    });
});

router.get('/policy/:policityId', function (req, res, next) {
    let policityId = req.params['policityId'];
    Client.prototype.getUserByPolicy(policityId, (client) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(client));
    });
});

module.exports = router;
