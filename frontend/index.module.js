require('./reset.less');
import './lib/angular-bootstrap/ui-bootstrap-csp.css';
import './lib/bootstrap/dist/css/bootstrap.css';
window.$ = window.jQuery = require('./lib/jquery/dist/jquery.min');
window.jQuery = jQuery;
require('./lib/bootstrap/dist/js/bootstrap.min');
import angular from './lib/angular';
import uibs from './lib/angular-bootstrap';
import uiRouter from './lib/angular-ui-router/release/angular-ui-router.min';
import appRouter from './index.route.js';
import CompareToDirective from './directives/compareTo.directive';
import config from './index.config';
import satellizer from './lib/satellizer/dist/satellizer.min';
import {NavBarController} from './components/navbar/navbar.controller';
import navBar from './components/navbar/navbar.html';
import RestrictedDirective from './directives/restricted.directive';
import DiscountDirective from './directives/discount.directive';
import LocalCache from './services/localCache.factory';
import {StoreController} from './components/stores/store.controller';
import {BillingService} from './services/billing.service';
import MongooseErrorDirective from './directives/mongoose-error.directive';
import {ItemController} from './components/items/item.controller';
import FileUploadDirective from './directives/fileUpload.directive';
import {HomeController} from './components/home/home.controller';
import NumberOnlyDirective from './directives/numberOnly.directive';
import OrderCountDirective from './directives/oderCount.directive';
import {OrderController} from './components/order/order.controller';
import {PrintModalController} from './components/print-modal/printModal.controller';


angular.module('billing-app', [uibs, uiRouter, satellizer])
    .constant('API_URL', 'http://localhost:3000/')
    .config(appRouter)
    .config(config)
    .service('billingService', BillingService)
    .factory('localCache', LocalCache)
    .controller('NavBarController', NavBarController)
    .controller('StoreController', StoreController)
    .controller('ItemController', ItemController)
    .controller('HomeController', HomeController)
    .controller('OrderController', OrderController)
    .controller('PrintModalController', PrintModalController)
    .component('navBar', {template: navBar})
    .directive('compareTo', CompareToDirective)
    .directive('restricted', RestrictedDirective)
    .directive('discount', DiscountDirective)
    .directive('mongooseError', MongooseErrorDirective)
    .directive('fileUpload', FileUploadDirective)
    .directive('numberOnly', NumberOnlyDirective)
    .directive('orderCount', OrderCountDirective);
