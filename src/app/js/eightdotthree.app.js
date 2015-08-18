(function(angular, window) {

	'use strict';

	angular.module('eightdotthreeApp', [
		'ui.router'
	]);

	angular.module('eightdotthreeApp').config(Routes);

	function Routes($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/');

		// home / default
		$stateProvider.state('home', {
			url: '/',
			templateUrl: 'views/photos.html',
			controller: 'EightdotthreePhotosController',
			controllerAs: 'cont',
			resolve: {
				photos: function(Instagram) {
					return Instagram.getFirstPage('');
				}
			}
		});

		// tag/:tagName
		$stateProvider.state('tag', {
			url: '/tag/:tagName',
			templateUrl: 'views/photos.html',
			controller: 'EightdotthreePhotosController',
			controllerAs: 'cont',
			resolve: {
				photos: function(Instagram, $stateParams) {
					return Instagram.getFirstPage($stateParams.tagName);
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