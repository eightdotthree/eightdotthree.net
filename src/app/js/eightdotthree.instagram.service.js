(function(angular, window) {

	'use strict';

	/**
	 * My Instagram API
	 */
	angular.module('eightdotthreeApp').service('Instagram', Instagram);

	function Instagram($http, $q) {

		var SETTINGS = {
			CLIENT_ID: '7d57478209ba4ed39e20d5be80935ffd',
			CLIENT_SECRET: 'a60c3978c38e4bfe93e91f196e009a2e',
			ACCESS_TOKEN: '12020150.7d57478.0b5e104ac20b44399e19fbe993deb51c',
			USER_ID: 12020150,
			API_URL: 'https://api.instagram.com/v1',
			COUNT: 32
		};

		var MINE = 'mine';
		var THEIRS = 'theirs';

		var whose = MINE; // keep track of whose photos we're viewing

		var photos = [];
		var hashtags = [];
        var havePhoto = [];
        var haveTag = [];
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

	            var responseData = response.data;

	            if (typeof responseData !== 'undefined') {

	                for (var i = 0; i < responseData.length; i += 1) {

	                	var data = responseData[i];

	                    if (typeof havePhoto[data.id] === 'undefined') {
	                    	photos.push(data);
	                        havePhoto[data.id] = '1';
	                    }

	                    // deal with the tags
	                    var tags = data.tags;

	                    if (typeof tags !== 'undefined' && whose === MINE) {
	                    	var tagLen = tags.length;
	                    	for (var j = 0; j < tagLen; j += 1) {
	                    		var tag = tags[j];
	                    		if (typeof haveTag[tag] === 'undefined') {
	                    			hashtags.push(tag);
	                    			haveTag[tag] = '1';
	                    		}
	                    	}
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

			console.group('Instagram.getFirstPage');

			havePhoto = [];
			photos = [];
			nextPageUrl = '';

			if (tag !== '') {
				whose = THEIRS;
			} else {
				whose = MINE;
			}

			var endpoint;
			var deferred = $q.defer();
			var promise = deferred.promise;

            if (tag !== '') {
                endpoint = buildEndpoint('/tags/tag-name/media/recent/', { tag: tag });
            } else {
                endpoint = buildEndpoint('/users/media/recent/');
            }

            console.info('endpoint: ' + endpoint);
            console.groupEnd();

            get(endpoint, deferred);

            return promise;

		}

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

        }


        /**
         * Gets the detail of a media item
         */
        function _getDetail(id) {

        	console.group('getDetail ' + id);

        	var endpoint;
			var deferred = $q.defer();
			var promise = deferred.promise;

			return promise;

        	console.groupEnd();

        }

        return {
        	getFirstPage: getFirstPage,
        	getNextPage: getNextPage,
        	getDetail: _getDetail,
        	photos: photos,
        	hashtags: hashtags
        };

	}

	Object.defineProperty(Instagram.prototype, 'whose', {
        enumerable: true,
        configurable: true,
        get: function() {
            return this._whose;
        },
        set: function(val) {
            this._whose = val;
        }
    });

})(window.angular, window);