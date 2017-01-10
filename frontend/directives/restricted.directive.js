//RestrictedDirective.$inject = ['$rootScope'];

function RestrictedDirective(localCache) {
    'ngInject';
    return{
        restrict: 'A',
        link: function (scope, elem) {
            let isAuthorized = scope.nav.user.role === 'ADMIN';
            if (!isAuthorized) {
                elem.css('display', 'none');
            }
        }
    }
}

export default ['$rootScope', 'localCache', RestrictedDirective];