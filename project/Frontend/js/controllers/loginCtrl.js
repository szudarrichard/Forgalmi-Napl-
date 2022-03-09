app.controller('loginCtrl', function ($scope, $rootScope, factory, $location) {
    $scope.login = function () {
        if ($scope.uMail == null || $scope.uPassword == null) {
            alert('Nem adtál meg minden belépési adatot!');
        } else {
            factory.logincheck('admin', $scope.uMail, CryptoJS.SHA1($scope.uPassword).toString()).then(function (res) {
                if (res.data.length > 0) {
                    $rootScope.loggedIn = true;
                    $rootScope.loggedUser = $scope.uMail;
                    sessionStorage.setItem('forgalminaploUser', angular.toJson($scope.uMail));
                } else {
                    factory.logincheck('tanar', $scope.uMail, CryptoJS.SHA1($scope.uPassword).toString()).then(function (res) {
                        if (res.data.length > 0) {
                            $rootScope.loggedIn = true;
                            $rootScope.loggedUser = $scope.uMail;
                            sessionStorage.setItem('forgalminaploUser', angular.toJson($scope.uMail));
                        } else {
                            factory.logincheck('diak', $scope.uMail, CryptoJS.SHA1($scope.uPassword).toString()).then(function (res) {
                                if (res.data.length > 0) {
                                    $rootScope.loggedIn = true;
                                    $rootScope.loggedUser = $scope.uMail;
                                    sessionStorage.setItem('forgalminaploUser', angular.toJson($scope.uMail));
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
        sessionStorage.removeItem('forgalminaploUser');
        $rootScope.loggedUser = '';
        $rootScope.loggedIn = false;
        $location.path('#!/');
    };
});
