(function(angular, window) {

    'use strict';

    angular.module('loading', []).directive('loading', Loading);

    function Loading($http) {
        return {
            restrict: 'AC',
            link: function (scope, elem, attrs) {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };
                scope.$watch(scope.isLoading, function(v) {
                    console.log('scope.isLoading')
                    if (v) {
                        elem.show();
                    } else {
                        elem.hide();
                    }
                });
            }
        }
    }

})(window.angular, window)