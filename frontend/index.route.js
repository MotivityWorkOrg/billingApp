import AuthController from './auth/auth.controller';

function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('login', {
            url: '/',
            template: require('./auth/login-page.html'),
            controller: AuthController,
            controllerAs: 'auth',
            title: ''
        })
        .state('signUp', {
            url: '/singup',
            template: require('./auth/signup-page.html'),
            controller: AuthController,
            controllerAs: 'auth',
            title: 'Registration'
        })
        .state('forgotPassword', {
            utl: '/forgotpassword',
            template: require('./auth/forgotpassword.html'),
            controller: AuthController,
            controllerAs: 'auth',
            title: 'Forgot Password'
        });
}

export default ['$stateProvider', '$urlRouterProvider', '$locationProvider', config];