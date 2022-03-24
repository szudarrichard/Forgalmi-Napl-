app.controller("settingsCtrl", function ($scope, $rootScope, factory) {
  $scope.userPerm = ["inactive", "student", "teacher", "admin"];
  $scope.password = [];
  $scope.phonenumber = [];

  $scope.passMod = function () {
    if ($scope.password.password == null || $scope.newpasswordagain == null) {
      alert("Nem adott meg minden adatot!");
    } else {
      if ($scope.password.password != $scope.newpasswordagain) {
        alert("A két jelszó nem egyezik meg!");
      } else {
        factory.select($scope.userPerm[$rootScope.loggedPermission], "email", $rootScope.loggedUserMail).then(function (res) {
            console.log(res);
          factory.update($scope.userPerm[$rootScope.loggedPermission], res[0].ID, $scope.password).then(function (res) {
            alert("asd");
          });
        });
      }
    }
  };
});
