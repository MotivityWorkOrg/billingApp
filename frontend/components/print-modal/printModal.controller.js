export class PrintModalController {
    constructor($log, $window, $uibModalInstance) {
        this.printableData = {};
        this.$log = $log;
        this.$window = $window;
        this.$uibModalInstance = $uibModalInstance;
        //$log.log(':::   ', this.orderData);
    }

    //this.$window.close();


    printOrder(divName) {
        let printContents = document.getElementById(divName).innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        this.$window.print();
        document.body.innerHTML = originalContents;
        this.$log.log(' :::: ', this.$uibModalInstance.close());
    }
}