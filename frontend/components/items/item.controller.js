export class ItemController {
    constructor(billingService, $log) {
        'ngInject';
        this.billingService = billingService;
        this.$log = $log;
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

