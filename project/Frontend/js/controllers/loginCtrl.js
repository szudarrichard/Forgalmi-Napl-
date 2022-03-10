app.controller('loginCtrl', function ($scope, $rootScope, factory, $location) {
    $scope.login = function () {
        if ($scope.uMail == null || $scope.uPassword == null) {
            alert('Nem adtál meg minden belépési adatot!');
        } else {
            factory.logincheck('admin', $scope.uMail, CryptoJS.SHA1($scope.uPassword).toString()).then(function (res) {
                if (res.data.length > 0) {
                    $rootScope.loggedIn = true;
                    $rootScope.loggedUser = $scope.uMail;
                    $rootScope.loggedPermission = res.data[0].permission;
                    sessionStorage.setItem('user', angular.toJson($scope.uMail));
                    sessionStorage.setItem('permission', angular.toJson(res.data[0].permission));
                } else {
                    factory.logincheck('teacher', $scope.uMail, CryptoJS.SHA1($scope.uPassword).toString()).then(function (res) {
                        if (res.data.length > 0) {
                            $rootScope.loggedIn = true;
                            $rootScope.loggedUser = $scope.uMail;
                            $rootScope.loggedPermission = res.data[0].permission;
                            sessionStorage.setItem('user', angular.toJson($scope.uMail));
                            sessionStorage.setItem('permission', angular.toJson(res.data[0].permission));
                        } else {
                            factory.logincheck('student', $scope.uMail, CryptoJS.SHA1($scope.uPassword).toString()).then(function (res) {
                                if (res.data.length > 0) {
                                    $rootScope.loggedIn = true;
                                    $rootScope.loggedUser = $scope.uMail;
                                    $rootScope.loggedPermission = res.data[0].permission;
                                    sessionStorage.setItem('user', angular.toJson($scope.uMail));
                                    sessionStorage.setItem('permission', angular.toJson(res.data[0].permission));
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
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('permission');
        $rootScope.loggedUser = '';
        $rootScope.loggedPermission = '';
        $rootScope.loggedIn = false;
        $location.path('#!/');
    };
});
