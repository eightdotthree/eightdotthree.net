(function(angular, window) {

	'use strict';

	angular.module('eightdotthreeApp', [
		'ui.router'
	]);

	angular.module('eightdotthreeApp').config(Routes);

	function Routes($stateProvider, $urlRouterProvider) {

		// media
		$stateProvider.state('media', {
			url: '/media/recent',
			templateUrl: 'views/media.html',
			controller: 'EightdotthreePhotosController',
			controllerAs: 'cont',
			resolve: {
				photos: function(Instagram) {
					return Instagram.getFirstPage('');
				}
			}
		});

		// media/detail/:id
		$stateProvider.state('media.detail', {
			url: '/detail/:id',
			templateUrl: 'views/media.detail.html',
			controller: function($scope) {
				// $scope.items = ["A", "List", "Of", "Items"];
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
					console.log('resolve');
					return Instagram.getFirstPage($stateParams.tagName);
				}
			}
		});

		// about
		$stateProvider.state('about', {
			url: '/about',
			templateUrl: 'views/about.html'
		});

		$urlRouterProvider.otherwise('/media/recent');

	}

 })(window.angular, window);