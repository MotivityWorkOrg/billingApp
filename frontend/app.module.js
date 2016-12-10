require('./reset.less');

import angular from './lib/angular';
import uiRouter from './lib/angular-ui-router/release/angular-ui-router.min';

import MainCtrl from './main/main.controller.js';
import appConfig from './config.module.js';

angular.module('billing-app', [uiRouter])
  .controller('MainCtrl', MainCtrl)
  .config(appConfig);
