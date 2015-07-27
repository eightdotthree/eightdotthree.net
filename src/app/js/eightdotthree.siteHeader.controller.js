(function(angular, window) {

    'use strict';

    angular.module('eightdotthreeApp').controller('EightdotthreeSiteHeaderController', EightdotthreeSiteHeaderController);

    function EightdotthreeSiteHeaderController() {

        var INTRO_CONTENT_CLASS_NAME = 'intro-content';

        var vm = this;
        vm.infoOpen = false;
        vm.infoContainer = document.getElementById('js-intro-content');

        vm.toggleInfo = function(event) {

            if (vm.infoOpen) {
                vm.infoContainer.className = INTRO_CONTENT_CLASS_NAME;
                vm.infoOpen = false;
            } else {
                vm.infoContainer.className = INTRO_CONTENT_CLASS_NAME + ' is-open';
                vm.infoOpen = true;
            }

        }

    };

})(window.angular, window);