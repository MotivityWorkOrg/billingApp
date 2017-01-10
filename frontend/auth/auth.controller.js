AuthController.$inject = ['$scope', '$auth', '$rootScope', 'localCache'];

function AuthController($scope, $auth, $rootScope, localCache) {
    $scope.submitted = true;
    $scope.data = {};
    $scope.data.rolesOptions = [{id: 1, name: "USER"}, {id: 2, name: 'ADMIN'}];
    $scope.register = function (form) {
        $auth.signup(form).then(function (res) {
            if (res.status === 200) {
                window.location.href = '/';
            }
        });
    };

    $scope.login = function (user) {
        $auth.login(user).then(function (res) {
            if (res.status === 200) {
                $auth.setToken(res.data.token);
                localCache.setUser(JSON.stringify(res.data.user));
                window.location.href = '/home';
            }
        });
    }
}

export default AuthController;