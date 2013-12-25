//Define an angular module for our app
var sampleApp = angular.module('sampleApp', ['ngRoute', 'sampleApp.directives']);

//Define Routing for app
sampleApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/reports', {
		templateUrl: 'templates/reports.html',
		controller: 'AddSwiperScreenController'
	}).
	when('/home', {
		templateUrl: 'templates/login.html',
		controller: 'AddHomeController'
	}).
	otherwise({
		redirectTo: '/reports'
	});
}]);

angular.module('sampleApp.directives', []).
directive('enhanceJqmView', [function() {
	  return function($scope, el) {
	        setTimeout(function(){$scope.$on('$viewContentLoaded', el.trigger("create"))});
	  };
}]);

sampleApp.controller('AddSwiperScreenController', function($scope) {
	app.initializeTabs();
	app.initializeSwiperScreen();

	$('#hour_field').datetimepicker({
		datepicker:false,
		hours12: true,
		timeHeightInTimePicker: 15,
		format:'H:i'
	});
	
	var _name = window.localStorage.getItem("name");
	var _age = parseInt(window.localStorage.getItem("age"));
	var _gender = window.localStorage.getItem("gender");
	
	$scope.user = {name : _name==null ? '' : _name,  age: (_age==null || isNaN(_age)) ? '' : _age, gender: _gender==null ? 'Male': _gender};	
	$scope.alarm = {hour : '00.00', period : 'AM', label : 'Test BP/Sugar Now.'};

	$scope.savePatientDetails = function(){
		var alertMsg;
		if(window.localStorage.getItem("name") == $scope.user.name &&
				window.localStorage.getItem("age") == $scope.user.age &&
				window.localStorage.getItem("gender") == $scope.user.gender){
			alertMsg = "No Modifications found."
		}else{
			window.localStorage.setItem("name", $scope.user.name);
			window.localStorage.setItem("age", $scope.user.age);
			window.localStorage.setItem("gender", $scope.user.gender);
			
			alertMsg = "Patient Details Saved.";
		}		
		alert(alertMsg);
	}
	
	$scope.setAlarm = function(){
		$scope.alarm.hour = $("#hour_field").val();
		cordova.exec(
					function(successObj) {}, 
					function(errorObj) {alert("Sorry. An error occurred while setting alarm. Please try again.");}, 
					"AlarmPlugin", "SET_ALARM", [$scope.alarm.hour.substring(0,2), $scope.alarm.period, $scope.alarm.label]);
	}
	
});

sampleApp.controller('AddHomeController', function($scope, $location, $http) {
	app.setScreenBounds();
	
	$scope.goto = function(path){
		cordova.exec(function(successObj) {
			if(successObj != null && successObj.length >0){
				var accNames = "";

				$.each(successObj, function( index, accObj ) {
					if(accObj.type == "com.google"){
						accNames += accObj.accName + "\n";
					}
				});
//				alert(accNames);
				$location.path(path);
			}else{
				alert("Sorry. Your device is not registered with google");
			}
		}, function(error) {alert("Sorry. Your device is not registered with google");}, "GetGoogleAccPlugin",
		"GET_GOOGLE_ACC", []);
		
		
		/*$http({method: 'GET', url: 'https://accounts.google.com/o/oauth2/auth?redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=token&client_id=799913527324-cjaa444df51b5tdba0ok745brkg42aaf.apps.googleusercontent.com'}).
		  success(function(data, status, headers, config) {
		    alert("success: "+data);
		  }).
		  error(function(data, status, headers, config) {
			  alert("error: "+data);
		  });*/
	}
});