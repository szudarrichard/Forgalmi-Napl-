app.controller('teacherCtrl', function ($scope, $rootScope, factory) {
    $scope.teachers = [];
    $scope.db = [];

    factory.selectAll('teacher').then(function (res) {
        $scope.teachers = res;
        for (let i = 0; i < $scope.teachers.length; i++) {
            $scope.db[i] = 0;
        }
    });

    $scope.addTeacher = function () {
        $scope.teacher = {};
        $scope.modaltitle = 'Új tanár felvétele';
        $scope.modalBtn = 'Felvesz';
        $scope.modalType = 'success';
        $scope.mode = 1;
    };

    $scope.modTeacher = function (id) {
        $scope.modaltitle = 'Tanár adatainak módosítása';
        $scope.modalBtn = 'Módosít';
        $scope.modalType = 'warning';
        $scope.mode = 2;
        factory.select('teacher', 'ID', id).then(function (res) {
            $scope.teacher = res[0];
        });
    };

    $scope.delTeacher = function (id) {
        $scope.mode = 3;
        $scope.modaltitle = 'Tanár törlése';
        $scope.modalBtn = 'Töröl';
        $scope.modalType = 'danger';
        factory.select('teacher', 'ID', id).then(function (res) {
            $scope.teacher = res[0];
        });
    };

    $scope.submit = function () {
        //TODO theacher push id
        $scope.schoolID = { schoolID: angular.fromJson(sessionStorage.getItem('schoolID')) };
        //push nem működik ebben a formában
        $scope.teacher.push($scope.schoolID);
        console.log($scope.teacher);
        console.log($scope.schoolID);
        // insert
        if ($scope.mode == 1) {
            if ($scope.teacher.userName == null || $scope.teacher.email == null || $scope.teacher.phoneNum == null) {
                alert('Nem adtál meg minden adatot!');
            } else {
                factory.insert('teacher', $scope.teacher).then(function (res) {
                    $scope.teachers.push($scope.teacher);
                    $scope.teacher = {};
                });
            }
        }

        // update
        if ($scope.mode == 2) {
            if ($scope.teacher.userName == null || $scope.teacher.password == null || $scope.teacher.email == null || $scope.teacher.phoneNum == null) {
                alert('Nem adtál meg minden adatot!');
            } else {
                factory.update('teacher', $scope.teacher.ID, $scope.teacher).then(function (res) {
                    let index = $scope.teachers.findIndex((item) => item.ID === $scope.teacher.ID);
                    $scope.teachers[index] = $scope.teacher;
                    $scope.teacher = {};
                });
            }
        }

        // delete
        if ($scope.mode == 3) {
            factory.delete('teacher', $scope.teacher.ID).then(function (res) {
                let index = $scope.teachers.findIndex((item) => item.ID === $scope.teacher.ID);
                $scope.teachers.splice(index, 1);
                $scope.teacher = {};
            });
        }
    };
});
