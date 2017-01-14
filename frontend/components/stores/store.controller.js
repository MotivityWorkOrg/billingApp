export class StoreController {
    constructor($scope, billingService, localCache, $log) {
        'ngInject';
        this.$scope = $scope;
        this.billingService = billingService;
        this.localCache = localCache;
        this.$log = $log;
    }

    createStore(form, store) {
        let self = this;
        self.submitted = true;
        if (form.$valid) {
            //console.log('Coming in add Store', store);
            let loggedUser = JSON.parse(this.localCache.getUser('loggedUser'));
            store.user = loggedUser.username;
            let storeData = this.billingService.addStore(store);
            storeData.then((res) => {
                self.store = {};
                this.$log.log(res);
            }).catch((err) => {
                this.$log.error(err);
            });
        }
    }

    refresh() {
        this.$log.log("coming here");
        this.$scope.store = {};
    }
}