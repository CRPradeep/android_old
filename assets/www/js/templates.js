//Define an angular module for our app
var sampleApp = angular.module('sampleApp', ['ngRoute']);

//Define Routing for app
//Uri /AddNewOrder -> template add_order.html and Controller AddOrderController
//Uri /ShowOrders -> template show_orders.html and Controller AddOrderController
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
});

sampleApp.controller('AddHomeController', function($scope) {
	$scope.message = 'This is Home screen';
});