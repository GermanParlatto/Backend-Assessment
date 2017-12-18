var http = require('http');
var axios = require('axios');

class DataSource {

    constructor() {
    }

    getClients() {
        return axios.get('http://www.mocky.io/v2/5808862710000087232b75ac');
    }

    getPolicies() {
        return axios.get('http://www.mocky.io/v2/580891a4100000e8242b75c5');
    }

    getAll(url, callback) {


        http.get(url, (response) => {
            const {statusCode} = response;
            const contentType = response.headers['content-type'];

            let error;
            if (statusCode !== 200) {
                error = new Error('Request Failed.\n' +
                    `Status Code: ${statusCode}`);
            } else if (!/^application\/json/.test(contentType)) {
                error = new Error('Invalid content-type.\n' +
                    `Expected application/json but received ${contentType}`);
            }
            if (error) {
                console.error(error.message);
                // consume response data to free up memory
                response.resume();
                return;
            }

            response.setEncoding('utf8');
            let rawData = '';
            response.on('data', (chunk) => {
                rawData += chunk;
            });
            response.on('end', () => {
                try {
                    const parsedClientsData = JSON.parse(rawData);
                    callback(parsedClientsData);
                } catch (e) {
                    console.error(e.message);
                }
            });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
    }

}

module.exports = DataSource;