'use strict';
function OrderCountDirective() {
    return {
        restrict: 'A',
        link: function (scope, ele) {
            //$log.log('Coming in Order count directive');
            let homeController = scope.$parent.home;
            let selectedOrder = scope.orderItem;
            ele.bind("keyup", (e) => {
                if ((e.keyCode > 47 && e.keyCode < 58) || (e.keyCode > 95 && e.keyCode < 104) || (e.keyCode === 8 || e.keyCode === 127 )) {
                    let selectedTotal = 0.00;
                    homeController.selectedItems.forEach((data) => {
                        if(data._id !== selectedOrder._id){
                            selectedTotal += data.price * parseInt(data.numberOfOrders);
                        }
                    });
                    let editedItemPrice = Number(selectedOrder.price);
                    let revisedItemOrderAmount;
                    if (parseInt(e.currentTarget.value) > 0) {
                        revisedItemOrderAmount = selectedTotal + editedItemPrice * (parseInt(e.currentTarget.value));
                    }
                    let oderTotalPrice = Math.round(revisedItemOrderAmount);
                    scope.$apply(() => {
                        homeController.orderPrice = Number(oderTotalPrice.toFixed(2));
                        homeController.itemInCart = false;
                    });
                }
            });
            ele.bind('focusout', function (event) {
                let revisedItemOrderAmount;
                let editedItemPrice = Number(selectedOrder.price);
                if (event.currentTarget.value === undefined || event.currentTarget.value === '') {
                    event.currentTarget.value = 1;
                    revisedItemOrderAmount = editedItemPrice * (parseInt(event.currentTarget.value));
                    let revisedAmount = Math.round(revisedItemOrderAmount);
                    scope.$apply(() => {
                        homeController.orderPrice = Number(revisedAmount.toFixed(2));
                        homeController.itemInCart = false;
                    });
                }
            });
        }
    };
}
OrderCountDirective.$inject = ['$log'];
export default OrderCountDirective;