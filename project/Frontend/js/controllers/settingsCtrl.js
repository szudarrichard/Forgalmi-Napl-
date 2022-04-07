app.controller('settingsCtrl', function ($scope, $rootScope, factory, factoryAlert, $location) {
    $scope.userPerm = ['inactive', 'student', 'teacher', 'admin'];
    $scope.password = {};
    $scope.phoneNum = {};
    $scope.email = {};

    $scope.passMod = function () {
        if ($scope.password.password == null || $scope.uNewPasswordAgain == null) {
            factoryAlert.alert('Nem adtál meg minden adatot!', 'danger', 'bxs-error');
        } else {
            if ($scope.password.password != $scope.uNewPasswordAgain) {
                factoryAlert.alert('A két jelszó nem egyezik meg!', 'danger', 'bxs-error');
            } else {
                factory.select($scope.userPerm[$rootScope.loggedPermission], 'email', $rootScope.loggedUserMail).then(function (res) {
                    let data = { password: CryptoJS.SHA1($scope.password.password).toString() };
                    factory.update($scope.userPerm[$rootScope.loggedPermission], res[0].ID, data).then(function (res) {
                        factoryAlert.alert('Sikeres jelszó változatás!\nKérjük jelentkezzen be újra!', 'success', 'bx-check-circle');
                        sessionStorage.clear();
                        $rootScope.loggedIn = false;
                        $location.path('#!/');
                    });
                });
            }
        }
    };

    $scope.emailMod = function () {
        if ($scope.email.email == null || $scope.uNewEmailAgain == null) {
            factoryAlert.alert('Nem adtál meg minden adatot!', 'danger', 'bxs-error');
        } else {
            if ($scope.email.email != $scope.uNewEmailAgain) {
                factoryAlert.alert('A két email nem egyezik meg!', 'danger', 'bxs-error');
            } else {
                factory.select('student', 'email', $rootScope.loggedUserMail).then(function (res) {
                    if (res.length != 0) {
                        factoryAlert.alert('Az email cím foglalt!', 'danger', 'bxs-error');
                    } else {
                        factory.select('teacher', 'email', $rootScope.loggedUserMail).then(function (res) {
                            if (res.length != 0) {
                                factoryAlert.alert('Az email cím foglalt!', 'danger', 'bxs-error');
                            } else {
                                factory.select('admin', 'email', $rootScope.loggedUserMail).then(function (res) {
                                    if (res.length != 0) {
                                        factoryAlert.alert('Az email cím foglalt!', 'danger', 'bxs-error');
                                    } else {
                                        let data = { email: $scope.email.email };
                                        factory.update($scope.userPerm[$rootScope.loggedPermission], res[0].ID, data).then(function (res) {
                                            factoryAlert.alert('Sikeres email változatás!\nKérjük jelentkezzen be újra!', 'success', 'bx-check-circle');
                                            sessionStorage.clear();
                                            $rootScope.loggedIn = false;
                                            $location.path('#!/');
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    };

    $scope.phoneMod = function () {
        if ($scope.phoneNum.phoneNum == null || $scope.uNewPhoneAgain == null) {
            factoryAlert.alert('Nem adtál meg minden adatot!', 'danger', 'bxs-error');
        } else {
            if ($scope.phoneNum.phoneNum != $scope.uNewPhoneAgain) {
                factoryAlert.alert('A két telefonszám nem egyezik meg!', 'danger', 'bxs-error');
            } else {
                factory.select('student', 'email', $rootScope.loggedUserMail).then(function (res) {
                    if (res.length != 0) {
                        factoryAlert.alert('Ez a telefonszám már foglalt!', 'danger', 'bxs-error');
                    } else {
                        factory.select('teacher', 'email', $rootScope.loggedUserMail).then(function (res) {
                            if (res.length != 0) {
                                factoryAlert.alert('Ez a telefonszám már foglalt!', 'danger', 'bxs-error');
                            } else {
                                factory.select('admin', 'email', $rootScope.loggedUserMail).then(function (res) {
                                    if (res.length != 0) {
                                        factoryAlert.alert('Ez a telefonszám már foglalt!', 'danger', 'bxs-error');
                                    } else {
                                        let data = { phoneNum: $scope.phoneNum.phoneNum };
                                        factory.update($scope.userPerm[$rootScope.loggedPermission], res[0].ID, data).then(function (res) {
                                            factoryAlert.alert('Sikeres telefonszám változtatás!', 'success', 'bx-check-circle');
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    };
});
