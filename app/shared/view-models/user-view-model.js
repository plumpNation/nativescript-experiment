var config = require('../../shared/config');
var fetchModule = require('fetch');
var Observable = require('data/observable').Observable;

class User {
    constructor(info) {
        info = info || {};

        // You can add properties to observables on creation
        const viewModel = new Observable({
            'email'   : info.email || '',
            'password': info.password || ''
        });

        viewModel.register = function() {
            return fetchModule
                .fetch(config.apiUrl + 'Users', {
                    'method': 'POST',
                    'body': JSON.stringify({
                        'Username'  : viewModel.get('email'),
                        'Email'     : viewModel.get('email'),
                        'Password'  : viewModel.get('password')
                    }),
                    'headers': {
                        'Content-Type': 'application/json'
                    }
                })
                .then(handleErrors);
        };

        return viewModel;
    }
}

function handleErrors(response) {
    if (!response.ok) {
        debugger;

        throw Error(response);
    }

    return response;
}

module.exports = User;
