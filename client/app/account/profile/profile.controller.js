'use strict';

angular.module('directoryApp')
    .controller('ProfileCtrl', function($scope, Upload, ProfileData, TagData, Auth, $modal) {

        var TagData = TagData.data;

        $scope.section = ProfileData.firstname + "'s Profile";

        $scope.firstname = ProfileData.firstname;
        $scope.lastname = ProfileData.lastname;
        $scope.email = ProfileData.email;
        $scope.phone = ProfileData.phone;
        $scope.picture = ProfileData.picture;
        $scope.hometown = ProfileData.hometown;
        $scope.blurb = ProfileData.blurb;
        $scope.nationality = ProfileData.nationality;
        $scope.facebook = ProfileData.facebook;
        $scope.twitter = ProfileData.twitter;
        $scope.linkedin = ProfileData.linkedin;
        $scope.tags = ProfileData.tags;

        $scope.isCurrentUser = ProfileData._id === Auth.getCurrentUser()._id;
        $scope.myImage = '';
        $scope.myCroppedImage = '';

        $scope.change = function() {

            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'myModalContent.html',
                controller: 'EditProfileModalCtrl',
                size: "md",
                resolve: {
                    ProfileData: function() {
                        return $scope;
                    },
                    TagData: function() {
                        return TagData;
                    }
                }
            });

            modalInstance.result.then(function(modifiedUserData) {
                $scope.firstname = modifiedUserData.firstname;
                $scope.lastname = modifiedUserData.lastname;
                $scope.email = modifiedUserData.email;
                $scope.phone = modifiedUserData.phone;
                $scope.picture = modifiedUserData.picture;
                $scope.hometown = modifiedUserData.hometown;
                $scope.blurb = modifiedUserData.blurb;
                $scope.nationality = modifiedUserData.nationality;
                $scope.facebook = modifiedUserData.facebook;
                $scope.twitter = modifiedUserData.twitter;
                $scope.linkedin = modifiedUserData.linkedin;

                $scope.tags = $scope.tags.filter(function(tag) {
                    return !tag.isPublic;
                })

                modifiedUserData.tags.forEach(function(tag) {
                    
                    var currentTag = _.findWhere($scope.tags, { _id : tag });

                    if (!_.isObject(currentTag)) {
                        $scope.tags.push(_.findWhere(TagData, { _id : tag}));
                    }
                
                })

            }, function() {
            });

        };

         $scope.randomDefaultPic = function() {

        var pics = [
            "http://facebookcraze.com/wp-content/uploads/2010/10/funny-different-facebook-profile-pic-chicken.jpg",
            "http://www.theprofilepictures.com/wp-content/uploads/2011/08/alternative-facebook-profile-picture-superman-funny-joke.jpg",
            "http://www.theprofilepictures.com/wp-content/uploads/2011/08/alternative-facebook-profile-picture-superman-funny-joke.jpg",
            "http://www.vincegolangco.com/wp-content/uploads/2010/12/mickey-mouse-for-facebook.jpg",
            "http://media-cache-ec0.pinimg.com/236x/1c/76/36/1c7636906717be2719923f3e83c4502c.jpg"
        ]
        
        return "http://www.theprofilepictures.com/wp-content/uploads/2011/08/alternative-facebook-profile-picture-superman-funny-joke.jpg";

    }


    });

angular.module('directoryApp')
    .controller('EditProfileModalCtrl', function($scope, $modalInstance, ProfileData, TagData, User, Auth) {

         $("body").scrollTop(0)

        $scope.firstname = ProfileData.firstname;
        $scope.lastname = ProfileData.lastname;
        $scope.email = ProfileData.email;
        $scope.phone = ProfileData.phone;
        $scope.picture = ProfileData.picture;
        $scope.hometown = ProfileData.hometown;
        $scope.blurb = ProfileData.blurb;
        $scope.nationality = ProfileData.nationality;
        $scope.facebook = ProfileData.facebook;
        $scope.twitter = ProfileData.twitter;
        $scope.linkedin = ProfileData.linkedin;
        $scope.userTags = ProfileData.tags;

        $scope.tags = TagData.filter(function(tag) {
            return tag.isPublic;
        });

        $scope.selectedTags = {};

        ProfileData.tags.forEach(function(tag) {
            if (tag.isPublic) {
                $scope.selectedTags[tag._id] = true;
            }
        });

        $scope.ok = function() {

            $scope.isProcessing = true;

            var tagsToSave = $scope.userTags.filter(function(tag) {
                return !tag.isPublic;
            }).map(function(tag) {
                return tag._id;
            });

            for (var i in $scope.selectedTags) {
                if ($scope.selectedTags.hasOwnProperty(i)) {
                    if ( $scope.selectedTags[i])
                        tagsToSave.push(i);
                }
            }

            ProfileData.tags.filter(function(tag) {
                return !tag.isPublic;
            });

            Auth.updateProfile({
                    _id: Auth.getCurrentUser()._id,
                    firstname: $scope.firstname,
                    lastname: $scope.lastname,
                    email: $scope.email,
                    phone: $scope.phone,
                    picture : $scope.picture,
                    hometown: $scope.hometown,
                    blurb: $scope.blurb,
                    nationality: $scope.nationality,
                    facebook: $scope.facebook,
                    twitter: $scope.twitter,
                    linkedin: $scope.linkedin,
                    tags: tagsToSave
                })
                .then(function() {
                    $scope.isProcessing = false;
                    $modalInstance.close({
                        firstname : $scope.firstname,
                        lastname : $scope.lastname,
                        email : $scope.email,
                        phone : $scope.phone,
                        picture : $scope.picture,
                        hometown: $scope.hometown,
                        blurb: $scope.blurb,
                        nationality: $scope.nationality,
                        facebook: $scope.facebook,
                        twitter: $scope.twitter,
                        linkedin: $scope.linkedin,
                        tags: tagsToSave
                    });
                })
                .catch(function() {
                    $scope.isProcessing = false;
                    $scope.isError = true;
                });

        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });
