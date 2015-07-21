(function() {

  'use strict';

	eightdotthreeApp.directive('unveil', function($timeout) {

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

  eightdotthreeApp.directive('loadingSpinner', function() {

    return {
      restrict: 'C',
      link: function($scope, element, attrs) {

        $scope.$watch('loading', function(newValue, oldValue) {

          if (!newValue) {
            element.removeClass('is-loading');
          } else {
            element.addClass('is-loading');
          }

        });

      }
    };

  });

  eightdotthreeApp.directive('loadMoreBtn', function() {

    return {
      restrict: 'C',
      link: function ($scope, element, attrs) {

        element.bind('click', function() {
          $scope.getNextPage();
        });

        $scope.$watch('loading', function(newValue, oldValue) {

          if (!newValue) {
            element.removeClass('is-loading');
          } else {
            element.addClass('is-loading');
          }

        });

      }
    };

  });

})(eightdotthreeApp);