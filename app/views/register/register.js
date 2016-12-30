const dialogsModule = require('ui/dialogs');
const frameModule = require('ui/frame');

const UserViewModel = require('../../shared/view-models/user-view-model');
const user = new UserViewModel();

exports.loaded = (args) => {
    const page = args.object;

    page.bindingContext = user;
};

function completeRegistration() {
    user.register()
        .then(() => {
            dialogsModule
                .alert('Your account was successfully created.')
                .then(() => frameModule.topmost().navigate('views/login/login'));
        })
        .catch((error) => {
            const errorDetails = JSON.parse(error._bodyText);

            dialogsModule
                .alert({
                    'message': 'Cannot register. '  + errorDetails.message,
                    'okButtonText': 'OK'
                });
        });
}

exports.register = () => completeRegistration();
