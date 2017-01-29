export class OrderController{
    constructor($log){
        this.$log = $log;
        this.periodFormat = 'MMMM/yyyy';
        this.periodPicker = {
            opened: false
        };
        this.dateOptions = {
            maxDate: new Date(),
            minMode: 'month'
        };
    }
    adminViewMonthChange  () {

    }

    periodDatePickerOpen () {
        let self = this;
        this.$log.log(' Coming here');
        self.periodPicker.opened = true;
    }
}