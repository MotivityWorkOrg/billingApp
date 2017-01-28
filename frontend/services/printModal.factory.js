'use strict';
import {PrintModalController} from '../components/print-modal/printModal.controller';

function PrintModalFactory($uibModal) {
    return {
        openModal: function () {
            return $uibModal.open({
                controller: PrintModalController,
                controllerAs: 'printCtrl',
                templateUrl: require('../components/print-modal/print-page.html'),
                resolve: {
                    items: function () {
                        return {
                            title: title,
                            message: message
                        };
                    }
                }
            });
        }
    };

}
PrintModalFactory.inject = ['$uibModal'];
export default PrintModalFactory;