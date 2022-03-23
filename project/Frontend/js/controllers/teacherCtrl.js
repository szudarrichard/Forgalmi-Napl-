app.controller('teacherCtrl', function ($scope, $rootScope, factory) {
    $scope.peoples = [];
    $scope.db = [];
    //TODO: modal feliratok $scope

    factory.selectAll('teacher').then(function (res) {
        $scope.peoples = res;
        for (let i = 0; i < $scope.peoples.length; i++) {
            $scope.db[i] = 0;
        }
    });

    $scope.addPeople = function () {
        $scope.people = { schoolID: angular.fromJson(sessionStorage.getItem('schoolID')), permission: '2', clockStatus: '1', status: '1' };
        $scope.modaltitle = 'Új tanár felvétele';
        $scope.modalBtn = 'Felvesz';
        $scope.modalType = 'success';
        $scope.mode = 1;
    };

    $scope.modPeople = function (id) {
        $scope.modaltitle = 'Tanár adatainak módosítása';
        $scope.modalBtn = 'Módosít';
        $scope.modalType = 'warning';
        $scope.mode = 2;
        factory.select('teacher', 'ID', id).then(function (res) {
            $scope.people = res[0];
        });
    };

    $scope.delPeople = function (id) {
        $scope.mode = 3;
        $scope.modaltitle = 'Tanár törlése';
        $scope.modalBtn = 'Töröl';
        $scope.modalType = 'danger';
        factory.select('teacher', 'ID', id).then(function (res) {
            $scope.people = res[0];
        });
    };

    $scope.submit = function () {
        // insert
        if ($scope.mode == 1) {
            if ($scope.people.userName == null || $scope.people.email == null || $scope.people.phoneNum == null) {
                alert('Nem adtál meg minden adatot!');
            } else {
                factory.insert('teacher', $scope.people).then(function (res) {
                    $scope.people.ID = res.insertId;
                    $scope.peoples.push($scope.people);
                    $scope.people = {};
                });
            }
        }

        // update
        if ($scope.mode == 2) {
            if ($scope.people.userName == null || $scope.people.password == null || $scope.people.email == null || $scope.people.phoneNum == null) {
                alert('Nem adtál meg minden adatot!');
            } else {
                factory.update('teacher', $scope.people.ID, $scope.people).then(function (res) {
                    let index = $scope.peoples.findIndex((item) => item.ID === $scope.people.ID);
                    $scope.peoples[index] = $scope.people;
                    $scope.people = {};
                });
            }
        }

        // delete
        if ($scope.mode == 3) {
            factory.delete('teacher', $scope.people.ID).then(function (res) {
                let index = $scope.peoples.findIndex((item) => item.ID === $scope.people.ID);
                $scope.peoples.splice(index, 1);
                $scope.people = {};
            });
        }
    };
});
