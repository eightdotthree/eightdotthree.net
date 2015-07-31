(function(angular, window) {

	'use strict';

	/**
	 * My Instagram API
	 */
	angular.module('eightdotthreeApp').service('Instagram', function($http, $q) {

		var SETTINGS = {
			CLIENT_ID: '7d57478209ba4ed39e20d5be80935ffd',
			CLIENT_SECRET: 'a60c3978c38e4bfe93e91f196e009a2e',
			ACCESS_TOKEN: '12020150.7d57478.0b5e104ac20b44399e19fbe993deb51c',
			USER_ID: 12020150,
			API_URL: 'https://api.instagram.com/v1',
			COUNT: 32
		};

		var photos = [];
        var have = [];
        var loadedIndex = 0;
        var nextPageUrl = '';

		/**
		 * Builds the Instagram API endpoint
		 */
		function buildEndpoint(func, params) {

			var endpoint;

			switch (func) {
				case '/users/media/recent/' : {
					endpoint = SETTINGS.API_URL + '/users/' + SETTINGS.USER_ID + '/media/recent/?client_id=' + SETTINGS.CLIENT_ID + '&count=' + SETTINGS.COUNT;
					break;
				}
				case '/tags/tag-name/media/recent/' : {
					endpoint = SETTINGS.API_URL + '/tags/' + params.tag + '/media/recent/?client_id=' + SETTINGS.CLIENT_ID + '&count=' + SETTINGS.COUNT;
					break;
				}
				default : {
					endpoint = func;
				}
			}

			return endpoint + '&callback=JSON_CALLBACK';

		}

		/**
		 * call the API with the supplied endpoint
		 */
		function get(endpoint, deferred) {

			console.group('Instagram.get');
			console.info(endpoint);
			console.groupEnd();

			$http.jsonp(endpoint).success(function(response) {

	            var data = response.data;

	            if (typeof data !== 'undefined') {
	                for (var i = 0; i < data.length; i += 1) {
	                    if (typeof have[data[i].id] === 'undefined') {
	                    	photos.push(data[i]);
	                        loadedIndex += 1;
	                        have[data[i].id] = '1';
	                    }
	                }
	                nextPageUrl = response.pagination.next_url;
	            }

	            deferred.resolve(photos);

	        });

		}

		/**
		 * Gets the first page of the current endpoint
		 */
		function getFirstPage(tag) {

			console.group('Instagram.getFirstPage')
			console.info('tag: ' + tag);

			var deferred = $q.defer();
			var promise = deferred.promise;

			loadedIndex = 0;
			have = [];
			photos = [];

			var endpoint;

            if (tag !== '') {
                endpoint = buildEndpoint('/tags/tag-name/media/recent/', { tag: tag });
            } else {
                endpoint = buildEndpoint('/users/media/recent/');
            }

            console.info('endpoint: ' + endpoint);
            console.groupEnd();

            get(endpoint, deferred);

            return promise;

		};

		/**
		 * Gets the next page of the current endpoint
		 */
		function getNextPage() {

			console.group('Instagram.getNextPage');
			console.log('nextPageUrl: ' + nextPageUrl);

			var deferred = $q.defer();
			var promise = deferred.promise;

			var endpoint;

            if (nextPageUrl !== '') {
                endpoint = buildEndpoint(nextPageUrl);
                get(endpoint, deferred);
            }

            console.info('endpoint: ' + endpoint);
            console.groupEnd();

            return promise;

        };

        return {
        	getFirstPage: getFirstPage,
        	getNextPage: getNextPage,
        	photos: photos
        };

	});

})(window.angular, window);