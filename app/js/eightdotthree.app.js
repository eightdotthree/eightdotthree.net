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
				accessToken: eightdotthree.settings.instagramAccessToken,
				clientId: eightdotthree.settings.instagramClientID,
				get: 'user',
				limit: 100,
				resolution: 'standard_resolution',
				//tagName: 'puglife',
				target: 'instafeed',
				template: '<div class="instafeed-item"><a class="instafeed-link" href="{{link}}"><div class="instafeed-details"><h2>{{caption}}</h2><p>{{likes}} likes, {{comments}} comments, {{model.filter}}</div><img data-src="{{image}}" alt="{{caption}}" class="instafeed-img unveil" width="612" height="612"/></a></div>',
				userId: eightdotthree.settings.instagramUserID,
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