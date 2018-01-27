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
        .controller('TaskController', ['$scope', '$interval', '$mdDialog', 'logger', TaskController]);

    function TaskController($scope, $interval, $mdDialog, logger) {
        // $scope
        $scope.parseInt = parseInt;

        $scope.showAlert = function(inTitle, inContent) {
            let alert = $mdDialog.alert({
                title: inTitle,
                textContent: inContent,
                ok: "Got it!",
            });

            $mdDialog
                .show(alert)
                .finally(function() {
                    alert = undefined;
                });
        };

        // $this
        const appInteval = 1000;
        const intervalInSecond = 1000 / appInteval;

        let taskCtrl = this;

        taskCtrl.runningTask = undefined;
        taskCtrl.tasks = [];
        taskCtrl.inputTask = "";
        taskCtrl.spentTime = 0;

        let intervalFn;

        function startTimer() {
            if (angular.isDefined(intervalFn)) {
                return;
            }

            intervalFn = $interval(function() {
                let runningTask = taskCtrl.runningTask;
                if (runningTask) {
                    runningTask.spentTime += intervalInSecond;
                    logger.info("Running task spent time: " + runningTask.spentTime);

                    taskCtrl.spentTime = 0;
                    taskCtrl.tasks.forEach(function(task) {
                        taskCtrl.spentTime += task.spentTime;
                    });
                    logger.info("Total spent time: " + taskCtrl.spentTime);
                }
            }, appInteval);
        }

        function stopTimer() {
            if (angular.isDefined(intervalFn)) {
                $interval.cancel(intervalFn);
                intervalFn = undefined;
            }
        }

        taskCtrl.addTask = addTask;

        function addTask() {
            if (taskCtrl.inputTask) {
                let taskName = taskCtrl.inputTask.trim();
                if (taskName) {
                    if (taskExists(taskName)) {
                        $scope.showAlert("Alert", "Task already existed!");
                    } else {
                        logger.info("Adding task: " + taskName);
                        taskCtrl.tasks.push({ name: taskName, isRunning: false, editing: false, spentTime: 0 });
                        taskCtrl.inputTask = "";
                    }
                }
            }
        }

        function taskExists(taskName) {
            return taskCtrl.tasks.some(function(task) {
                return task.name === taskName;
            });
        }

        taskCtrl.onTextSelection = onTextSelection;

        function onTextSelection($event) {
            $event.target.select();
        }

        taskCtrl.onTaskEdittingBlur = onTaskEdittingBlur;

        function onTaskEdittingBlur(task) {
            angular.forEach(taskCtrl.tasks, function(key, value) {
                key.editing = false;
            });
        }

        taskCtrl.editTask = editTask;

        function editTask(task) {
            angular.forEach(taskCtrl.tasks, function(key, value) {
                key.editing = false;
            });

            task.editing = true;
        }

        taskCtrl.toogleTask = toogleTask;

        function toogleTask(task) {
            let lazyIsRunning = task.isRunning;
            angular.forEach(taskCtrl.tasks, function(key, value) {
                key.isRunning = false;
            });

            task.isRunning = !lazyIsRunning;
            logger.info("Toogle task: " + task.name + ". isRunning: " + task.isRunning);
            if (task.isRunning) {
                taskCtrl.runningTask = task;
            }
        }

        taskCtrl.doneEdittingTask = doneEdittingTask;

        function doneEdittingTask(task) {
            if (!angular.element(task.srcElement)
                .hasClass('editable')) {
                angular.forEach(taskCtrl.tasks, function(key, value) {
                    key.editing = false;
                });
            }
        }

        taskCtrl.deleteTask = deleteTask;

        function deleteTask(task) {
            logger.info("Remove task: " + task.name);
            let index = taskCtrl.tasks.indexOf(task);
            taskCtrl.tasks.splice(index, 1);
        }

        taskCtrl.deleteAllTasks = deleteAllTasks;

        function deleteAllTasks() {
            logger.info("Remove all tasks: ");
            taskCtrl.tasks.length = 0;
            taskCtrl.spentTime = 0;
        }

        taskCtrl.stopRunningTasks = stopRunningTasks;

        function stopRunningTasks() {
            logger.info("Stop running tasks: ");
            taskCtrl.tasks.forEach(function(task) {
                if (task.isRunning) {
                    task.isRunning = false;
                }
            });
        }

        taskCtrl.getSpentMinute = getSpentMinute;

        function getSpentMinute(task) {
            return parseInt((task.spentTime / 60) % 60);
        }

        taskCtrl.getSpentHour = getSpentHour;

        function getSpentHour(task) {
            return parseInt(task.spentTime / 3600);
        }

        taskCtrl.getTotalSpentMinute = getTotalSpentMinute;

        function getTotalSpentMinute() {
            return parseInt((taskCtrl.spentTime / 60) % 60);
        }

        taskCtrl.getTotalSpentHour = getTotalSpentHour;

        function getTotalSpentHour() {
            return parseInt(taskCtrl.spentTime / 3600);
        }

        function activate() {
            startTimer();
        }

        function destroy() {
            stopTimer();
        }

        // Register
        activate();
    }

})();
