app.controller('settingsCtrl', function ($scope, $rootScope, factory, factoryTools, $location) {
    $scope.userPerm = ['inactive', 'student', 'teacher', 'admin'];
    $scope.password = {};
    $scope.phoneNum = {};
    $scope.email = {};
    $scope.teacherdata =  [];

    
    factory.select('teacher', 'ID', angular.fromJson(sessionStorage.getItem('teacherID'))).then(function (res) {
        $scope.teacherdata.push({res});
    });
    console.log($scope.teacherdata);

    $scope.passMod = function () {
        factory.select($scope.userPerm[$rootScope.loggedPermission], 'email', $rootScope.loggedUserMail).then(function(res) {
            console.log(CryptoJS.SHA1(res[0].password).toString());
            if(CryptoJS.SHA1($scope.password.oldpassword) != res[0].password)
            {
                factoryTools.alert('Nem a jelenlegi jelszavát adta meg!', 'danger', 'bxs-error');
            }
            else
            {
                if ($scope.password.oldpassword == null || $scope.password.newpassword1 == null || $scope.password.newpassword2 == null) {
                    factoryTools.alert('Nem adtál meg minden adatot!', 'danger', 'bxs-error');
                } else {
                    if ($scope.password.newpassword1 != $scope.password.newpassword2) {
                        factoryTools.alert('A két jelszó nem egyezik meg!', 'danger', 'bxs-error');
                    } else {
                        factory.select($scope.userPerm[$rootScope.loggedPermission], 'email', $rootScope.loggedUserMail).then(function (res) {
                            let data = { password: CryptoJS.SHA1($scope.password.newpassword1).toString() };
                            factory.update($scope.userPerm[$rootScope.loggedPermission], res[0].ID, data).then(function (res) {
                                factoryTools.alert('Sikeres jelszó változatás!\nKérjük jelentkezzen be újra!', 'success', 'bx-check-circle');
                                sessionStorage.clear();
                                $rootScope.loggedIn = false;
                                $location.path('#!/');
                            });
                        });
                    }
                }
            }
        });
    };

    $scope.emailMod = function () {
        factory.select($scope.userPerm[$rootScope.loggedPermission], 'email', $rootScope.loggedUserMail).then(function(res) {
            if($rootScope.loggedUserMail != $scope.email.oldemail)
            {
                factoryTools.alert('Nem a régi email címet adta meg!', 'danger', 'bxs-error');
            }
            else{
                if ($scope.email.oldemail == null || $scope.email.newemail1 == null || $scope.email.newemail2 == null) {
                    factoryTools.alert('Nem adtál meg minden adatot!', 'danger', 'bxs-error');
                } else {
                    if ($scope.email.newemail1 != $scope.email.newemail2) {
                        factoryTools.alert('A két email nem egyezik meg!', 'danger', 'bxs-error');
                    } else {
                        factory.select('student', 'email', $scope.email.newemail1).then(function (res) {
                            if (res.length != 0) {
                                factoryTools.alert('Az email cím foglalt!', 'danger', 'bxs-error');
                            } else {
                                factory.select('teacher', 'email', $scope.email.newemail1).then(function (res) {
                                    if (res.length != 0) {
                                        factoryTools.alert('Az email cím foglalt!', 'danger', 'bxs-error');
                                    } else {
                                        factory.select('admin', 'email', $scope.email.newemail1).then(function (res) {
                                            if (res.length != 0) {
                                                factoryTools.alert('Az email cím foglalt!', 'danger', 'bxs-error');
                                            } else {
                                                let data = { email: $scope.email.newemail1 };
                                                factory.select($scope.userPerm[$rootScope.loggedPermission], 'email', $rootScope.loggedUserMail).then(function (res) {
                                                    factory.update($scope.userPerm[$rootScope.loggedPermission], res[0].ID, data).then(function (res) {
                                                        factoryTools.alert('Sikeres email változatás!\nKérjük jelentkezzen be újra!', 'success', 'bx-check-circle');
                                                        sessionStorage.clear();
                                                        $rootScope.loggedIn = false;
                                                        $location.path('#!/');
                                                    });
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            }
        });
    };

    $scope.phoneMod = function () {
        if ($rootScope.phoneNum != $scope.phoneNum.oldphoneNum ) {
            factoryTools.alert('Nem egyezik a régi telefonszám!', 'danger', 'bxs-error');
        }
        else {
            if ($scope.phoneNum.oldphoneNum == null || $scope.phoneNum.newphoneNum1 == null || $scope.phoneNum.newphoneNum2 == null) {
                factoryTools.alert('Nem adtál meg minden adatot!', 'danger', 'bxs-error');
            } else {
                if ($scope.phoneNum.newphoneNum1 != $scope.phoneNum.newphoneNum2) {
                    factoryTools.alert('A két telefonszám nem egyezik meg!', 'danger', 'bxs-error');
                } else {
                    factory.select('student', 'email', $scope.phoneNum.newphoneNum1).then(function (res) {
                        if (res.length != 0) {
                            factoryTools.alert('Ez a telefonszám már foglalt!', 'danger', 'bxs-error');
                        } else {
                            factory.select('teacher', 'email', $scope.phoneNum.newphoneNum1).then(function (res) {
                                if (res.length != 0) {
                                    factoryTools.alert('Ez a telefonszám már foglalt!', 'danger', 'bxs-error');
                                } else {
                                    factory.select('admin', 'email', $scope.phoneNum.newphoneNum1).then(function (res) {
                                        if (res.length != 0) {
                                            factoryTools.alert('Ez a telefonszám már foglalt!', 'danger', 'bxs-error');
                                        } else {
                                            let data = { phoneNum: $scope.phoneNum.newphoneNum1 };
                                            factory.select($scope.userPerm[$rootScope.loggedPermission], 'email', $rootScope.loggedUserMail).then(function (res) {
                                                factory.update($scope.userPerm[$rootScope.loggedPermission], res[0].ID, data).then(function (res) {
                                                    factoryTools.alert('Sikeres telefonszám változtatás!', 'success', 'bx-check-circle');
                                                });
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            }
        }
    };
});
