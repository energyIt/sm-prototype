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
                item.save = function(callback) {
                    UserGroup.resources.save(item, function(item, headers) {
                        var deferred = $http.get(headers().location);
                        return SpringDataRestAdapter.process(deferred).then(function(newItem) {
                            callback && callback(new UserGroup(newItem));
                        });
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

    UserGroupFactory.$inject = ['$http', 'SpringDataRestAdapter'];
    angular.module("myApp.services").factory("UserGroup", UserGroupFactory);
}(angular));
