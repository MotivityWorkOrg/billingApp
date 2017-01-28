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
        this.printableData = {
            _id: "VS20170128090351",
            discount: 0,
            discountTotal: 0,
            items: [{
                Object_id: "588c111f55ded704f416a94e",
                name: "cheese crispy veg",
                quantity: "1",
                total: 50
            }],
            paymentMethod: "Credit / Debit Card",
            store: "587f9e4e684d631b28c7c82d",
            subTotal: 50,
            total: 50,
            username: "damarlaravi",
            create: new Date()
        };
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
                console.log(res.data);
                self.selectedItems = [];
                self.paymentMethod = null;
                self.orderPrice = 0.0;
                self.discount = null;
                self.printableData = res.data;
                self.preparePrint();
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

    preparePrint() {
        let self = this;
        this.$log.log(self.printableData, '   ::: In Print ');
        let printModelInstance = this.$uibModal.open({
            animation: true,
            template: require('../print-modal/print-page.html'),
            //windowTemplateUrl: '../print-modal/print-page.html',
            controller: PrintModalController,
            controllerAs: 'printCtrl',
            resolve: {
                orderData: function () {
                    return self.printableData;
                }
            }
        });

        printModelInstance.result.then(function () {
            printModelInstance.close();
            console.log('Coming in Modal Instance');
        });
    }
}