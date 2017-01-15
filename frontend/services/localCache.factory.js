'use strict';
function LocalCache($window) {
    return {
        setUser: function (val) {
            $window.localStorage && $window.localStorage.setItem('loggedUser', val);
            return this;
        },
        getUser: function () {
            return $window.localStorage && $window.localStorage.getItem('loggedUser');
        }
    };
}

export default ['$window', '$rootScope', LocalCache];