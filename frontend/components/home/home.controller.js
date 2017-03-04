'use strict';
import {PrintModalController} from '../print-modal/printModal.controller';
export class HomeController {
    constructor(billingService, $log, localCache, $uibModal) {
        this.mainService = billingService;
        this.localCache = localCache;
        this.$uibModal = $uibModal;
        this.getData();
        this.selectedItems = [];
        this.$log = $log;
        this.orderPrice = 0.0;
        this.itemInCart = false;
        this.paymentMethods = [{id: 1, name: 'Cash'}, {id: 2, name: 'Credit / Debit Card'},
            {id: 3, name: 'Sudexo'}, {id: 4, name: 'Pay TM'}];
    }

    getData() {
        let self = this;
        let itemService = this.mainService.getItems();
        itemService.then((res) => {
            self.items = res.data;
        }).catch((err) => {
            this.$log.log(err.data);
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
            self.error = 'Item already exist';
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

    placeOrder() {
        let self = this;
        if (self.paymentMethod !== undefined && self.paymentMethod) {
            self.itemInCart = false;
            let order = {};
            let orderItems = [];
            self.selectedItems.forEach((data) => {
                let item = {};
                item.itemName = data.itemName;
                item.numberOfOrders = data.numberOfOrders;
                item.price = data.price;
                orderItems.push(item);
            });
            order.items = orderItems;
            let loggedUser = JSON.parse(this.localCache.getUser());
            order.username = loggedUser.username;
            order.paymentMethod = self.paymentMethod;
            order.discount = self.discount;
            order.store = loggedUser.stores[0];
            let orderService = this.mainService.createOrder(order);
            orderService.then((res) => {
                self.selectedItems = [];
                self.paymentMethod = null;
                self.orderPrice = 0.0;
                self.discount = null;
                self.preparePrint(res.data);
            }).catch((err) => {
                this.$log.log("ERROR is :: ", err.message);
            });
        }
        else {
            self.itemInCart = true;
            self.error = 'Payment Type';
            self.errorMessage = "Please select payment type.";
        }
    }

    preparePrint(data) {
        let self = this;
        self.printableData = data;
        //this.$log.log(self.printableData, '   ::: In Print ');
        let printModelInstance = this.$uibModal.open({
            animation: true,
            template: require('../print-modal/print-page.html'),
            controller: PrintModalController,
            controllerAs: 'printCtrl',
            resolve: {
                orderData: function () {
                    return data;
                }
            }
        });

        printModelInstance.result.then(function () {
            printModelInstance.close();
            //this.$log.log('Coming in Modal Instance');
        });
    }
}