AuthController.$inject = ['$scope', '$auth', '$rootScope', 'localCache', 'billingService'];

function AuthController($scope, $auth, $rootScope, localCache, billingService) {
    $scope.data = {};
    $scope.data.rolesOptions = [{id: 1, name: "USER"}, {id: 2, name: 'ADMIN'}];
    $scope.data.stores = billingService.getStores((data) => {
        $scope.data.stores = data;
        console.log($scope.data.stores);
    });
    $scope.register = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            $auth.signup(form).then(function (res) {
                if (res.status === 200) {
                    window.location.href = '/';
                }
            });
        }

    };

    $scope.login = function (form, user) {
        if (form.$valid) {
            $auth.login(user).then(function (res) {
                $scope.submitted = true;
                if (res.status === 200) {
                    $auth.setToken(res.data.token);
                    localCache.setUser(JSON.stringify(res.data.user));
                    window.location.href = '/home';
                }
            });
        }

    }
}

export default AuthController;