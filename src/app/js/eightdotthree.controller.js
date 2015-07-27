(function(angular, window, document) {

    'use strict';

    angular.module('eightdotthreeApp').controller('EightdotthreeController', EightdotthreeController);

    function EightdotthreeController(Instagram) {

        var vm = this;

        vm.loadingSpinner = document.getElementById('js-loading-spinner');
        vm.loadMoreBtn = document.getElementById('js-load-more-btn');
        vm.photos = [];
        vm.have = [];
        vm.loading = true;
        vm.loadedIndex = 0;
        vm.nextPageUrl = '';

        vm.getFirstPage = function() {

            vm.loading = true;

            var endpoint = Instagram.buildEndpoint('/users/media/recent/');
            Instagram.get(endpoint, vm.processFeed);

        };

        vm.getNextPage = function() {

            if (vm.nextPageUrl !== '') {

                vm.loading = true;

                var endpoint = Instagram.buildEndpoint(vm.nextPageUrl);
                Instagram.get(endpoint, vm.processFeed);

            }

        };

        vm.processFeed = function(response) {

            var data = response.data;

            for (var i = 0; i < data.length; i += 1) {
                if (typeof vm.have[data[i].id] === 'undefined') {
                    vm.loadedIndex += 1;
                    vm.photos.push(data[i]);
                    vm.have[data[i].id] = '1';
                }
            }

            vm.nextPageUrl = response.pagination.next_url;
            vm.loading = false;

        };

        vm.getFirstPage();

    }


    Object.defineProperty(EightdotthreeController.prototype, 'loadingSpinner', {
        enumerable: true,
        configurable: true,
        get: function() {
            return this._loadingSpinner;
        },
        set: function(val) {
            this._loadingSpinner = val;
        }
    });

    Object.defineProperty(EightdotthreeController.prototype, 'loadMoreBtn', {
        enumerable: true,
        configurable: true,
        get: function() {
            return this._loadMoreBtn;
        },
        set: function(val) {
            this._loadMoreBtn = val;
        }
    });

    Object.defineProperty(EightdotthreeController.prototype, 'loading', {
        enumerable: true,
        configurable: true,
        get: function () {
            return this._loading;
        },
        set: function (val) {

            this._loading = val;

            var spinner = this._loadingSpinner;
            var loadMoreBtn = this._loadMoreBtn;

            if (typeof spinner !== 'undefined') {
                if (!val) {
                    spinner.className = 'loading-spinner';
                } else {
                    spinner.className = spinner.className + ' is-loading';
                }
            }

            if (typeof loadMoreBtn !== 'undefined') {
                if (!val) {
                    loadMoreBtn.className = 'load-more-btn';
                } else {
                    loadMoreBtn.className = loadMoreBtn.className + ' is-loading';
                }
            }
        }
    });



})(window.angular, window, document);