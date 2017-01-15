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

    addItem(item) {
        let ItemStored = this.$http.post('/api/add-item', item);
        ItemStored.then((res) => {
            return res;
        }).catch((err) => {
            this.$log.error(" Somthing went wrong ", err);
        });
        return ItemStored;
    }
}
