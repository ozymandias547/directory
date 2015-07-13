'use strict';

angular.module('directoryApp')
    .controller('MainCtrl', function($scope, Auth, $location, Users, MainService) {
        $scope.users = Users.data;
        $scope.section = "Directory";

        $scope.dynamicTooltip = 'Hello, World!';

        $scope.viewMode = MainService.getState("viewMode");
        $scope.selectedProfiles = MainService.getState("selectedProfiles");
        $scope.selectedProfiles.forEach(function(selectedProfile) {
            $scope.users.forEach(function(user) {
                if (selectedProfile._id === user._id) {
                    user.isSelected = true;
                }
            })
        })


        $scope.defaultPic = function() {

            var pics = [
                "http://facebookcraze.com/wp-content/uploads/2010/10/funny-different-facebook-profile-pic-chicken.jpg",
                "http://www.theprofilepictures.com/wp-content/uploads/2011/08/alternative-facebook-profile-picture-superman-funny-joke.jpg",
                "http://www.theprofilepictures.com/wp-content/uploads/2011/08/alternative-facebook-profile-picture-superman-funny-joke.jpg",
                "http://www.vincegolangco.com/wp-content/uploads/2010/12/mickey-mouse-for-facebook.jpg",
                "http://media-cache-ec0.pinimg.com/236x/1c/76/36/1c7636906717be2719923f3e83c4502c.jpg"
            ]

            return "http://www.theprofilepictures.com/wp-content/uploads/2011/08/alternative-facebook-profile-picture-superman-funny-joke.jpg";

        }

        $scope.setDisplayMode = function(viewMode) {
            $scope.viewMode = viewMode;
            MainService.setState("viewMode", viewMode);
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

            if (!profile.isSelected) {
                $scope.selectedProfiles.push(profile);
                profile.isSelected = true;
            } else {
                profile.isSelected = false;
                $scope.selectedProfiles = $scope.selectedProfiles.filter(function(profile) {
                    return profile._id !== _id;
                })
            }

            MainService.setState("selectedProfiles", $scope.selectedProfiles);

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

        $scope.copyPhoneToClipboard = function() {
            var list = "";

            $scope.selectedProfiles.forEach(function(profile, idx) {
                if (profile.phone) {
                	list += profile.phone + (idx === $scope.selectedProfiles.length - 1 ? "" : ",");
                }
            });


            window.prompt("Copy to clipboard: Ctrl+C, Enter", list);
        }

        



    });
