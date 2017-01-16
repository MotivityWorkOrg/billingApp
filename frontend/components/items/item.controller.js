export class ItemController {
    constructor(billingService, $log) {
        'ngInject';
        this.billingService = billingService;
        this.$log = $log;
        this.categoryArray = [{id: 1, name: 'JumboKing'}, {id: 2, name: 'Sandwich'}, {id: 3, name: 'Sides'},
            {id: 4, name: 'Beverages'}];
        //this.subCategoryArray = [];
    }

    createItem(form) {
        let self = this;
        let item = self.item;
        self.submitted = true;
        if (form.$valid) {
            let storeItem = this.billingService.addItem(item);
            storeItem.then((res) => {
                this.$log.log(res);
                self.submitted = false;
                self.item = {};
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

