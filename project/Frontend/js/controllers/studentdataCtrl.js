app.controller('studentdataCtrl', function ($scope, $rootScope, factory) {
    $scope.students = [];
    $scope.db = [];

    factory.selectAll('student').then(function (res) {
        $scope.students = res;
        for (let i = 0; i < $scope.students.length; i++) {
            $scope.db[i] = 0;
        }
    });
});