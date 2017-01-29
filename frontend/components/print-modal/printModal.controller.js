export class PrintModalController {
    constructor($scope, $log, $window, $uibModalInstance, orderData) {
        this.$log = $log;
        this.$window = $window;
        this.$uibModalInstance = $uibModalInstance;
        this.$scope = $scope;
        orderData.create = new Date();
        this.$scope.orderData = orderData;
        $log.log(':::   ', this.orderData);
    }

    //this.$window.close();


    printOrder(divName) {
        //let originalContents = document.body.innerHTML;
        this.$uibModalInstance.close();
        document.body.innerHTML = document.getElementById(divName).innerHTML;
        this.$window.print();
        this.$window.location = '/home';
        //document.body.innerHTML = originalContents;
        this.$log.log(' :::: ', this.$uibModalInstance.close());
    }
}