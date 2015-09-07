(function(angular, window, document) {

    'use strict';

    angular.module('eightdotthreeApp').controller('EightdotthreeHashtagsController', EightdotthreeHashtagsController);

    function EightdotthreeHashtagsController(Instagram) {

        var vm = this;
        vm.tags = Instagram.hashtags;

    }

})(window.angular, window, document);