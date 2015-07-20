eightdotthreeApp.filter('fromTo', function() {
    return function(input, from, total, lessThan) {
        from = parseInt(from);
        total = parseInt(total);
        for (var i = from; i < from + total && i < lessThan; i++) {
            input.push(i);
        }
        return input;
    }
});

/**
 * My Instagram API
 */
eightdotthreeApp.factory('Instagram', function($http) {

	var SETTINGS = {
		CLIENT_ID: '7d57478209ba4ed39e20d5be80935ffd',
		CLIENT_SECRET: 'a60c3978c38e4bfe93e91f196e009a2e',
		ACCESS_TOKEN: '12020150.7d57478.0b5e104ac20b44399e19fbe993deb51c',
		USER_ID: 12020150,
		API_URL: 'https://api.instagram.com/v1'
	}

	/**
	 * Builds the Instagram API endpoint
	 */
	function buildEndpoint(func) {
		var endpoint = SETTINGS.API_URL + func + '?client_id=' + SETTINGS.CLIENT_ID + '&callback=JSON_CALLBACK';
		return endpoint;
	}

	function popular(callback) {
		var endPoint = buildEndpoint('/media/popular/');
        $http.jsonp(endPoint).success(function(response) {
            callback(response.data);
        });
	}

	return {
		popular: popular
	};

});

eightdotthreeApp.controller("instagramController", function($scope, $interval, Instagram) {

	$scope.pics = [];
    $scope.have = [];
    $scope.orderBy = "-likes.count";

	$scope.getImages = function() {

        Instagram.popular(function(data) {

            for (var i = 0; i < data.length; i++) {

            	console.log(data[i].images.low_resolution.url);

                if (typeof $scope.have[data[i].id] === 'undefined') {
                    $scope.pics.push(data[i]);
                    $scope.have[data[i].id] = '1';
                }

            }

        });
    };

    $scope.getImages();

});