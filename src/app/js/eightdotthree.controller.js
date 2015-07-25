(function(angular, window) {

    'use strict';

    /**
     */
    angular.module('eightdotthreeApp').controller('EightdotthreeController', function(Instagram) {

        var ctrl = this;

    	ctrl.photos = [];
        ctrl.have = [];
        ctrl.loading = true;
        ctrl.loadedIndex = 0;
        ctrl.nextPageUrl = '';

    	ctrl.getFirstPage = function() {

            ctrl.loading = true;

            var endpoint = Instagram.buildEndpoint('/users/media/recent/');
    		Instagram.get(endpoint, ctrl.processFeed);

        };

        ctrl.getNextPage = function() {

            if (ctrl.nextPageUrl !== '') {

                ctrl.loading = true;

                var endpoint = Instagram.buildEndpoint(ctrl.nextPageUrl);
                Instagram.get(endpoint, ctrl.processFeed);

            }

        };

        ctrl.processFeed = function(response) {

            var data = response.data;

            for (var i = 0; i < data.length; i += 1) {
                if (typeof ctrl.have[data[i].id] === 'undefined') {
                    ctrl.loadedIndex += 1;
                    ctrl.photos.push(data[i]);
                    ctrl.have[data[i].id] = '1';
                }
            }

            ctrl.nextPageUrl = response.pagination.next_url;
            ctrl.loading = false;

        };

        ctrl.getFirstPage();

    });

})(window.angular, window);