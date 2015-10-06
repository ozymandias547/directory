'use strict';

angular.module('directoryApp')
    .controller('MainCtrl', function($scope, Auth, $location, Users, MainService, $filter) {
        $scope.users = Users.data;
        
        // order the users by picture
        $scope.users = Users.data.sort(function(a, b) {
            if (a.picture && !b.picture) {
                return -1;
            }
            else if (b.picture && !a.picture) {
                return 1;
            } else {
                return 0;
            }
        });

        $scope.section = "Directory";
        $scope.dynamicTooltip = 'Hello, World!';
        $scope.positionFilterMode = "all";
        $scope.viewMode = MainService.getState("viewMode");
        $scope.groupBy = "lastnameAsc";
        $scope.selectedProfiles = MainService.getState("selectedProfiles");
        $scope.selectedTags = [];
        $scope.selectedProfiles.forEach(function(selectedProfile) {
            $scope.users.forEach(function(user) {
                if (selectedProfile._id === user._id) {
                    user.isSelected = true;
                }
            })
        });

        $("body").scrollTop(0);

        $scope.currentTags = [];

        // Build tags to filter by. 
        $scope.users.forEach(function(user) {
            if (user.tags) {
                user.tags.forEach(function(tag) {
                    if (!_.isObject(_.findWhere($scope.currentTags, { _id : tag._id })))
                        $scope.currentTags.push(tag)
                })
            }
        })


        $scope.defaultPic = function() {
            return "/assets/images/profile.png";
        }

        $scope.setDisplayMode = function(viewMode) {
            $scope.viewMode = viewMode;
            MainService.setState("viewMode", viewMode);
        }

        $scope.onSelectChange = function() {

            $scope.users = Users.data.sort(function(a, b) {

                if ($scope.groupBy === "firstnameAsc") {
                    return a.firstname > b.firstname;
                }

                if ($scope.groupBy === "firstnameDes") {
                    return a.firstname < b.firstname;
                }

                if ($scope.groupBy === "lastnameAsc") {
                    return a.lastname > b.lastname;
                }

                if ($scope.groupBy === "lastnameDes") {
                    return a.lastname < b.lastname;
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

        $scope.filterByTag = function(tag) {
            
            if ($scope.selectedTags.indexOf(tag) === -1) {
                $scope.selectedTags = [];
                $scope.selectedTags.push(tag);
            } else {
                $scope.selectedTags = _.without($scope.selectedTags, _.findWhere($scope.selectedTags, { _id: tag._id }));
            }
            
        }

        $scope.isTagSelected = function(tag) {
            return $scope.selectedTags.indexOf(tag) !== -1;
        }

        $scope.removeAllSelected = function() {
            $scope.selectedProfiles = [];
            $scope.users.forEach(function(user) {
                user.isSelected = false;
            })
        }

        $scope.selectAllVisibleProfiles = function() {

            $scope.selectedProfiles = $filter('filter')($scope.users, $scope.search);
            $scope.selectedProfiles = $filter('filterProfilesByTag')($scope.selectedProfiles, $scope.selectedTags);

            $scope.users.forEach(function(user) {
                $scope.selectedProfiles.forEach(function(selected) {
                    if (user === selected) {
                        user.isSelected = true;
                    }
                });
            });

        }

    });

angular.module('directoryApp')
    .filter('filterProfilesByTag', function() {
        return function(profiles, tags) {
            
            if (tags.length === 0) {
                return profiles;
            }

            var result = [];

            profiles.forEach(function(profile) {
                tags.forEach(function(tag) {
                    if (_.isObject(_.findWhere(profile.tags, { _id : tag._id }))) {
                        if (result.indexOf(profile) === -1) {
                            result.push(profile);
                        }
                    }
                })
            });

            return result;

        }
    })
