'use strict';

angular.module('directoryApp')
  .controller('MainCtrl', function ($scope, Auth, $location, Users) {
    $scope.users = Users.data;
    $scope.mode = "tile";
    $scope.section = "Directory";

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

  });
