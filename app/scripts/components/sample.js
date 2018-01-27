(function(){

	angular
		.module('app')
		.directive('taskList', taskList);

	function taskList() {

		var directive = {
			scope: {
				tasks: "=",
				refreshTasks: "&"
			},
			templateUrl: 'scripts/components/sample.html',
			restrict: 'E'
		}

		return directive;
	}

})();