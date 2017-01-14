'use strict';
export class HomeController {
    constructor($http, mainService) {
        this.mainService = mainService;
        this.$http = $http;
        this.getData();
        this.selectedItems = [];
        this.orderPrice = 0.0;
    }

    getData() {
        let self = this;
        let itemService = this.mainService.getItems();
        itemService.then((res) => {
            self.items = res.data;
        });
    }

    prepareOrder(item) {
        let self = this;
        //self.selectedItems = [];
        self.selectedItems.push(item);
        self.orderPrice = 0.0;
        self.selectedItems.forEach((data) => {
            data.numberOfOrders = 1;
            self.orderPrice += Number(data.price);
        });
        console.log(item);
    }
}