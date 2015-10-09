(function(angular) {

    var EDIT_ITEM_CLICKED = "edit_item_clicked";

    var ADD_ITEM_CLICKED = "add_item_clicked";

    var ITEM_SAVED = "item_saved";

    var UserGroupListController = function($scope, $parse, UserGroup) {
        UserGroup.query(function(response) {
            $scope.items = response ? response : [];
        });
        $scope.editItem = function(item) {
            $scope.$root.$broadcast(EDIT_ITEM_CLICKED, angular.copy(item));
        };

        $scope.addItem = function() {
            $scope.$root.$broadcast(ADD_ITEM_CLICKED);
        };

        $scope.deleteItem = function(item) {
            item.remove(function() {
                $scope.items.splice($scope.items.indexOf(item), 1);
            }).error(func);
        };

        $scope.$on(ITEM_SAVED, function(event, item, isNew) {
            if (isNew) {
                $scope.items.push(item);
            } else {
                var toReplace = _.find($scope.items, function(i){
                    return i.id === item.id;
                })
                $scope.items[$scope.items.indexOf(toReplace)] = item;
            }
        })

    }

    var UserGroupController = function($scope, $parse, UserGroup, serverValidationHandler) {
        $scope.item = {};
        $scope.saving = false;
        $scope.saveItem = function(item) {
            if ($scope.userGroupForm.$valid) {
                $scope.saving = true;
                new UserGroup(item).save(function (item) {
                    $scope.$root.$broadcast(ITEM_SAVED, item, $scope.selectedItem === null);
                    $scope.editFormVisible = false;
                    $scope.saving = false;
                }, function(errors) {
                    serverValidationHandler.showValidationErrors($scope, 'userGroupForm',  errors);
                    $scope.saving = false;
                });
            }
        };

        $scope.$on(ADD_ITEM_CLICKED, function() {
            $scope.showEditForm();
        })

        $scope.$on(EDIT_ITEM_CLICKED, function(event, item) {
            $scope.showEditForm(item);
        })

        $scope.showEditForm = function(item) {
            $scope.editFormVisible = true;
            if (item == null) {
                $scope.item = {}
                $scope.selectedItem = null;
            } else {
                $scope.item = item;
                $scope.selectedItem = item;
            }
        };

        $scope.closeEditForm = function () {
            $scope.editFormVisible = false;
        }
    };

    UserGroupController.$inject = ['$scope', '$parse', 'UserGroup', 'serverValidationHandler'];
    UserGroupListController.$inject = ['$scope', '$parse', 'UserGroup'];
    angular.module("myApp.controllers").controller("UserGroupController", UserGroupController);
    angular.module("myApp.controllers").controller("UserGroupListController", UserGroupListController);

}(angular));
