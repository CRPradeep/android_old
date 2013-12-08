//Define an angular module for our app
var sampleApp = angular.module('sampleApp', ['ngRoute', 'sampleApp.directives']);

//Define Routing for app
sampleApp.config(['$routeProvider',
                  function($routeProvider) {
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
		redirectTo: '/home'
	});
}]);

angular.module('sampleApp.directives', []).
directive('enhanceJqmView', [function() {
	  return function($scope, el) {
	        setTimeout(function(){$scope.$on('$viewContentLoaded', el.trigger("create"))});
	  };
}]);

sampleApp.controller('AddSwiperScreenController', function($scope) {
	$scope.message = 'This is Swiper screen';
	app.initializeTabs();
	app.initializeSwiperScreen();
	
	var _name = window.localStorage.getItem("name");
	var _age = window.localStorage.getItem("age");
	var _gender = window.localStorage.getItem("gender");
		
	$scope.user = {name : _name==null?'':_name, 
					age: _age==null?'':_age, 
					gender: _gender==null?'':_gender};
	
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
});

sampleApp.controller('AddHomeController', function($scope, $location) {
	$scope.message = 'This is Home screen';
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
	}
});