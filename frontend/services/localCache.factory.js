'use strict';
function LocalCache($window) {
    return {
        setUser: function (val) {
            $window.localStorage && $window.localStorage.setItem('loggedUser', val);
            return this;
        },
        getUser: function () {
            return $window.localStorage && $window.localStorage.getItem('loggedUser');
        },
        setStores: function (val) {
            $window.localStorage && $window.localStorage.setItem('stores', val);
            return this;
        },
        getStores:function () {
            return $window.localStorage && $window.localStorage.getItem('stores');
        }
    };
}

export default ['$window', '$rootScope', LocalCache];