app.controller('loginCtrl', function($scope, $rootScope, factory, $location) {

    $scope.login = function() {
        
        if ($scope.email == null || $scope.passwrd == null) {
            alert('Nem adtál meg minden belépési adatot!');
        } else {
            factory.logincheck('admin', $scope.email, CryptoJS.SHA1($scope.passwrd).toString()).then(function(res) {
                if (res.data.length > 0) 
                {
                    $rootScope.loggedIn = true;
                    $rootScope.loggedUser = $scope.email;
                    sessionStorage.setItem('forgalminaploUser', angular.toJson($scope.email));
                } 
                else 
                {
                    alert('Hibás belépési adatok!');
                }
            });
        }
    }
    

    $scope.logout = function() {
        sessionStorage.removeItem('forgalminaploUser');
        $rootScope.loggedUser = "";
        $rootScope.loggedIn = false;
        $location.path('#!/');
    }
})