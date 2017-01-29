export class OrderController {
    constructor($log, billingService) {
        this.$log = $log;
        this.periodFormat = 'dd-MMMM-yyyy';
        this.billingService = billingService;
        this.orderPicker = {
            opened: false
        };

        this.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };
        this.selectionDate = {};
    }


    periodOpen() {
        let self = this;
        self.orderPicker.opened = true;
    }


    getOrders(){
        let self = this;
        let selectedOrders = this.billingService.getSelectedOrders(self.selectionDate);
        selectedOrders.then((res) =>{
            self.periodOrders = res.data;
            self.periodTotal = self.periodOrders.reduce(function (pre, item) {
                return pre + item.subTotal;
            }, 0);
            //this.$log.log(self.periodTotal);
        }).catch((err) => {
            this.$log.log(err.message);
        });
    }
}