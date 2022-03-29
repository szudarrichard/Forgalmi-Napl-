app.controller('studentsCtrl', function ($scope, factory) {
    $scope.peoples = [];
    $scope.db = [];

    //modal feliratok $scope
    $scope.userTitle = 'Diák';

    factory.selectAll('student').then(function (res) {
        $scope.peoples = res;
        for (let i = 0; i < $scope.peoples.length; i++) {
            $scope.db[i] = 0;
        }
    });

    $scope.addPeople = function () {
        $scope.people = { teacherID: angular.fromJson(sessionStorage.getItem('teacherID')), permission: '1', status: '1' };
        $scope.modaltitle = 'Új diák felvétele';
        $scope.modalBtn = 'Felvesz';
        $scope.modalType = 'success';
        $scope.mode = 1;
    };

    $scope.modPeople = function (id) {
        $scope.modaltitle = 'Diák adatainak módosítása';
        $scope.modalBtn = 'Módosít';
        $scope.modalType = 'warning';
        $scope.mode = 2;
        factory.select('student', 'ID', id).then(function (res) {
            $scope.people = res[0];
        });
    };

    $scope.delPeople = function (id) {
        $scope.mode = 3;
        $scope.modaltitle = 'Diák törlése';
        $scope.modalBtn = 'Töröl';
        $scope.modalType = 'danger';
        factory.select('student', 'ID', id).then(function (res) {
            $scope.people = res[0];
        });
    };

    $scope.submit = function () {
        // insert
        if ($scope.mode == 1) {
            if ($scope.people.userName == null || $scope.people.email == null || $scope.people.phoneNum == null) {
                factory.alert('Nem adtál meg minden adatot!', 'danger');
            } else {
                factory.insert('student', $scope.people).then(function (res) {
                    $scope.people.ID = res.insertId;
                    $scope.peoples.push($scope.people);
                    $scope.people = {};
                });
            }
        }

        // update
        if ($scope.mode == 2) {
            if ($scope.people.userName == null || $scope.people.password == null || $scope.people.email == null || $scope.people.phoneNum == null) {
                factory.alert('Nem adtál meg minden adatot!', 'danger');
            } else {
                factory.update('student', $scope.people.ID, $scope.people).then(function (res) {
                    let index = $scope.peoples.findIndex((item) => item.ID === $scope.people.ID);
                    $scope.peoples[index] = $scope.people;
                    $scope.people = {};
                });
            }
        }

        // delete
        if ($scope.mode == 3) {
            factory.delete('student', $scope.people.ID).then(function (res) {
                let index = $scope.peoples.findIndex((item) => item.ID === $scope.people.ID);
                $scope.peoples.splice(index, 1);
                $scope.people = {};
            });
        }
    };
});
