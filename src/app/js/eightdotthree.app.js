(function(angular, window) {

	'use strict';

	angular.module('eightdotthreeApp', [
		'ui.router'
	]);

	angular.module('eightdotthreeApp').config(Routes);

	function Routes($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/media');

		// media
		$stateProvider.state('media', {
			url: '/media',
			templateUrl: 'views/media.html',
			controller: 'EightdotthreePhotosController',
			controllerAs: 'cont',
			resolve: {
				photos: function(Instagram) {
					return Instagram.getFirstPage('');
				}
			}
		});

		// media/tag/:tagName
		$stateProvider.state('tag', {
			url: '/media/tag/:tagName',
			templateUrl: 'views/media.html',
			controller: 'EightdotthreePhotosController',
			controllerAs: 'cont',
			resolve: {
				photos: function(Instagram, $stateParams) {
					return Instagram.getFirstPage($stateParams.tagName);
				}
			}
		});

		// media/detail/:id
		$stateProvider.state('detail', {
			url: '/media/detail/:id',
			templateUrl: 'views/media.html',
			controller: 'EightdotthreePhotosController',
			controllerAs: 'cont',
			resolve: {
				detail: function(Instagram, $stateParams) {
					return Instagram.getDetail($stateParams.id);
				}
			}
		});

		// about
		$stateProvider.state('about', {
			url: '/about',
			templateUrl: 'views/about.html'
		});

	}

 })(window.angular, window);