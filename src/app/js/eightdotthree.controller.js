(function() {

    'use strict';

    /**
     */
    eightdotthreeApp.controller('EightdotthreeController', function($scope, Instagram) {

    	$scope.photos = [];
        $scope.have = [];

    	$scope.getImages = function() {
    		Instagram.get('/users/media/recent/', function(data) {
                for (var i = 0; i < data.length; i++) {
                    if (typeof $scope.have[data[i].id] === 'undefined') {
                        $scope.photos.push(data[i]);
                        $scope.have[data[i].id] = '1';
                    }
                }
            });
        };

        $scope.getImages();

    });

})();