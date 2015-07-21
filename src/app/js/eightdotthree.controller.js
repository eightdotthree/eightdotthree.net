(function() {

    'use strict';

    /**
     */
    eightdotthreeApp.controller('EightdotthreeController', function($scope, Instagram) {

    	$scope.photos = [];
        $scope.have = [];
        $scope.loading = true;
        $scope.loadedIndex = 0;
        $scope.nextPageUrl = '';

    	$scope.getFirstPage = function() {

            $scope.loading = true;

            var endpoint = Instagram.buildEndpoint('/users/media/recent/');
    		Instagram.get(endpoint, $scope.processFeed);

        };

        $scope.getNextPage = function() {

            if ($scope.nextPageUrl !== '') {

                $scope.loading = true;

                var endpoint = Instagram.buildEndpoint($scope.nextPageUrl);
                Instagram.get(endpoint, $scope.processFeed);

            }

        };

        $scope.processFeed = function(response) {

            var data = response.data;

            for (var i = 0; i < data.length; i += 1) {
                if (typeof $scope.have[data[i].id] === 'undefined') {
                    $scope.loadedIndex += 1;
                    $scope.photos.push(data[i]);
                    $scope.have[data[i].id] = '1';
                }
            }

            $scope.nextPageUrl = response.pagination.next_url;
            $scope.loading = false;

        };

        $scope.getFirstPage();

    });

})();