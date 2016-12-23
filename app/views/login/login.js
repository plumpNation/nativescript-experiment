const frameModule = require('ui/frame');

exports.onLoad = function () {
    console.log('page loaded');
};

exports.signIn = function () {
    //
};

exports.register = function() {
    const topmost = frameModule.topmost();

    topmost.navigate('views/register/register');
};
