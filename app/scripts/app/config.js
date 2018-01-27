(function() {

	angular
		.module('app')
		.config(['$mdThemingProvider', configure]);

	function configure($mdThemingProvider) {
	    $mdThemingProvider
	    	.theme('docs-dark', 'default')
	    	.primaryPalette('orange')
	    	.dark()
    		.foregroundPalette['3'] = 'orange';
	}

})();