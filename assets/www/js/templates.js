//Define an angular module for our app
var sampleApp = angular.module('sampleApp', ['ngRoute']);

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


sampleApp.controller('AddSwiperScreenController', function($scope) {
	$scope.message = 'This is Swiper screen';
	app.initializeTabs();
	app.initializeSwiperScreen();	
	app.refreshView();	
	
	$scope.user = {name : 'prad', age: '22'};
	$scope.save = function(as){
		alert(as);
	}
	
});

sampleApp.controller('AddHomeController', function($scope, $location) {
	$scope.message = 'This is Home screen';
	app.setScreenBounds();
	app.refreshView();	
	
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