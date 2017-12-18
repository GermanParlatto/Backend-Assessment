var DataSource = require("../public/javascripts/data-source");
var Client = require('./client');


class Policy {

    getPoliciesByClientName(name, callback) {
        let policies = [];
        Client.prototype.filterByName(name, (clientsResult) => {
            DataSource.prototype.getPolicies()
                .then((policiesResp) => {
                    const policiesData = policiesResp.data['policies'];

                    clientsResult.forEach((client) => {
                        let policiesByUser = policiesData.filter(policy => {
                            return policy.clientId === client.id;
                        });
                        policies = policies.concat(policiesByUser);
                    });
                })
                .then(() => {
                    callback(policies);
                });
        });
    }

    getPolicyByUserId(userId, callback) {
        DataSource.prototype.getPolicies()
            .then((policiesResponse) => {
                let policies = policiesResponse.data['policies'];
                policies.filter(policy => {
                    return policy.clientId === userId
                });
                callback(policies);
            });
    }

    getPolicyById(policyId, callback) {
        DataSource.prototype.getPolicies()
            .then((policiesResponse) => {
                let policies = policiesResponse.data['policies'];

                let result = policies.find(policy => {
                    return policy.id === policyId;
                });
                callback(result);
            })
            .catch(() => {
                callback(error);
            });
    }
}

module.exports = Policy;


