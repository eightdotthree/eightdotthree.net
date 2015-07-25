(function(angular, $, window) {

  'use strict';

  /*
  angular.module('eightdotthreeApp').directive('photoDetails', function() {

      var controller = ['$scope', 'escapeHtmlFilter', function($scope, escapeHtmlFilter) {

        // console.log('controller');

        var caption = $scope.p.caption;
        if (caption != null) {
          caption = escapeHtmlFilter(caption.text);
        }

        // $scope.p.photoInfo = {
        //   caption: caption,
        //   numLikes: $scope.p.likes.count,
        //   numComments: $scope.p.comments.count,
        //   filter: $scope.p.filter
        // }

        console.log($scope.photoInfo);

      }];

      var link = function(scope, element) {

        // console.log('link');
        // console.log('caption: ' + scope.p.caption);

      }

      return {
        restrict: 'C',
        controller: controller,
        link: link
      };

  });
  */

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

  angular.module('eightdotthreeApp').directive('loadingSpinner', function() {

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

  angular.module('eightdotthreeApp').directive('loadMoreBtn', function() {

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

})(window.angular, window.jQuery, window);