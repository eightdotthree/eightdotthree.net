(function(angular, $, window) {

  'use strict';

	angular.module('eightdotthreeApp').directive('unveil', function($timeout) {

  		return {
  			restrict: 'C',
    		link: function (scope, element, attrs) {

    			$timeout(function() {

            $(element).unveil({
              threshold: 10,
              attrib: 'data-unveil-src',
              callback: function() {
                $(this).load(function() {
                 $(this).addClass('unveiled');
                });
              }
            });

    			}, 0);

    		}
  		};
	});

})(window.angular, window.jQuery, window);