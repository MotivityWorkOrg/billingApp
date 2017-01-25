export class ItemController {
    constructor(billingService, localCache, $log) {
        'ngInject';
        this.billingService = billingService;
        this.$log = $log;
        this.categoryArray = [{id: 1, name: 'JumboKing'}, {id: 2, name: 'Sandwich'}, {id: 3, name: 'Sides'},
            {id: 4, name: 'Beverages'}];
        this.stores = JSON.parse(localCache.getStores());
    }

    createItem(form) {
        let self = this;
        let item = self.item;
        self.submitted = true;
        if (form.$valid) {
            let storeItem = this.billingService.addItem(item);
            storeItem.then((res) => {
                self.submitted = false;
                self.item = {};
                window.location.href = '/home';
            }).catch((err) => {
                this.$log.error(err);
            });
        }
    }

    refresh() {
        let self = this;
        self.item = {};
    }
}

