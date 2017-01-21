'use strict';
function AuthController($scope, $auth, localCache, billingService) {
    $scope.data = {};
    $scope.data.rolesOptions = [{id: 1, name: "USER"}, {id: 2, name: 'ADMIN'}];
    let savedStores = billingService.getStores();
    $scope.passwordExpired = false;
    $scope.errorMessage = "";
    savedStores.then((res) => {
        $scope.data.stores = res.data;
    });
    $scope.register = function (form, user) {
        $scope.submitted = true;
        if (form.$valid) {
            if ($scope.store !== undefined) {
                user.stores = [];
                user.stores.push($scope.store);
            }
            $auth.post('/auth/singup', user).then(function (res) {
                if (res.status === 200) {
                    window.location.href = '/';
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
            let passReset = billingService.forgotPassword($scope.user);
            passReset.then((res) => {
                if (res.status === 200)
                    window.location.href = '/login';
            }).catch((err) => {
                console.log(err);
            });
        }
    };

    $scope.resetPassword = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            let reset = billingService.resetPassword($scope.user);
            reset.then((res) => {
                if (res.status === 200){
                    window.location.href = '/login';
                }
            }).catch((err) => {
                $scope.passwordExpired = true;
                $scope.errorMessage = err.data;
            });
        }
    };
}
AuthController.$inject = ['$scope', '$auth', 'localCache', 'billingService'];
export default AuthController;