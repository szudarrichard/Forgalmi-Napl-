app.controller('settingsCtrl', function ($scope, $rootScope, factory, $location) {
    $scope.userPerm = ['inactive', 'student', 'teacher', 'admin'];
    $scope.password = {};
    $scope.phoneNum = {};
    $scope.email = {};
    

    $scope.passMod = function () {
        if ($scope.password.password == null || $scope.uNewPasswordAgain == null) {
            alert('Nem adott meg minden adatot!');
        } else {
            if ($scope.password.password != $scope.uNewPasswordAgain) {
                alert('A két jelszó nem egyezik meg!');
            } else {
                factory.select($scope.userPerm[$rootScope.loggedPermission], 'email', $rootScope.loggedUserMail).then(function (res) {
                    console.log(res);
                    let data = { password: CryptoJS.SHA1($scope.password.password).toString() };
                    console.log(data);
                    factory.update($scope.userPerm[$rootScope.loggedPermission], res[0].ID, data).then(function (res) {
                        alert('Sikeres jelszó változatás!');
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
            alert('Nem adott meg minden adatot!');
        } else {
            if ($scope.phoneNum.phoneNum != $scope.uNewPhoneAgain) {
                alert('A két email nem egyezik meg!');
            } else {
                factory.select($scope.userPerm[$rootScope.loggedPermission], 'email', $rootScope.loggedUserMail).then(function (res) {
                    console.log(res);
                    let data = { phoneNum: $scope.phoneNum.phoneNum};
                    console.log(data);
                    factory.update($scope.userPerm[$rootScope.loggedPermission], res[0].ID, data).then(function (res) {
                        alert('Sikeres telefonszám változtatás!');
                        sessionStorage.clear();
                        $rootScope.loggedIn = false;
                        $location.path('#!/');
                    });
                });
            }
        }
    };
});
