'use strict';

var appRoute = angular.module("app", ["ngRoute", "LocalStorageModule", "ngMaterial", "cgNotify", "naif.base64", "ngAnimate", "ui.bootstrap"]),

	dbUrl = "https://sionapp.ga/api/web/app_dev.php/",
	uploadsUrl = "https://sionapp.ga/api/web/uploads/";

	// dbUrl = "http://localhost/sion/api/web/app_dev.php/",
	// uploadsUrl = "http://localhost/sion/api/web/uploads/";


	appRoute.config([
		"$routeProvider", function($routeProvider){

		$routeProvider.when("/", {
			templateUrl: "components/default/index.html",
			controller: "ctrDefault"
		})
		
		//OtherWise
		.otherwise({
			templateUrl:'components/404/404.html'
		});
	}
]);

appRoute.filter("tipoOracion", function(){
	return function(text) {
		if(text != null){
			return text.substring(0,1).toUpperCase()+text.substring(1);
		}
	};
});


appRoute.directive('errSrc', function() {
	return {
		link: function(scope, element, attrs) {
			element.bind('error', function() {
				if (attrs.src != attrs.errSrc) {
					attrs.$set('src', attrs.errSrc);
				}
			});
		}
	}
});

/*Modal*/
appRoute.config(['$compileProvider',function( $compileProvider ){   
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
}]);
