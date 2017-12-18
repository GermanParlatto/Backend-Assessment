var express = require('express');
var router = express.Router();
var Policy = require('../model/policy');

var validateRole = function(req, res, next) {
    if (req.session.clientRole === 'admin'){
        return next();
    }
    else{
        res.status(403).send('Access denied!');
    }
}

router.use(validateRole);

/* GET policies listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/user/:userName', function (req, res, next) {
    let name = req.params['userName'];
    Policy.prototype.getPoliciesByClientName(name, (response) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(response));
    });
});

router.get('/id/:userId', function (req, res, next) {
    let userId = req.params['userId'];
    Policy.prototype.getPolicyByIdP(userId, (response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(response));
    });
});


module.exports = router;
