AuthController.$inject = ['$scope', '$http', '$auth'];

function AuthController($scope, $http, $auth) {
    $scope.submitted = true;
    $scope.data = {};
    $scope.data.rolesOptions = [{id: 1, name: "USER"}, {id: 2, name: 'ADMIN'}];
    $scope.register = function (form) {
        let vm = this;
        $auth.signup(form).then(function (res) {
            if(res.status === 200){
                window.location.href = '/';
            }
        });
    };

    $scope.login = function (user) {
        let vm = this;
        //console.log(user);
        $auth.login(user).then(function (res) {
            console.log(res);
            $auth.setToken(res.data);
        });
    }
}

export default AuthController;