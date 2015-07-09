'use strict';

angular.module('directoryApp')
    .controller('MainCtrl', function($scope, Auth, $location, Users) {
        $scope.users = Users.data;
        $scope.mode = "tile";
        $scope.section = "Directory";
        $scope.selectedProfiles = [];

        $scope.defaultPic = function() {

            var pics = [
                "http://facebookcraze.com/wp-content/uploads/2010/10/funny-different-facebook-profile-pic-chicken.jpg",
                "http://www.theprofilepictures.com/wp-content/uploads/2011/08/alternative-facebook-profile-picture-superman-funny-joke.jpg",
                "http://www.theprofilepictures.com/wp-content/uploads/2011/08/alternative-facebook-profile-picture-superman-funny-joke.jpg",
                "http://www.vincegolangco.com/wp-content/uploads/2010/12/mickey-mouse-for-facebook.jpg",
                "http://media-cache-ec0.pinimg.com/236x/1c/76/36/1c7636906717be2719923f3e83c4502c.jpg"
            ]

            return "http://media-cache-ec0.pinimg.com/236x/1c/76/36/1c7636906717be2719923f3e83c4502c.jpg";

        }

        $scope.setDisplayMode = function(mode) {
            $scope.mode = mode;
        }

        $scope.groupBy = "lastnameAsc";

        $scope.onSelectChange = function() {

            $scope.users = Users.data.sort(function(a, b) {

                if ($scope.groupBy === "firstnameAsc") {
                    return a.firstname < b.firstname;
                }

                if ($scope.groupBy === "firstnameDes") {
                    return a.firstname > b.firstname;
                }

                if ($scope.groupBy === "lastnameAsc") {
                    return a.firstname < b.firstname;
                }

                if ($scope.groupBy === "lastnameDes") {
                    return a.firstname > b.firstname;
                }

            });

        };

        $scope.selectProfile = function($event, _id) {

            $event.stopPropagation();
            $event.preventDefault();

            var profile = $scope.users.filter(function(profile) {
                return profile._id === _id;
            })[0];

            if ($scope.selectedProfiles.indexOf(profile) === -1) {
                $scope.selectedProfiles.push(profile);
                profile.isSelected = true;
            } else {
                profile.isSelected = false;
                $scope.selectedProfiles = $scope.selectedProfiles.filter(function(profile) {
                    return profile._id !== _id;
                })
            }

        };

        $scope.buildMailToList = function() {
            var list = "";

            $scope.selectedProfiles.forEach(function(profile, idx) {
                list += profile.email + (idx === $scope.selectedProfiles.length - 1 ? "" : ",");
            });

            return list;
        }

        $scope.copyToClipboard = function() {
            var list = "";

            $scope.selectedProfiles.forEach(function(profile, idx) {
                list += profile.email + (idx === $scope.selectedProfiles.length - 1 ? "" : ",");
            });


            window.prompt("Copy to clipboard: Ctrl+C, Enter", list);


        }



    });
