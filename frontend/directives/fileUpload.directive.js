'use strict';
function FileUploadDirective($q) {
    let slice = Array.prototype.slice;
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, ngModel) {
            if (!ngModel) return;

            ngModel.$render = function () {
            };

            function readFile(file) {
                let deferred = $q.defer();

                let reader = new FileReader();
                reader.onload = function (e) {
                    deferred.resolve(e.target.result);
                };
                reader.onerror = function (e) {
                    deferred.reject(e);
                };
                reader.readAsDataURL(file);
                return deferred.promise;
            }

            element.bind('change', function (e) {
                let element = e.target;

                $q.all(slice.call(element.files, 0).map(readFile))
                    .then(function (values) {
                        if (element.multiple) ngModel.$setViewValue(values);
                        else ngModel.$setViewValue(values.length ? values[0] : null);
                    });
            });
        }
    };
}
FileUploadDirective.$inject = ['$q'];
export default FileUploadDirective;