(function(angular, $, window) {

  'use strict';

    angular.module('eightdotthreeApp').filter('escapeHtml', function () {

        var entityMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            '\"': '&#39;',
            '/': '&#x2F;',
            'undefined': '\'',
            '#': '\#'
        };

        return function(str) {
            return String(str).replace(/[#]/g, function (s) {
                return entityMap[s];
            });
        };

    });

})(window.angular, window.jQuery, window);