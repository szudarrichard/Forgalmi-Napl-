app.controller('firstloginCtrl', function ($scope, $rootScope, factory, factoryTools, $location) {
    $scope.userPerm = ['inactive', 'student', 'teacher', 'admin'];

    $scope.password = {};

    $scope.passMod = function () {
        if ($scope.password.password == null || $scope.uNewPasswordAgain == null) {
            factoryTools.alert('Nem adott meg minden adatot!', 'danger', 'bxs-error');
        } else {
            if ($scope.password.password != $scope.uNewPasswordAgain) {
                factoryTools.alert('A két jelszó nem egyezik meg!', 'danger', 'bxs-error');
            } else {
                factory.select($scope.userPerm[$rootScope.loggedPermission], 'email', $rootScope.loggedUserMail).then(function (res) {
                    console.log(res);
                    let data = { password: CryptoJS.SHA1($scope.password.password).toString(), status: 1 };
                    console.log(data);
                    factory.update($scope.userPerm[$rootScope.loggedPermission], res[0].ID, data).then(function (res) {
                        factoryTools.alert('Sikeres jelszó változatás!', 'success', 'bx-check-circle');
                        sessionStorage.clear();
                        $rootScope.loggedIn = false;
                        $location.path('#!/');
                    });
                });
            }
        }
    };
});
