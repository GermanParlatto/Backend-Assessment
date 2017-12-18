var express = require('express');
var router = express.Router();
var DataSource = require("../public/javascripts/data-source");

var authentication = function (req, res, next) {
    if (req.path.indexOf("/login") === 0) {
        return next();
    }
    else if (req.session.authenticated === true) {
        return next();
    }
    else {
        res.status(401).send('No authenticated!');
    }
}

router.use(authentication);


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

/* POST Login*/
/*Authenticate using JSON compose for "name" and "email" of client list*/
router.post('/login', function (req, res, next) {
    var authenticated = req.session.authenticated;

    if (!authenticated) {
        var email = req.body.email;
        var name = req.body.name;

        let findClient = (client) => {
            if (client.email === email && client.name === name) {
                return client;
            }
        };
        DataSource.prototype.getClients()
            .then((clientResp) => {
                let client = clientResp.data['clients'].find(findClient);
                if (client !== null) {
                    req.session.authenticated = true;
                    req.session.clientRole = client.role;
                    res.status(200).send('Loged in sucesfull');
                }
                else {
                    req.session.authenticated = false;
                    res.status(401).send('Incorrect credential');
                }
            });
    }
    else {
        res.send('The user has been authenticated');
    }
});

module.exports = router;
