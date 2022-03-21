app.controller('loginCtrl', function ($scope, $rootScope, factory, $location) {
    $scope.login = function () {
        if ($scope.uMail == null || $scope.uPassword == null) {
            alert('Nem adtál meg minden belépési adatot!');
        } else {
            factory.logincheck('admin', $scope.uMail, CryptoJS.SHA1($scope.uPassword).toString()).then(function (res) {
                if (res.data.length > 0) {
                    $rootScope.loggedIn = true;
                    $rootScope.loggedPermission = res.data[0].permission;
                    sessionStorage.setItem('userID', angular.toJson(res.data[0].ID));
                    sessionStorage.setItem('user', angular.toJson(res.data[0].userName));
                    sessionStorage.setItem('email', angular.toJson($scope.uMail));
                    sessionStorage.setItem('permission', angular.toJson(res.data[0].permission));
                    sessionStorage.setItem('schoolID', angular.toJson(res.data[0].schoolID));
                } else {
                    factory.logincheck('teacher', $scope.uMail, CryptoJS.SHA1($scope.uPassword).toString()).then(function (res) {
                        if (res.data.length > 0) {
                            $rootScope.loggedIn = true;
                            $rootScope.loggedPermission = res.data[0].permission;
                            sessionStorage.setItem('userID', angular.toJson(res.data[0].ID));
                            sessionStorage.setItem('user', angular.toJson(res.data[0].userName));
                            sessionStorage.setItem('email', angular.toJson($scope.uMail));
                            sessionStorage.setItem('permission', angular.toJson(res.data[0].permission));
                            sessionStorage.setItem('schoolID', angular.toJson(res.data[0].schoolID));
                        } else {
                            factory.logincheck('student', $scope.uMail, CryptoJS.SHA1($scope.uPassword).toString()).then(function (res) {
                                if (res.data.length > 0) {
                                    $rootScope.loggedIn = true;
                                    $rootScope.loggedPermission = res.data[0].permission;
                                    sessionStorage.setItem('userID', angular.toJson(res.data[0].ID));
                                    sessionStorage.setItem('user', angular.toJson(res.data[0].userName));
                                    sessionStorage.setItem('email', angular.toJson($scope.uMail));
                                    sessionStorage.setItem('permission', angular.toJson(res.data[0].permission));
                                    sessionStorage.setItem('teacherID', angular.toJson(res.data[0].teacherID));
                                } else {
                                    alert('Hibás belépési adatok!');
                                }
                            });
                        }
                    });
                }
            });
        }
    };

    $scope.logout = function () {
        sessionStorage.clear();
        $rootScope.loggedIn = false;
        $location.path('#!/');
    };
});
