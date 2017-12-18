var DataSource = require("../public/javascripts/data-source");
var Policy = require('./policy');

class Client {

    findById(clientId, callback) {
        DataSource.prototype.getClients()
            .then((clientsResp) => {
                let clients = clientsResp.data['clients'];
                let findClientById = (client) => {
                    if (client.id === clientId) {
                        return client;
                    }
                }
                callback(clients.find(findClientById));
            })
            .catch((error) => {
                callback(error);
            });
    }

    filterByName(name, callback) {
        return DataSource.prototype.getClients()
            .then((clientsResp) => {
                let clients = clientsResp.data['clients'];
                clients = clients.filter(client => {
                    return client.name === name
                });
                callback(clients);
            })
            .catch((error) => {
                callback(error);
            });
    }

    getUserByPolicy(policyId, callback) {
        Policy.prototype.getPolicyById(policyId, (policy) => {
            DataSource.prototype.getClients()
                .then((clientResp)=>{
                const clients = clientResp.data['clients'];
                let client = clients.find((client) => {return client.id === policy.clientId;});
                callback(client);
            });
        });
    }
}

module.exports = Client;