const frameModule = require('ui/frame');
const UserViewModel = require("../../shared/view-models/user-view-model");

const user = new UserViewModel();

let page;
let email;

exports.loaded = function (args) {
    // grab an instance of the view; nativescript passes the view to the loaded
    // event handler.
    page = args.object;

    page.bindingContext = user;
};

exports.signIn = function () {
    user.login();
};

exports.register = function() {
    const topmost = frameModule.topmost();

    topmost.navigate('views/register/register');
};
