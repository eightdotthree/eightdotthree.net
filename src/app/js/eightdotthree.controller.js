(function(angular, window, document) {

    'use strict';

    angular.module('eightdotthreeApp').controller('EightdotthreeController', EightdotthreeController);

    function EightdotthreeController(Instagram, $routeParams) {

        console.group('EightdotthreeController');

        var vm = this;
        var tag = typeof $routeParams.tagName !== 'undefined' ? $routeParams.tagName : '';

        function photosLoaded(photos) {
            vm.loading = false;
            vm.photos = photos;
        }

        vm.getNextPage = function() {
            vm.loading = true;
            Instagram.getNextPage().then(photosLoaded);
        }

        vm.getFirstPage = function() {
            vm.loading = true;
            Instagram.getFirstPage(tag).then(photosLoaded);
        }

        vm.getFirstPage();

        console.groupEnd();

    }

    // Object.defineProperty(EightdotthreeController.prototype, 'loadingSpinner', {
    //     enumerable: true,
    //     configurable: true,
    //     get: function() {
    //         return this._loadingSpinner;
    //     },
    //     set: function(val) {
    //         this._loadingSpinner = val;
    //     }
    // });

    // Object.defineProperty(EightdotthreeController.prototype, 'loadMoreBtn', {
    //     enumerable: true,
    //     configurable: true,
    //     get: function() {
    //         return this._loadMoreBtn;
    //     },
    //     set: function(val) {
    //         this._loadMoreBtn = val;
    //     }
    // });

    // Object.defineProperty(EightdotthreeController.prototype, 'photos', {
    //     enumerable: true,
    //     configurable: true,
    //     get: function() {
    //         return this._photos;
    //     },
    //     set: function(val) {
    //         this._photos = val;
    //     }
    // });

    // Object.defineProperty(EightdotthreeController.prototype, 'loading', {
    //     enumerable: true,
    //     configurable: true,
    //     get: function() {
    //         return this._loading;
    //     },
    //     set: function(val) {
    //         this._loading = val;
    //     }
    // });

})(window.angular, window, document);