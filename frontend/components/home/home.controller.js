'use strict';
export class HomeController {
    constructor($http, mainService) {
        this.mainService = mainService;
        this.$http = $http;
        this.getData();
    }

    getData() {
        let self = this;
        let itemService = this.mainService.getItems();
        itemService.then((res) => {
            self.items = res.data;
        });
    }
}