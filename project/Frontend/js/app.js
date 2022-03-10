var app = new angular.module('forgalminaplo', ['ngRoute', 'ngAnimate']);

app.run(function ($rootScope, $locale) {
    $locale.NUMBER_FORMATS.GROUP_SEP = '.';
    $locale.NUMBER_FORMATS.DECIMAL_SEP = ',';
    $rootScope.title = 'Forgalmi Napló';
    $rootScope.company = 'Bajai SZC Türr István Technikum';
    $rootScope.author = 'KKG SZR LA';

    if (sessionStorage.getItem('forgalminaploUser')) {
        $rootScope.loggedIn = true;
        $rootScope.loggedUser = angular.fromJson(sessionStorage.getItem('user'));
        $rootScope.loggedPermission = angular.fromJson(sessionStorage.getItem('permission'));
    } else {
        $rootScope.loggedIn = false;
        $rootScope.loggedUser = '';
        $rootScope.loggedPermission = '';
    }
});

//TODO: rooting : Admin - felhasználók + kezelés, Tanár - diákok + naptár(összes foglaáls névvel), Diák - naptár(foglalható órák), saját statisztika
app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'login.html',
        controller: 'loginCtrl',
    });
});
