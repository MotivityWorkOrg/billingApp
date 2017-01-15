'use strict';
import AuthController from './auth/auth.controller';
import ItemController from './components/items/item.controller';
import {StoreController} from './components/stores/store.controller';

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
            url: '/forgotpassword',
            template: require('./auth/forgotpassword.html'),
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
        });
}

export default ['$stateProvider', '$urlRouterProvider', '$locationProvider', config];