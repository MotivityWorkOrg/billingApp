'use strict';
import AuthController from './auth/auth.controller';
import ItemController from './components/items/item.controller';

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
            url: '/forgot-password',
            template: require('./auth/forgot-password.html'),
            controller: AuthController,
            controllerAs: 'auth',
            title: 'Forgot Password'
        })
        .state('items', {
            url: '/items',
            template: require('./components/items/items-page.html'),
            controller: ItemController,
            title: 'items'
        })
        .state('home', {
            url: '/home',
            template: require('./components/home/home-page.html')
        })
        .state('stores', {
            url: '/stores',
            template: require('./components/stores/store-page.html')
        }).state('reset', {
            url: '/reset-password',
            template: require('./auth/reset-password.html'),
            controller: AuthController
        });
}

export default ['$stateProvider', '$urlRouterProvider', '$locationProvider', config];