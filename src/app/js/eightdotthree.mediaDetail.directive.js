(function(angular, $, window) {

  'use strict';

	angular.module('eightdotthreeApp').directive('mediaDetail', function($timeout) {

  		return {
  			restrict: 'C',
    		link: function (scope, element, attrs) {

          console.log('mediaDetail');

    		}
  		};
	});

})(window.angular, window.jQuery, window);