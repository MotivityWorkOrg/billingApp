//require('./reset.less');

import angular from './lib/angular';
import uiRouter from './lib/angular-ui-router/release/angular-ui-router.min';

import MainCtrl from './main/main.controller.js';
import appRouter from './index.route.js';
import CompareToDirective from './directives/compareTo.directive';
import config from './index.config';
import satellizer from './lib/satellizer/dist/satellizer.min';
angular.module('billing-app', [uiRouter, satellizer])
    .constant('API_URL', 'http://localhost:3000/')
    .controller('MainCtrl', MainCtrl)
    .config(appRouter)
    .config(config)
    .directive('compareTo', CompareToDirective);
