const config        = require('../../shared/config');
const Observable    = require('data/observable').Observable;

require('fetch');

class User {
    constructor(info) {
        info = info || {};

        // You can add properties to observables on creation
        const viewModel = new Observable({
            'email'   : info.email || 'plump@foobar.com',
            'password': info.password || '123'
        });

        viewModel.register = () => {
            const params = {
                'method': 'POST',
                'body': JSON.stringify({
                    'Username'  : viewModel.get('email'),
                    'Email'     : viewModel.get('email'),
                    'Password'  : viewModel.get('password')
                }),
                'headers': {
                    'Content-Type': 'application/json'
                }
            };

            return fetch(config.apiUrl + 'Users', params).then(handleErrors);
        };

        viewModel.login = () => {
            const params =  {
                'method': 'POST',
                'body': JSON.stringify({
                    'username'  : viewModel.get('email'),
                    'password'  : viewModel.get('password'),
                    'grant_type': 'password'
                }),
                'headers': {
                    'Content-Type': 'application/json'
                }
            };

            return fetch(config.apiUrl + 'oauth/token', params)
                .then(handleErrors)
                .then((response) => response.json())
                .then((data) => {
                    config.token = data.Result.access_token;
                });
        };

        return viewModel;
    }
}

/**
 * Converts successful request into error if response status contains an error.
 */
function handleErrors(response) {
    if (!response.ok) throw response;

    return response;
}

module.exports = User;
