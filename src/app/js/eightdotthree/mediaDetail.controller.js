(function(angular, window, document) {

    'use strict';

    angular.module('eightdotthreeApp').controller('EightdotthreeMediaDetailController', EightdotthreeMediaDetailController);

    function EightdotthreeMediaDetailController(Instagram) {

        console.group('EightdotthreeMediaDetailController');

        var vm = this;
        // vm.photos = photos;

        // var tag = typeof $routeParams.tagName !== 'undefined' ? $routeParams.tagName : '';

        // function photosLoaded(photos) {
        //     vm.loading = false;
        //     vm.photos = photos;
        // }

        // vm.getNextPage = function() {
        //     vm.loading = true;
        //     Instagram.getNextPage().then(photosLoaded);
        // };

        // vm.getFirstPage = function() {
        //     vm.loading = true;
        //     Instagram.getFirstPage(tag).then(photosLoaded);
        // };

        console.groupEnd();

    }

    // Object.defineProperty(EightdotthreePhotosController.prototype, 'loadingSpinner', {
    //     enumerable: true,
    //     configurable: true,
    //     get: function() {
    //         return this._loadingSpinner;
    //     },
    //     set: function(val) {
    //         this._loadingSpinner = val;
    //     }
    // });

})(window.angular, window, document);