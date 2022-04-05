app.controller('studentsCtrl', function ($scope, factory) {
    $scope.peoples = [];
    $scope.db = [];
    $scope.teachers = [];
    $scope.students = [];
    $scope.lessions = [];
    $scope.decide = 1;

    $scope.userTitle = 'Diák';

    //admin => diákok kilistázása az admin iskolájába
    if (angular.fromJson(sessionStorage.getItem('permission')) == 3) {
        factory.select('teacher', 'schoolID', angular.fromJson(sessionStorage.getItem('schoolID'))).then(function (res) {
            var assistObj = [];
            $scope.teachers = res;
            for (let i = 0; i < res.length; i++) {
                factory.select('student', 'teacherID', res[i].ID).then(function (res) {
                    assistObj[i] = res;
                    for (let j = 0; j < assistObj[i].length; j++) {
                        $scope.students.push(assistObj[i][j]);
                    }
                });
            }
            assistObj = [];
        });
    }

    //tanár => saját Diákok
    if (angular.fromJson(sessionStorage.getItem('permission')) == 2) {
        factory.select('teacher', 'email', angular.fromJson(sessionStorage.getItem('email'))).then(function (res) {
            factory.select('student', 'teacherID', res[0].ID).then(function (res) {
                $scope.students = res;
            });
        });
    }

    //új diák felvétele
    $scope.addPeople = function () {
        if (angular.fromJson(sessionStorage.getItem('teacherID')) > 0) {
            $scope.people = { teacherID: angular.fromJson(sessionStorage.getItem('teacherID')), permission: '1', status: '1' };
        } else {
            $scope.people = { permission: '1', status: '1' };
        }
        $scope.modaltitle = 'Új diák felvétele';
        $scope.modalBtn = 'Felvesz';
        $scope.modalType = 'success';
        $scope.mode = 1;
    };

    //kiválasztott diák karton
    $scope.diary = function (id) {
        $scope.modaltitle = 'Diák karton';
        $scope.modalBtn = '';
        $scope.modalType = 'warning';
        $scope.mode = 4;
        factory.select('clock', 'studentID', id).then(function (res) {
            $scope.lessions = res;
        });
    };

    //kiválasztott diák módosítása
    $scope.modPeople = function (id) {
        $scope.modaltitle = 'Diák adatainak módosítása';
        $scope.modalBtn = 'Módosít';
        $scope.modalType = 'warning';
        $scope.mode = 2;
        factory.select('student', 'ID', id).then(function (res) {
            $scope.people = res[0];
        });
    };

    //kiválasztott diák törlése
    $scope.delPeople = function (id) {
        $scope.mode = 3;
        $scope.modaltitle = 'Diák törlése';
        $scope.modalBtn = 'Töröl';
        $scope.modalType = 'danger';
        factory.select('student', 'ID', id).then(function (res) {
            $scope.people = res[0];
        });
    };

    //submit button események
    $scope.submit = function () {
        // insert
        if ($scope.mode == 1) {
            if ($scope.people.userName == null || $scope.people.email == null || $scope.people.phoneNum == null || $scope.people.teacherID == null) {
                factory.alert('Nem adtál meg minden adatot!', 'danger', 'bxs-error');
            } else {
                factory.insert('student', $scope.people).then(function (res) {
                    $scope.people.ID = res.insertId;
                    $scope.peoples.push($scope.people);
                    $scope.people = {};
                    factory.alert('Diák felvétele sikeres!', 'success', 'bx-check-circle');
                });
            }
        }

        // update
        if ($scope.mode == 2) {
            if ($scope.people.userName == null || $scope.people.password == null || $scope.people.email == null || $scope.people.phoneNum == null) {
                factory.alert('Nem adtál meg minden adatot!', 'danger', 'bxs-error');
            } else {
                factory.update('student', $scope.people.ID, $scope.people).then(function (res) {
                    let index = $scope.peoples.findIndex((item) => item.ID === $scope.people.ID);
                    $scope.peoples[index] = $scope.people;
                    $scope.people = {};
                    factory.alert('Az adatok módosítása sikeres!', 'success', 'bx-check-circle');
                });
            }
        }

        // delete
        if ($scope.mode == 3) {
            factory.delete('student', $scope.people.ID).then(function (res) {
                let index = $scope.peoples.findIndex((item) => item.ID === $scope.people.ID);
                $scope.peoples.splice(index, 1);
                $scope.people = {};
                factory.alert('Az adat eltávolítva!', 'success', 'bx-check-circle');
            });
        }
    };
});
