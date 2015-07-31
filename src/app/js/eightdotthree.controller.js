(function(angular, window, document) {

    'use strict';

    angular.module('eightdotthreeApp').controller('EightdotthreeController', EightdotthreeController);

    function EightdotthreeController(Instagram, $routeParams) {

        console.group('EightdotthreeController');

        var vm = this;
        var tag = typeof $routeParams.tagName !== 'undefined' ? $routeParams.tagName : '';

        console.info('tag: ' + tag);

        vm.loading = Instagram.loading;
        vm.photos = Instagram.photos;

        vm.getNextPage = function() {
            Instagram.getNextPage();
        }

        Instagram.getFirstPage(tag);

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

})(window.angular, window, document);