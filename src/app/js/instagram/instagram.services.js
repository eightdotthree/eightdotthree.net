(function() {

	/**
	 * My Instagram API
	 */
	eightdotthreeApp.factory('Instagram', function($http) {

		var SETTINGS = {
			CLIENT_ID: '7d57478209ba4ed39e20d5be80935ffd',
			CLIENT_SECRET: 'a60c3978c38e4bfe93e91f196e009a2e',
			ACCESS_TOKEN: '12020150.7d57478.0b5e104ac20b44399e19fbe993deb51c',
			USER_ID: 12020150,
			API_URL: 'https://api.instagram.com/v1',
			COUNT: 32
		};

		/**
		 * Builds the Instagram API endpoint
		 */
		function buildEndpoint(func) {
			var endpoint = SETTINGS.API_URL + func + '?client_id=' + SETTINGS.CLIENT_ID + '&count=' + SETTINGS.COUNT +'&callback=JSON_CALLBACK';
			return endpoint;
		};

		function get(func, callback) {

			var endpoint;

			switch (func) {

				case '/users/media/recent/' : {
					endpoint = buildEndpoint('/users/' + SETTINGS.USER_ID + '/media/recent/');
					break;
				}

				default : {
					endpoint = buildEndpoint('/media/popular/');
				}

			}

			$http.jsonp(endpoint).success(function(response) {
	            callback(response.data);
	        });

		};

		return {
			get: get
		};

	});

})();