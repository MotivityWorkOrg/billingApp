export class BillingService {
    constructor($log, $http) {
        'ngInject';
        this.$log = $log;
        this.$http = $http;
    }

    addStore(store) {
        this.$http.post('/api/add-store', store).then((res) => {
            return res.data;
        }).catch((error) => {
            this.$log.error("something went wrong ", error);
        })
    }

    getStores() {
        this.$http.get('/api/stores').then((res) => {
            return res.data;
        }).catch((err) => {
            this.$log.error("something went wrong  ", err)
        })
    }
}
