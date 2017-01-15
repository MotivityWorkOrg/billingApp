'use strict';
function RestrictedDirective() {
    'ngInject';
    return {
        restrict: 'A',
        link: function (scope, elem) {
            let isAuthorized = scope.nav.user.role === 'ADMIN';
            if (!isAuthorized) {
                elem.css('display', 'none');
            }
        }
    };
}

export default [RestrictedDirective];