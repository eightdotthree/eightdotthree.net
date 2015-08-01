(function(angular, window) {

	'use strict';

	angular.module('eightdotthreeApp', [
		'ngRoute'
	]);

	angular.module('eightdotthreeApp').config(['$routeProvider', Routes]);

	function Routes($routeProvider) {

		$routeProvider
			.when('/', {
				controller: 'EightdotthreePhotosController',
				controllerAs: 'cont',
				templateUrl: 'views/photos.html'
			})
			.when('/tag/:tagName', {
				controller: 'EightdotthreePhotosController',
				controllerAs: 'cont',
				templateUrl: 'views/photos.html'
			})
			.otherwise({
				redirectTo: '/'
			});

	}

 })(window.angular, window);