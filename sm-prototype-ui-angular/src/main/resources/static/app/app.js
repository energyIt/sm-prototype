(function(angular) {
    angular.module("myApp.controllers", []);
    angular.module("myApp.directives", ['ngMessages']);
    angular.module("myApp.services", []);
    angular.module("myApp", ["ngResource", "myApp.directives", "spring-data-rest", "myApp.controllers", "myApp.services", 'ngMessages']);
}(angular));
