'use strict';
export class BillingService {
    constructor($log, $http) {
        'ngInject';
        this.$log = $log;
        this.$http = $http;
    }

    addStore(store) {
        let storeItem = this.$http.post('/api/add-store', store);
        storeItem.then((res) => {
            return res.data;
        }).catch((error) => {
            this.$log.error("something went wrong ", error);
        });
        return storeItem;
    }

    getStores() {
        let storedStored = this.$http.get('/api/stores');
        storedStored.then((res) => {
            return res.data;
        }).catch((err) => {
            this.$log.error("something went wrong  ", err);
        });
        return storedStored;
    }

    forgotPassword(email) {
        console.log(email);
        let reset = this.$http.post('/api/forgot-password', email);
        reset.then((res) => {
            return res.data;
        }).catch((err) => {
            this.$log.error("something went wrong  ", err);
            return err.message;
        });
        return reset;
    }

    resetPassword(user) {
        console.log(user);
        let passwordStatus = this.$http.post('/api/reset-password', user);
        passwordStatus.then((res) => {
            return res.data;
        }).catch((err) => {
            this.$log.error("something went wrong  ", err);
            return err.message;
        });
        return passwordStatus;
    }

    addItem(item) {
        let ItemStored = this.$http.post('/api/add-item', item);
        ItemStored.then((res) => {
            return res;
        }).catch((err) => {
            this.$log.error(" Something went wrong ", err);
        });
        return ItemStored;
    }

    getItems() {
        let allItems = this.$http.get('/api/items');
        allItems.then((res) => {
            return res;
        }).catch((err) => {
            this.$log.log("Something went wrong in items get", err);
            return err;
        });
        return allItems;
    }

    createOrder(order) {
        this.$log.log(order, ' ::: :::');
        let orders = this.$http.post('./api/order', order);
        orders.then((res) => {
            return res;
        }).catch((err) => {
            this.$log.log("Something went wrong in order save", err);
            return err;
        });
        return orders;
    }
}
