app.controller('settingsCtrl', function ($scope, $rootScope, factory, $location) {
    $scope.userPerm = ['inactive', 'student', 'teacher', 'admin'];
    $scope.password = {};
    $scope.phoneNum = {};
    $scope.email = {};

    $scope.passMod = function () {
        if ($scope.password.password == null || $scope.uNewPasswordAgain == null) {
            factory.alert('Nem adtál meg minden adatot!', 'danger', 'bxs-error');
        } else {
            if ($scope.password.password != $scope.uNewPasswordAgain) {
                factory.alert('A két jelszó nem egyezik meg!', 'danger', 'bxs-error');
            } else {
                factory.select($scope.userPerm[$rootScope.loggedPermission], 'email', $rootScope.loggedUserMail).then(function (res) {
                    let data = { password: CryptoJS.SHA1($scope.password.password).toString() };
                    factory.update($scope.userPerm[$rootScope.loggedPermission], res[0].ID, data).then(function (res) {
                        factory.alert('Sikeres jelszó változatás!\nKérjük jelentkezzen be újra!', 'success', 'bx-check-circle');
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
            factory.alert('Nem adtál meg minden adatot!', 'danger', 'bxs-error');
        } else {
            if ($scope.email.email != $scope.uNewEmailAgain) {
                factory.alert('A két email nem egyezik meg!', 'danger', 'bxs-error');
            } else {
                factory.select($scope.userPerm[$rootScope.loggedPermission], 'email', $rootScope.loggedUserMail).then(function (res) {
                    let data = { email: $scope.email.email };
                    factory.update($scope.userPerm[$rootScope.loggedPermission], res[0].ID, data).then(function (res) {
                        factory.alert('Sikeres email változatás!\nKérjük jelentkezzen be újra!', 'success', 'bx-check-circle');
                        sessionStorage.clear();
                        $rootScope.loggedIn = false;
                        $location.path('#!/');
                    });
                });
            }
        }
    };

    $scope.phoneMod = function () {
        if ($scope.phoneNum.phoneNum == null || $scope.uNewPhoneAgain == null) {
            factory.alert('Nem adtál meg minden adatot!', 'danger', 'bxs-error');
        } else {
            if ($scope.phoneNum.phoneNum != $scope.uNewPhoneAgain) {
                factory.alert('A két telefonszám nem egyezik meg!', 'danger', 'bxs-error');
            } else {
                factory.select($scope.userPerm[$rootScope.loggedPermission], 'email', $rootScope.loggedUserMail).then(function (res) {
                    let data = { phoneNum: $scope.phoneNum.phoneNum };
                    factory.update($scope.userPerm[$rootScope.loggedPermission], res[0].ID, data).then(function (res) {
                        factory.alert('Sikeres telefonszám változtatás!', 'success', 'bx-check-circle');
                    });
                });
            }
        }
    };
});
