(function() {

    angular
        .module('app', ['ngMaterial', 'ngAnimate', 'ngMessages'])
        .config(function($mdIconProvider) {
            $mdIconProvider
                .icon('play', '../assets/img/icons/ic_play.svg', 48)
                .icon('pause', '../assets/img/icons/ic_pause.svg', 48)
                .icon('delete', '../assets/img/icons/ic_delete.svg', 48)
                .icon('done', '../assets/img/icons/ic_done.svg', 48)
        })
        .controller('TaskController', ['$scope', '$mdDialog', 'logger', TaskController]);

    function TaskController($scope, $mdDialog, logger) {
				$scope.parseInt = parseInt;

        var taskCtrl = this;

        taskCtrl.onTextSelection = onTextSelection;
        taskCtrl.onTaskEdittingBlur = onTaskEdittingBlur;
				taskCtrl.editTask = editTask;
				taskCtrl.toogleTask = toogleTask;
        taskCtrl.doneEdittingTask = doneEdittingTask;
        taskCtrl.deleteTask = deleteTask;
				taskCtrl.deleteAllTasks = deleteAllTasks;
				this.getTotalSpentMinute = getTotalSpentMinute;

        taskCtrl.tasks = [];
        taskCtrl.addTask = addTask;
        taskCtrl.inputTask = "";
        taskCtrl.spentMinute = 0;

        function addTask() {
            if (taskCtrl.inputTask) {
                logger.info("Adding task: " + taskCtrl.inputTask);
                taskCtrl.tasks.push({ name: taskCtrl.inputTask, isRunning: false, editing: false, spentMinute: 0 });
                taskCtrl.inputTask = "";
            }
        }

        function onTextSelection($event) {
            $event.target.select();
        };

        function onTaskEdittingBlur(task) {
            angular.forEach(taskCtrl.tasks, function(key, value) {
                key.editing = false;
            });
        };

        function editTask(task) {
            angular.forEach(taskCtrl.tasks, function(key, value) {
                key.editing = false;
            });

            task.editing = true;
				};
				
				function toogleTask(task) {
					let lazyIsRunning = task.isRunning;
					angular.forEach(taskCtrl.tasks, function(key, value) {
							key.isRunning = false;
					});

					task.isRunning = !lazyIsRunning;
					logger.info("Toogle task: "+ task.name + ". isRunning: " + task.isRunning);
					task.spentMinute += 13;
				};

        function doneEdittingTask(task) {
            if (!angular.element(task.srcElement)
                .hasClass('editable')) {
                angular.forEach(taskCtrl.tasks, function(key, value) {
                    key.editing = false;
                });
            }
        };

        function deleteTask(task) {
					logger.info("Remove task: " + task.name);
					let index = taskCtrl.tasks.indexOf(task);
					taskCtrl.tasks.splice(index, 1);   
        };

        function deleteAllTasks() {
						logger.info("Remove all tasks: ");
						taskCtrl.tasks.length = 0;
						taskCtrl.spentMinute = 0;
				};
				
				function getTotalSpentMinute() {
					let total = 0;
					for (let i = 0; i < taskCtrl.tasks.length; i++){
							let task = taskCtrl.tasks[i];
							total += task.spentMinute;
					}
					return total;
			};
    }

})();
