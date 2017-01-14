'use strict';
function MainFactory($http) {

    return {
        getItems: function () {
            let allItems = $http.get('/api/items');
            allItems.then(function (err, res) {
                if (err) {
                    return err.message;
                }
                return res.data;
            });
            return allItems;
        }
    };
}

export default ['$http', MainFactory];
