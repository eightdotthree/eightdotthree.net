(function() {

	eightdotthreeApp.filter('fromTo', function() {

	    return function(input, from, total, lessThan) {
	        from = parseInt(from);
	        total = parseInt(total);
	        for (var i = from; i < from + total && i < lessThan; i++) {
	            input.push(i);
	        }
	        return input;
	    }

	});

})();