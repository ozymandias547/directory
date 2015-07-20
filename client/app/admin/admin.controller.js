'use strict';

angular.module('directoryApp')
    .controller('AdminCtrl', function($scope, $http, Auth, User, $q, TagData) {
        $scope.section = "Admin";
        // Use the User $resource to fetch all users
        $scope.users = User.query();
        $scope.tags = TagData.data;
        
        $scope.users.$promise.then(function(result) {
            $scope.users = result;

            $scope.users.forEach(function(user) {
                user.isAdmin = user.role === "admin";
                user.isDirty = false;
            });

        });

        $scope.isDirty = false;
        $scope.isSaving = false;

        $scope.save = function() {

            var promises = [];

            angular.forEach($scope.users, function(user, idx) {
                if (user.isDirty) {

                    var userToSave = _.clone(user);

                    userToSave.role = userToSave.isAdmin ? "admin" : "user";

                    userToSave.tags = userToSave.tags.map(function(tag) {
                        return tag._id;
                    });

                    promises.push(User.updateAsAdmin({
                        _id: userToSave._id
                    }, userToSave).$promise);

                }
            });

            $scope.isSaving = true;

            $q.all(promises).then(function() {
                $scope.isSaving = false;
                $scope.isDirty = false;
            })

        };

        $scope.handleChange = function(user) {
            $scope.isDirty = true;
            user.isDirty = true;
        }

        $scope.delete = function(user) {
            var confirmed = confirm("Are you sure you want to delete "+ user.firstname + "'s account ?");

            if (confirmed) {
                User.remove({
                    id: user._id
                });
                angular.forEach($scope.users, function(u, i) {
                    if (u === user) {
                        $scope.users.splice(i, 1);
                    }
                });
            }
        };

        $scope.addTag = function(user, tag) {
            user.tags.push(tag);
            $scope.isDirty = true;
            user.isDirty = true;
        }

        $scope.removeTag = function(user, tag) {
            
            user.tags = _.without(user.tags, _.findWhere( user.tags, { _id : tag._id }) );
            $scope.isDirty = true;
            user.isDirty = true;
        }

    });
