(function(angular, $, window, document) {

  'use strict';

	angular.module('eightdotthreeApp').directive('navbar', function($timeout) {

  		return {
  			restrict: 'C',
    		link: function (scope, element, attrs) {

          var SHORT_NAVBAR_SCROLL_HEIGHT = 800;

          var navbar = document.getElementById(attrs.id);
          var navbarHeight = navbar.offsetHeight;

    			$timeout(function() {

            $(window).on('scroll', $.proxy(function(event) {

              var scrollTop = document.body.scrollTop;

              if (scrollTop > navbarHeight) {
                navbar.classList.add('navbar-off-screen');
              } else if (scrollTop > SHORT_NAVBAR_SCROLL_HEIGHT) {
                navbar.classList.remove('navbar-off-screen');
              } else if (scrollTop < navbarHeight + 20) {
                navbar.classList.remove('navbar-off-screen');
              }

              if (scrollTop > SHORT_NAVBAR_SCROLL_HEIGHT) {
                navbar.classList.add('navbar-short');
              } else {
                navbar.classList.remove('navbar-short');
              }

            }, this));

    			}, 0);

    		}
  		};
	});

})(window.angular, window.jQuery, window, document);