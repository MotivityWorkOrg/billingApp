'use strict';
function AuthController($scope, $auth, $rootScope, localCache, billingService, $http) {
    $scope.data = {};
    $scope.data.rolesOptions = [{id: 1, name: "USER"}, {id: 2, name: 'ADMIN'}];
    let savedStores = billingService.getStores();
    savedStores.then((res) => {
        $scope.data.stores = res.data;
    });
    $scope.register = function (form, user) {
        $scope.submitted = true;
        if (form.$valid) {
            if ($scope.store !== undefined) {
                user.stores = [];
                user.stores.push($scope.store);
                console.log($scope.store, " :: Getting Store");
            }
            console.log(user);
            $http.post('/auth/singup', user).then(function (res) {
                if (res.status === 200) {
                    //window.location.href = '/';
                }
            });
        }

    };

    $scope.login = function (form, user) {
        $scope.submitted = true;
        if (form.$valid) {
            $auth.login(user).then(function (res) {
                if (res.status === 200) {
                    $auth.setToken(res.data.token);
                    localCache.setUser(JSON.stringify(res.data.user));
                    window.location.href = '/home';
                }
            });
        }
    };

    $scope.reset = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            let passReset = billingService.passwordReset($scope.user.email);
            passReset.then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            });
        }
    };
}
AuthController.$inject = ['$scope', '$auth', '$rootScope', 'localCache', 'billingService', '$http'];
export default AuthController;