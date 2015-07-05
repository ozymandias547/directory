'use strict';

angular.module('directoryApp')
    .controller('ProfileCtrl', function($scope, Upload, ProfileData, Auth, $modal) {

        $scope.firstname = ProfileData.firstname;
        $scope.lastname = ProfileData.lastname;
        $scope.email = ProfileData.email;
        $scope.phone = ProfileData.phone;

        $scope.isCurrentUser = ProfileData._id === Auth.getCurrentUser()._id;
        $scope.myImage = '';
        $scope.myCroppedImage = '';

        var handleFileSelect = function(evt) {
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function(evt) {
                $scope.$apply(function($scope) {
                    $scope.myImage = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        };

        angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);

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



            }, function() {
            });

        };

        // $scope.save = function() {

        //     var file = $scope.selectedFile[0];
        //     var formData = _.clone($scope.listing);

        //     formData.categoryID = formData.category._id;
        //     formData = _.omit(formData, "category");

        //     $scope.upload = $upload.upload({
        //         url: contextPath + '/api/listings',
        //         method: 'POST',
        //         data: formData,
        //         file: file
        //     }).progress(function(evt) {
        //         $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total, 10);
        //     }).success(function(data) {
        //         alert("New listing added!")
        //     });

        // }

        // $scope.onFileSelect = function($files) {
        //     $scope.uploadProgress = 0;
        //     $scope.selectedFile = $files;
        // };


    });

angular.module('directoryApp')
    .controller('EditProfileModalCtrl', function($scope, $modalInstance, ProfileData, User, Auth) {

        $scope.firstname = ProfileData.firstname;
        $scope.lastname = ProfileData.lastname;
        $scope.email = ProfileData.email;
        $scope.phone = ProfileData.phone;

        $scope.ok = function() {

            $scope.isProcessing = true;

            Auth.updateProfile({
                    _id: Auth.getCurrentUser()._id,
                    firstname: $scope.firstname,
                    lastname: $scope.lastname,
                    email: $scope.email,
                    phone: $scope.phone
                })
                .then(function() {
                    $scope.isProcessing = false;
                    $modalInstance.close({
                        firstname : $scope.firstname,
                        lastname : $scope.lastname,
                        email : $scope.email,
                        phone : $scope.phone
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
