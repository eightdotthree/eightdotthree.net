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

			var loadButton = document.getElementById('js-load-more-btn');

			var feed = new Instafeed (
			{
				accessToken: eightdotthree.settings.INSTAGRAM_ACCESS_TOKEN,
				clientId: eightdotthree.settings.INSTAGRAM_CLIENT_ID,
				userId: eightdotthree.settings.INSTAGRAM_USER_ID,
				get: 'user',
				limit: 100,
				resolution: 'standard_resolution',
				//tagName: 'puglife',
				target: 'instafeed',
				template: '<div class="photo-item"><a class="photo-item-link" href="{{link}}"><div class="photo-item-details"><h2>{{caption}}</h2><p>{{likes}} likes, {{comments}} comments, {{model.filter}}</div><img data-src="{{image}}" alt="{{caption}}" class="photo-item-img unveil" width="612" height="612"/></a></div>',
				after: function () {

					// enable lazy loading for all of the newly loaded images
					eightdotthree.app.unveil();

					// disable button if no more results to load
					if (!this.hasNext()) {
						loadButton.setAttribute('disabled', 'disabled');
					}

				},
			});

			loadButton.addEventListener('click', function (event) {
				feed.next();
				event.preventDefault();
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