(function() {

    angular
        .module('app')
        .directive('myEnter', function() {
            return function(scope, element, attrs) {
                element.bind("keydown keypress", function(event) {
                    if (event.which === 13) {
                        scope.$apply(function() {
                            scope.$eval(attrs.myEnter);
                        });

                        event.preventDefault();
                    }
                });
            };
        })
        .directive('myLeave', function() {
            return function(scope, element, attrs) {
                element.bind("keydown keypress", function(event) {
                    if (event.which === 27) {
                        scope.$apply(function() {
                            scope.$eval(attrs.myLeave);
                        });

                        event.preventDefault();
                    }
                });
            };
        })
        .directive('focusOnShow', function($timeout) {
            return {
                restrict: 'A',
                link: function($scope, $element, $attr) {
                    if ($attr.ngShow) {
                        $scope.$watch($attr.ngShow, function(newValue) {
                            if (newValue) {
                                $timeout(function() {
                                    $element[0].focus();
                                }, 0);
                            }
                        })
                    }
                    if ($attr.ngHide) {
                        $scope.$watch($attr.ngHide, function(newValue) {
                            if (!newValue) {
                                $timeout(function() {
                                    $element[0].focus();
                                }, 0);
                            }
                        })
                    }

                }
            };
        })
        // Not really work
        .directive('myTooltip', function($timeout) {
            return {
                restrict: 'A',
                link: function($scope, $element, $attr) {
                    let tooltip = $element.children("md-tooltip");
                    if (tooltip) {
                        tooltip.css("left", $element.clientX - tooltip.clientWidth / 2);
                    }
                }
            };
        })
        .config(['$mdThemingProvider', configure]);

    function configure($mdThemingProvider) {
        $mdThemingProvider
            .theme('docs-dark', 'default')
            .primaryPalette('orange')
            .dark()
            .foregroundPalette['3'] = 'orange';
    }

})();
