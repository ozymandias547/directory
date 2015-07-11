'use strict';

angular.module('directoryApp')
    .controller('ProfileCtrl', function($scope, Upload, ProfileData, Auth, $modal) {

        $scope.section = ProfileData.firstname + "'s Profile";

        $scope.firstname = ProfileData.firstname;
        $scope.lastname = ProfileData.lastname;
        $scope.email = ProfileData.email;
        $scope.phone = ProfileData.phone;
        $scope.picture = ProfileData.picture;

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
                        return ProfileData;
                    }
                }
            });

            modalInstance.result.then(function(modifiedUserData) {
                $scope.firstname = modifiedUserData.firstname;
                $scope.lastname = modifiedUserData.lastname;
                $scope.email = modifiedUserData.email;
                $scope.phone = modifiedUserData.phone;
                $scope.picture = modifiedUserData.picture;
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
        
        return "http://media-cache-ec0.pinimg.com/236x/1c/76/36/1c7636906717be2719923f3e83c4502c.jpg";

    }


    });

angular.module('directoryApp')
    .controller('EditProfileModalCtrl', function($scope, $modalInstance, ProfileData, User, Auth) {

        $scope.firstname = ProfileData.firstname;
        $scope.lastname = ProfileData.lastname;
        $scope.email = ProfileData.email;
        $scope.phone = ProfileData.phone;
        $scope.picture = ProfileData.picture;

        $scope.ok = function() {

            $scope.isProcessing = true;

            Auth.updateProfile({
                    _id: Auth.getCurrentUser()._id,
                    firstname: $scope.firstname,
                    lastname: $scope.lastname,
                    email: $scope.email,
                    phone: $scope.phone,
                    picture : $scope.picture
                })
                .then(function() {
                    $scope.isProcessing = false;
                    $modalInstance.close({
                        firstname : $scope.firstname,
                        lastname : $scope.lastname,
                        email : $scope.email,
                        phone : $scope.phone,
                        picture : $scope.picture
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
