'use strict';
export class HomeController {
    constructor(mainService, $log) {
        this.mainService = mainService;
        this.getData();
        this.selectedItems = [];
        this.$log = $log;
        this.orderPrice = 0.0;
        this.itemInCart = false;
        this.errorMessage = "";
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
        let notExit = self.isDuplicate(item);
        if (notExit) {
            self.itemInCart = false;
            item.numberOfOrders = 1;
            self.selectedItems.push(item);
            let oldPrice = self.orderPrice;
            self.orderPrice = oldPrice + Number(item.price);
        }
        else {
            self.itemInCart = true;
            self.errorMessage = "Item is already selected, if you want increase count please use text input";
        }
    }

    itemCountChanged(item) {
        let self = this;
        let editedItemPrice = Number(item.price);
        self.orderPrice = self.orderPrice - (editedItemPrice * parseInt(item.numberOfOrders));
        let index = self.selectedItems.indexOf(item);
        self.selectedItems.splice(index, 1);
    }

    isDuplicate(item) {
        let self = this;
        let notFound = true;
        if (item === undefined && !item) return false;
        if (self.selectedItems.length > 0) {
            self.selectedItems.forEach((data) => {
                notFound = (data._id !== item._id);
            });
        }
        return notFound;
    }

    printOrder(divName) {
        let self = this;
        console.log(self, " ::: ", ' ::: ', divName);
        let printContents = document.getElementById(divName).innerHTML;
        console.log(self, " ::: ", printContents, ' ::: ', divName);
    }
}