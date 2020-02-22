angular.module('temperature', [])
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
    $scope.temperatures = [];
	$scope.threshold_violations = [];
    $scope.eci = $window.location.search.substring(1);

    var gURL = '/sky/cloud/'+$scope.eci+'/temperature_store/temperatures';
    $scope.getAll = function() {
      return $http.get(gURL).success(function(data){
        angular.copy(data, $scope.temperatures);
      });
    };
	
	$scope.getAll();

    var tURL = '/sky/cloud/'+$scope.eci+'/temperature_store/threshold_violations';
    $scope.getAll = function() {
      return $http.get(tURL).success(function(data){
        angular.copy(data, $scope.threshold_violations);
      });
    };

    $scope.getAll();

    $scope.timeDiff = function(timing) {
      var bgn_sec = Math.round(Date.parse(timing.time_out)/1000);
      var end_sec = Math.round(Date.parse(timing.time_in)/1000);
      var sec_num = end_sec - bgn_sec;
      var hours   = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);
  
      if (hours   < 10) {hours   = "0"+hours;}
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      return hours+':'+minutes+':'+seconds;
    }
  }
]);
