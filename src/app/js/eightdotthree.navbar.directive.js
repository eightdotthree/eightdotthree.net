(function(angular, $, window, document) {

  'use strict';

	angular.module('eightdotthreeApp').directive('navbar', function($timeout) {

  		return {
  			restrict: 'C',
    		link: function (scope, element, attrs) {

          var SHORT_NAVBAR_SCROLL_HEIGHT = 800;
          var SCROLLING_UP = 'up';
          var SCROLLING_DOWN = 'down';

          var navbar = document.getElementById(attrs.id);
          var navbarHeight = navbar.offsetHeight;
          var navbarState = SCROLLING_UP;

    			$timeout(function() {

            $(window).on('scroll', $.proxy(function(event) {

              var scrollTop = document.body.scrollTop;

              if (scrollTop <= navbarHeight - navbarHeight / 2  && navbarState === SCROLLING_DOWN) {
                navbarState = SCROLLING_UP;
                navbar.classList.remove('navbar-off-screen-up');
                navbar.classList.remove('navbar-off-screen-down');
                navbar.classList.remove('navbar-short');
              }

              // when the photos view is covering the navbar
              if (scrollTop > navbarHeight + navbarHeight * 2 && navbarState === SCROLLING_UP) {
                navbar.classList.add('navbar-off-screen-up');
              }

              // once the photos view is covering the navbar, position offscreen for the transition
              // if (scrollTop > navbarHeight && navbarState === SCROLLING_DOWN) {
              //   navbar.classList.add('navbar-off-screen-down');
              // }

              // when the photos are about to uncover the photos view
              // if (scrollTop < navbarHeight + 10 && navbarState === SCROLLING_DOWN) {
              //   navbar.classList.remove('navbar-off-screen-up');
              //   navbar.classList.remove('navbar-off-screen-down');
              // }

              if (scrollTop > SHORT_NAVBAR_SCROLL_HEIGHT) {
                navbar.classList.add('navbar-short');
                navbarState = SCROLLING_DOWN;
              }

            }, this));

    			}, 0);

    		}
  		};
	});

})(window.angular, window.jQuery, window, document);