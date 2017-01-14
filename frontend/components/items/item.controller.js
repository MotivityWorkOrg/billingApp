export class ItemController {
    constructor( billingService) {
        'ngInject';
        this.billingService = billingService;
    }

    createItem(form, item) {
        console.log(item);
        if(form.$valid){
            this.billingService.addItem(item);
        }
    }

    refresh() {
        let self = this;
        self.item = {};
    }

    imageChange(image){
        console.log(image);
    }
}

