app.controller('loginCtrl', function ($scope, $rootScope, factory, factoryTools, $location) {
    $scope.login = function () {
        if ($scope.uMail == null || $scope.uPassword == null) {
            factoryTools.alert('Nem adtál meg minden belépési adatot!', 'danger', 'bxs-error');
        } else {
            factory.logincheck('admin', $scope.uMail, CryptoJS.SHA1($scope.uPassword).toString()).then(function (res) {
                if (res.data.length > 0) {
                    $rootScope.loggedIn = true;
                    $rootScope.loggedPermission = res.data[0].permission;
                    sessionStorage.setItem('user', angular.toJson(res.data[0].userName));
                    sessionStorage.setItem('email', angular.toJson($scope.uMail));
                    sessionStorage.setItem('permission', angular.toJson(res.data[0].permission));
                    sessionStorage.setItem('schoolID', angular.toJson(res.data[0].schoolID));
                    sessionStorage.setItem('status', angular.toJson(res.data[0].status));
                    $rootScope.loggedUser = res.data[0].userName;
                    $rootScope.status = res.data[0].status;
                    if ($rootScope.status == 0) {
                        $location.path('/firstlogin');
                    } else {
                        $location.path('/');
                    }
                } else {
                    factory.logincheck('teacher', $scope.uMail, CryptoJS.SHA1($scope.uPassword).toString()).then(function (res) {
                        if (res.data.length > 0) {
                            $rootScope.loggedIn = true;
                            $rootScope.loggedPermission = res.data[0].permission;
                            sessionStorage.setItem('user', angular.toJson(res.data[0].userName));
                            sessionStorage.setItem('email', angular.toJson($scope.uMail));
                            sessionStorage.setItem('permission', angular.toJson(res.data[0].permission));
                            sessionStorage.setItem('schoolID', angular.toJson(res.data[0].schoolID));
                            sessionStorage.setItem('status', angular.toJson(res.data[0].status));
                            $rootScope.loggedUser = res.data[0].userName;
                            $rootScope.status = res.data[0].status;
                            if ($rootScope.status == 0) {
                                $location.path('/firstlogin');
                            } else {
                                $location.path('/');
                            }
                        } else {
                            factory.logincheck('student', $scope.uMail, CryptoJS.SHA1($scope.uPassword).toString()).then(function (res) {
                                if (res.data.length > 0) {
                                    $rootScope.loggedIn = true;
                                    $rootScope.loggedPermission = res.data[0].permission;
                                    sessionStorage.setItem('user', angular.toJson(res.data[0].userName));
                                    sessionStorage.setItem('email', angular.toJson($scope.uMail));
                                    sessionStorage.setItem('permission', angular.toJson(res.data[0].permission));
                                    sessionStorage.setItem('teacherID', angular.toJson(res.data[0].teacherID));
                                    sessionStorage.setItem('status', angular.toJson(res.data[0].status));
                                    $rootScope.loggedUser = res.data[0].userName;
                                    $rootScope.status = res.data[0].status;
                                    if ($rootScope.status == 0) {
                                        $location.path('/firstlogin');
                                    } else {
                                        $location.path('/');
                                    }
                                } else {
                                    factoryTools.alert('Hibás belépési adatok!', 'danger', 'bxs-error');
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
