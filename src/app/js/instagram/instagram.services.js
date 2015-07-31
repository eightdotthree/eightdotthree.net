(function(angular, window) {

	'use strict';

	/**
	 * My Instagram API
	 */
	angular.module('eightdotthreeApp').factory('Instagram', function($http) {

		var SETTINGS = {
			CLIENT_ID: '7d57478209ba4ed39e20d5be80935ffd',
			CLIENT_SECRET: 'a60c3978c38e4bfe93e91f196e009a2e',
			ACCESS_TOKEN: '12020150.7d57478.0b5e104ac20b44399e19fbe993deb51c',
			USER_ID: 12020150,
			API_URL: 'https://api.instagram.com/v1',
			COUNT: 32
		};

		var instagram = {};
		instagram.photos = [];
		instagram.loading = true;

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
		function get(endpoint, callback) {

			instagram.loading = true;

			console.group('get');
			console.info(endpoint);
			console.groupEnd();

			$http.jsonp(endpoint).success(function(response) {
				instagram.loading = false;
	            processFeed(response);
	        });

		}

		function processFeed(response) {

			var data = response.data;

			console.group('processFeed');
			// console.group('data');
   			// console.info(data);
			// console.groupEnd();

            if (typeof data !== 'undefined') {
                for (var i = 0; i < data.length; i += 1) {
                    if (typeof have[data[i].id] === 'undefined') {
                    	instagram.photos.push(data[i]);
                        loadedIndex += 1;
                        have[data[i].id] = '1';
                    }
                }
                nextPageUrl = response.pagination.next_url;
            }

            console.info(instagram.photos);

            console.groupEnd();

        }

		/**
		 * Gets the first page of the current endpoint
		 */
		instagram.getFirstPage = function(tag) {

			nextPageUrl = '';
			loadedIndex = 0;
			have = [];

			instagram.photos = [];

			console.group('getFirstPage')
			console.info('tag: ' + tag);

			var endpoint;

            if (tag !== '') {
                endpoint = buildEndpoint('/tags/tag-name/media/recent/', { tag: tag });
            } else {
                endpoint = buildEndpoint('/users/media/recent/');
            }

            console.info('endpoint: ' + endpoint);
            console.groupEnd();

            get(endpoint);


		}

		/**
		 * Gets the next page of the current endpoint
		 */
		instagram.getNextPage = function() {

			console.group('getNextPage');

			var endpoint;

            if (nextPageUrl !== '') {

                endpoint = buildEndpoint(nextPageUrl);
                get(endpoint);

            }

            console.info('endpoint: ' + endpoint);
            console.groupEnd();

        };

        return instagram;

	});

})(window.angular, window);