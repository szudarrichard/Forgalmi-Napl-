app.controller('studentsCtrl', function ($scope, $rootScope, factory) {
    $rootScope.loggedUserID = angular.fromJson(sessionStorage.getItem('userID'));
    $scope.students = [];
    $scope.db = [];

    factory.selectAll('student').then(function (res) {
        $scope.students = res;
        for (let i = 0; i < $scope.students.length; i++) {
            $scope.db[i] = 0;
        }
    });

    $scope.addStudent = function () {
        $scope.student = { teacherID: angular.fromJson(sessionStorage.getItem('teacherID')), permission: '1', status: '1' };
        $scope.modaltitle = 'Új diák felvétele';
        $scope.modalBtn = 'Felvesz';
        $scope.modalType = 'success';
        $scope.mode = 1;
    };

    $scope.modStudent = function (id) {
        $scope.modaltitle = 'Diák adatainak módosítása';
        $scope.modalBtn = 'Módosít';
        $scope.modalType = 'warning';
        $scope.mode = 2;
        factory.select('student', 'ID', id).then(function (res) {
            $scope.student = res[0];
        });
    };

    $scope.delStudent = function (id) {
        $scope.mode = 3;
        $scope.modaltitle = 'Diák törlése';
        $scope.modalBtn = 'Töröl';
        $scope.modalType = 'danger';
        factory.select('student', 'ID', id).then(function (res) {
            $scope.student = res[0];
        });
    };

    $scope.submit = function () {
        // insert
        if ($scope.mode == 1) {
            if ($scope.student.userName == null || $scope.student.email == null || $scope.student.phoneNum == null) {
                alert('Nem adtál meg minden adatot!');
            } else {
                factory.insert('student', $scope.student).then(function (res) {
                    $scope.student.ID = res.insertId;
                    $scope.students.push($scope.student);
                    $scope.student = {};
                });
            }
        }

        // update
        if ($scope.mode == 2) {
            if ($scope.student.userName == null || $scope.student.password == null || $scope.student.email == null || $scope.student.phoneNum == null) {
                alert('Nem adtál meg minden adatot!');
            } else {
                factory.update('student', $scope.student.ID, $scope.student).then(function (res) {
                    let index = $scope.students.findIndex((item) => item.ID === $scope.student.ID);
                    $scope.students[index] = $scope.student;
                    $scope.student = {};
                });
            }
        }

        // delete
        if ($scope.mode == 3) {
            factory.delete('student', $scope.student.ID).then(function (res) {
                let index = $scope.students.findIndex((item) => item.ID === $scope.student.ID);
                $scope.students.splice(index, 1);
                $scope.student = {};
            });
        }
    };
});
