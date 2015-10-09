(function(angular) {
    var HATEOAS_URL = './api/userGroup';
    var UserGroupFactory = function($http, SpringDataRestAdapter) {
        function UserGroup(item) {

            if (item._resources) {
                item.resources = item._resources("self", {}, {
                    update: {
                        method: 'PUT'
                    }
                });
                item.save = function(callback) {
                    item.resources.update(item, function() {
                        callback && callback(item);
                    });
                };

                item.remove = function(callback) {
                    item.resources.remove(function() {
                        callback && callback(item);
                    });
                };
            } else {
                item.save = function(successCallback, badRequestCallback) {
                    UserGroup.resources.save(item, function(item, headers) {
                        var deferred = $http.get(headers().location);
                        return SpringDataRestAdapter.process(deferred).then(function(newItem) {
                            successCallback && successCallback(new UserGroup(newItem));
                        });
                    }, function(resp){
                        var status = resp.status;
                        var errors = resp.data.errors;
                        badRequestCallback && badRequestCallback(errors);
                    }, function() {
                        var gotNoClew = "";
                    });
                };
            }

            return item;
        }

        UserGroup.query = function(callback) {
            var deferred = $http.get(HATEOAS_URL);
            return SpringDataRestAdapter.process(deferred).then(function(data) {
                UserGroup.resources = data._resources("self");
                callback && callback(_.map(data._embeddedItems, function(item) {
                    return new UserGroup(item);
                }));
            });
        };

        UserGroup.resources = null;

        return UserGroup;
    };

    var ServerValidationHandler = function($parse) {
        this.showValidationErrors = function($scope, formName, errors) {
            for (var i =0; i< errors.length; i++) {
                var error = errors[i];
                var fieldName = error.property;
                var serverMessage = $parse(formName+'.'+ fieldName+'.$error.serverMessage');
                $scope.userGroupForm[fieldName].$setValidity("serverMessage", false, $scope[formName]);
                serverMessage.assign($scope, error.message);
            }
        }
    };

    UserGroupFactory.$inject = ['$http', 'SpringDataRestAdapter'];
    ServerValidationHandler.$inject = ['$parse'];
    angular.module("myApp.services").factory("UserGroup", UserGroupFactory);
    angular.module("myApp.services").service("serverValidationHandler", ServerValidationHandler);
}(angular));
