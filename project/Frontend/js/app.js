var app = new angular.module('forgalminaplo', ['ngRoute', 'ngAnimate']);

app.run(function ($rootScope, $locale) {
    $locale.NUMBER_FORMATS.GROUP_SEP = '.';
    $locale.NUMBER_FORMATS.DECIMAL_SEP = ',';
    $rootScope.title = 'Forgalmi Napló';
    $rootScope.company = 'Bajai SZC Türr István Technikum';
    $rootScope.author = 'KKG SZR LA';

    if (sessionStorage.getItem('user')) {
        //SessionStorage
        $rootScope.loggedIn = true;
        $rootScope.loggedUser = angular.fromJson(sessionStorage.getItem('user'));
        $rootScope.loggedUserMail = angular.fromJson(sessionStorage.getItem('email'));
        $rootScope.loggedPermission = angular.fromJson(sessionStorage.getItem('permission'));
        $rootScope.loggedSchoolID = angular.fromJson(sessionStorage.getItem('schoolID'));
        $rootScope.studentTeacherID = angular.fromJson(sessionStorage.getItem('teacherID'));
        $rootScope.status = angular.fromJson(sessionStorage.getItem('status'));
        console.log($rootScope.status);
    } else {
        $rootScope.loggedIn = false;
        $rootScope.loggedUser = '';
        $rootScope.loggedUserMail = '';
        $rootScope.loggedPermission = '';
        $rootScope.loggedSchoolID = '';
        $rootScope.studentTeacherID = '';
        $rootScope.status = '';
    }
});

//rooting
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'login.html',
            controller: 'loginCtrl',
        })
        .when('/firstlogin', {
            resolve: {
                function($location, $rootScope) {
                    if ($rootScope.loggedIn && $rootScope.status != 1) {
                        $location.path('/firstlogin');
                    }
                },
            },
            templateUrl: 'firstlogin.html',
            controller: 'firstloginCtrl',
        })
        .when('/teacherlist', {
            resolve: {
                function($location, $rootScope) {
                    if (!$rootScope.loggedIn) {
                        $location.path('/');
                    }
                },
            },
            templateUrl: 'teacherlist.html',
            controller: 'teacherCtrl',
        })
        .when('/studentlist', {
            resolve: {
                function($location, $rootScope) {
                    if (!$rootScope.loggedIn) {
                        $location.path('/');
                    }
                },
            },
            templateUrl: 'studentlist.html',
            controller: 'studentsCtrl',
        })
        .when('/teacherlist', {
            resolve: {
                function($location, $rootScope) {
                    if (!$rootScope.loggedIn) {
                        $location.path('/');
                    }
                },
            },
            templateUrl: 'teacherlist.html',
            controller: 'teacherCtrl',
        })
        .when('/calendar', {
            resolve: {
                function($location, $rootScope) {
                    if (!$rootScope.loggedIn) {
                        $location.path('/');
                    }
                },
            },
            templateUrl: 'calendar.html',
            controller: 'calendarCtrl',
        })
        .when('/teacherdata', {
            resolve: {
                function($location, $rootScope) {
                    if (!$rootScope.loggedIn) {
                        $location.path('/');
                    }
                },
            },
            templateUrl: 'teacherdata.html',
            controller: 'teacherdataCtrl',
        })
        .when('/studentdata', {
            resolve: {
                function($location, $rootScope) {
                    if (!$rootScope.loggedIn) {
                        $location.path('/');
                    }
                },
            },
            templateUrl: 'studentdata.html',
            controller: 'studentdataCtrl',
        })
        .when('/settings', {
            resolve: {
                function($location, $rootScope) {
                    if (!$rootScope.loggedIn) {
                        $location.path('/');
                    }
                },
            },
            templateUrl: 'settings.html',
            controller: 'settingsCtrl',
        });
});
