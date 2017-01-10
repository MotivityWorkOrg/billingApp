require('./reset.less');
import './lib/bootstrap/dist/css/bootstrap.css';
//require('./lib/angular-ui/common/stylesheets/angular-ui.less');
import angular from './lib/angular';
import uiRouter from './lib/angular-ui-router/release/angular-ui-router.min';
import MainCtrl from './main/main.controller.js';
import appRouter from './index.route.js';
import CompareToDirective from './directives/compareTo.directive';
import config from './index.config';
import satellizer from './lib/satellizer/dist/satellizer.min';
import {NavBarController} from './components/navbar/navbar.controller';
import navBar from './components/navbar/navbar.html';
import RestrictedDirective from './directives/restricted.directive';
import LocalCache from './services/localCache.factory';
import {StoreController} from './components/stores/store.controller';
import {BillingService} from './services/billing-service';
//import uiBootstrap from './lib/angular-ui/build/angular-ui.min';

angular.module('billing-app', [uiRouter, satellizer])
    .constant('API_URL', 'http://localhost:3000/')
    .controller('MainCtrl', MainCtrl)
    .config(appRouter)
    .config(config)
    .service('billingService', BillingService)
    .factory('localCache', LocalCache)
    .directive('compareTo', CompareToDirective)
    .controller('NavBarController', NavBarController)
    .controller('StoreController', StoreController)
    .component('navBar', {template: navBar})
    .directive('restricted', RestrictedDirective);
