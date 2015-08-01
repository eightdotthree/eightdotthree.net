(function(angular, window, document) {

    'use strict';

    angular.module('eightdotthreeApp').controller('EightdotthreeHashtagsController', EightdotthreeHashtagsController);

    function EightdotthreeHashtagsController() {

        var vm = this;
        vm.tags = [
        	'pug',
        	'dog',
        	'cat',
        	'travel',
        	'beer',
        	'pittsburgh'
        ];

    }

})(window.angular, window, document);