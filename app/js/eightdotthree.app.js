/*global $:false */
/*global Instafeed:false */

var eightdotthree = eightdotthree || {};

$(function () {

	'use strict';

	eightdotthree.app.init();

});

(function () {

	'use strict';

	eightdotthree.app = {

		$container: null,

		/**
		 * init
		 */
		init: function () {

			var loadButton = document.getElementById('instafeed-load-more-btn');

			var feed = new Instafeed (
			{
				accessToken: '12020150.7d57478.0b5e104ac20b44399e19fbe993deb51c',
				clientId: '7d57478209ba4ed39e20d5be80935ffd',
				get: 'user',
				limit: 100,
				resolution: 'standard_resolution',
				//tagName: 'puglife',
				target: 'instafeed',
				template: '<div class="instafeed-item"><a class="instafeed-link" href="{{link}}"><div class="instafeed-details"><h2>{{caption}}</h2><p>{{likes}} likes, {{comments}} comments, {{model.filter}}</div><img data-src="{{image}}" alt="{{caption}}" class="instafeed-img unveil" width="612" height="612"/></a></div>',
				userId: 12020150,
				after: function () {

					// enable lazy loading for all of the newly loaded images
					eightdotthree.app.unveil();

					// disable button if no more results to load
					if (!this.hasNext()) {
						loadButton.setAttribute('disabled', 'disabled');
					}

				},
			});

			loadButton.addEventListener('click', function () {
				feed.next();
			});

			feed.run();

		},

		unveil: function () {

			$('.unveil').unveil(100, function () {

				$(this).load(function() {
					$(this).addClass('unveiled');
				});

			});

		}

	};

})();