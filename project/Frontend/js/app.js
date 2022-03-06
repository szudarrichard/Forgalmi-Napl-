var app = new angular.module('forgalminaplo', ['ngRoute', 'ngAnimate']);


app.run(function($rootScope, $locale){
    $locale.NUMBER_FORMATS.GROUP_SEP = ".";
    $locale.NUMBER_FORMATS.DECIMAL_SEP = ",";
    $rootScope.title = "Forgalmi Napló";
    $rootScope.company = "Bajai SZC Türr István Technikum";
    $rootScope.author = "KKG SZR LA";

    if (sessionStorage.getItem('forgalminaploUser')) {
        $rootScope.loggedIn = true;
        $rootScope.loggedUser = angular.fromJson(sessionStorage.getItem('forgalminaploUser'));
    } else {
        $rootScope.loggedIn = false;
        $rootScope.loggedUser = "";
    }
});

app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'login.html',
            controller: 'loginCtrl'
        })
});