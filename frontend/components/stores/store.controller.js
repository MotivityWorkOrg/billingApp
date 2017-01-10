export class StoreController {
    constructor($scope, billingService) {
        'ngInject';
        this.$scope = $scope;
        this.billingService = billingService;
    }

    createStore(store) {
        console.log('Coming in add Store', store);
        this.billingService.addStore(store);
    }

    refresh(e){
        console.log("coming here");
        this.$scope.store = {};
    }
}
