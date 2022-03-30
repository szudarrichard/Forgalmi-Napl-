app.controller('firstloginCtrl', function ($scope, $rootScope, factory, $location) {
    
    
    $scope.userPerm = ['inactive', 'student', 'teacher', 'admin'];

    $scope.password = {};


    $scope.passMod = function () {
        if ($scope.password.password == null || $scope.uNewPasswordAgain == null) {
            alert('Nem adott meg minden adatot!');
        } else {
            if ($scope.password.password != $scope.uNewPasswordAgain) {
                alert('A két jelszó nem egyezik meg!');
            } else {
                factory.select($scope.userPerm[$rootScope.loggedPermission], 'email', $rootScope.loggedUserMail).then(function (res) {
                    console.log(res);
                    let data = { password: CryptoJS.SHA1($scope.password.password).toString(), status:1 };
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



});