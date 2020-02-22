angular.module('profile', [])
.directive('focusInput', function($timeout) {
  return {
    link: function(scope, element, attrs) {
      element.bind('click', function() {
        $timeout(function() {
          element.parent().find('input')[0].focus();
        });
      });
    }
  };
})
.controller('MainCtrl', [
  '$scope','$http','$window',
  function($scope,$http,$window){
    $scope.profile = {};

    $scope.eci = $window.location.search.substring(1);

    var gURL = '/sky/cloud/'+$scope.eci+'/sensor_profile/get_profile';
    $scope.getAll = function() {
      return $http.get(gURL).success(function(data){
        angular.copy(data, $scope.profile);
      });
    };
	
	$scope.getAll();

	  var bURL = '/sky/event/'+$scope.eci+'/none/sensor/profile_updated';
	  $scope.editProfile = function() {
		  var eURL = bURL + "?name=" + $scope.sensor_name + "&location=" + $scope.sensor_location;
		  if ($scope.high_temperature)
			  eURL += "&high_temperature=" + $scope.high_temperature;
		  if ($scope.sms)
			  eURL += "&sms=" + $scope.sms;

		  return $http.post(eURL).success(function(data) {
			  $scope.getAll();
			  $scope.sensor_name = '';
			  $scope.sensor_location = '';
			  $scope.sms = '';
			  $scope.high_temperature = '';
		  })
	  }
  }
]);
