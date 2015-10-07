(function(angular) {
    var UserGroupController = function($scope, UserGroup) {
        UserGroup.query(function(response) {
            $scope.items = response ? response : [];
        });

        $scope.addItem = function(id, id2, id3, name) {
            new UserGroup({
                id: id,
                id2: id2,
                id3: id3,
                name: name
            }).save(function(item) {
                    $scope.items.push(item);
                });
            $scope.editFormVisible = false;
        };

        $scope.updateItem = function(id2, id3, name) {
            new UserGroup({
                id: $scope.id,
                id2: id2,
                id3: id3,
                name: name
            }).save(function(item) {
                    $scope.items[$scope.items.indexOf($scope.selectedItem)] = item;
                });
            $scope.editFormVisible = false;
        };

        $scope.deleteItem = function(item) {
            item.remove(function() {
                $scope.items.splice($scope.items.indexOf(item), 1);
            }).error(func);
        };

        $scope.showEditForm = function(item) {
            $scope.editFormVisible = true;
            if (item == null) {
                $scope.selectedItem = null;
                $scope.id = null;
                $scope.id2 = null;
                $scope.id3 = null;
                $scope.name = null;
            } else {
                $scope.selectedItem = item;
                $scope.id = item.id;
                $scope.id2 = item.id2;
                $scope.id3 = item.id3;
                $scope.name = item.name;
            }
        };

        $scope.closeEditForm = function () {
            $scope.editFormVisible = false;
        }
    };

    UserGroupController.$inject = ['$scope', 'UserGroup'];
    angular.module("myApp.controllers").controller("UserGroupController", UserGroupController);

}(angular));
