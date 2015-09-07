(function(angular, $, window) {

  'use strict';

	angular.module('eightdotthreeApp').directive('mediaDetail', ['Instagram', '$stateParams', '$state', mediaDetail]);

	function mediaDetail(Instagram, $stateParams, $state) {

		return {
			restrict: 'C',
			controllerAs: 'mediaDetail',
			controller: function() {

				console.group('mediaDetail controller');
				
				var vm = this;
				var insta = Instagram;

				insta.getMediaDetail($stateParams.id).then(function(data) {

					console.info(data);

					vm.data = data;

					console.groupEnd();

				});

				console.groupEnd();

			},
			link: function(scope, element, attrs) {

				console.log(element)

				element.modal('show');

				element.on('hidden.bs.modal', function(event) {
					$state.go("media");
				});

				element.on('$destroy', function() {
    				element.modal('hide');
				});

			}
		};

	};

})(window.angular, window.jQuery, window);