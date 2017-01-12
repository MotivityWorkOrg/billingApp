export class StoreController {
    constructor($scope, billingService, localCache) {
        'ngInject';
        this.$scope = $scope;
        this.billingService = billingService;
        this.localCache = localCache;
    }

    createStore(form, store) {
        let self = this;
        self.submitted = true;
        if (form.$valid) {
            //console.log('Coming in add Store', store);
            let loggedUser= JSON.parse(this.localCache.getUser('loggedUser'));
            store.user = loggedUser.username;
            this.billingService.addStore(store);
        }
    }

    refresh() {
        console.log("coming here");
        this.$scope.store = {};
    }
}