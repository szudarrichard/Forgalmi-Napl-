app.controller('teacherCtrl', function ($scope, factory, factoryTools) {
    $scope.peoples = [];
    $scope.db = [];
    $scope.teachers = [];
    $scope.decide = 0;
    $scope.userTitle = 'Tanár';

    //Tanárok listája a belépett administrátor iskolájában
    factory.select('teacher', 'schoolID', angular.fromJson(sessionStorage.getItem('schoolID'))).then(function (res) {
        $scope.teachers = res;
    });

    //Felvétel
    $scope.addPeople = function () {
        $scope.people = { schoolID: angular.fromJson(sessionStorage.getItem('schoolID')), permission: '2', clockStatus: '1', status: '1' };
        $scope.modaltitle = 'Új tanár felvétele';
        $scope.modalBtn = 'Felvesz';
        $scope.modalType = 'success';
        $scope.mode = 1;
    };

    //Módosítás
    $scope.modPeople = function (id) {
        $scope.modaltitle = 'Tanár adatainak módosítása';
        $scope.modalBtn = 'Módosít';
        $scope.modalType = 'warning';
        $scope.mode = 2;
        factory.select('teacher', 'ID', id).then(function (res) {
            $scope.people = res[0];
        });
    };

    //Törlés
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
                factoryTools.alert('Nem adtál meg minden adatot!', 'danger', 'bxs-error');
            } else {
                factory.select('teacher', 'email', $scope.people.email).then(function (res) {
                    if (res.length != 0) {
                        factoryTools.alert('Ez az email cím már foglalt!', 'danger', 'bxs-error');
                    } else {
                        factory.select('teacher', 'phoneNum', $scope.people.phoneNum).then(function (res) {
                            if (res.length != 0) {
                                factoryTools.alert('Ez a telefonszám  már foglalt!', 'danger', 'bxs-error');
                            } else {
                                factory.insert('teacher', $scope.people).then(function (res) {
                                    $scope.people.ID = res.insertId;
                                    $scope.peoples.push($scope.people);
                                    $scope.people = {};
                                    factoryTools.alert('Tanár felvétele sikeres!', 'success', 'bx-check-circle');
                                });
                            }
                        });
                    }
                });
            }
        }

        // update
        if ($scope.mode == 2) {
            if ($scope.people.userName == null || $scope.people.password == null || $scope.people.email == null || $scope.people.phoneNum == null) {
                factoryTools.alert('Nem adtál meg minden adatot!', 'danger', 'bxs-error');
            } else {
                factory.select('teacher', 'email', $scope.people.email).then(function (res) {
                    if (res.length != 0) {
                        factoryTools.alert('Ez az email cím már foglalt!', 'danger', 'bxs-error');
                    } else {
                        factory.select('teacher', 'phoneNum', $scope.people.phoneNum).then(function (res) {
                            if (res.length != 0) {
                                factoryTools.alert('Ez a telefonszám  már foglalt!', 'danger', 'bxs-error');
                            } else {
                                factory.update('teacher', $scope.people.ID, $scope.people).then(function (res) {
                                    let index = $scope.peoples.findIndex((item) => item.ID === $scope.people.ID);
                                    $scope.peoples[index] = $scope.people;
                                    $scope.people = {};
                                    factoryTools.alert('Az adatok módosítása sikeres!', 'success', 'bx-check-circle');
                                });
                            }
                        });
                    }
                });
            }
        }

        // delete
        if ($scope.mode == 3) {
            factory.delete('teacher', $scope.people.ID).then(function (res) {
                let index = $scope.peoples.findIndex((item) => item.ID === $scope.people.ID);
                $scope.peoples.splice(index, 1);
                $scope.people = {};
                factoryTools.alert('Az adat eltávolítva!', 'success', 'bx-check-circle');
            });
        }
    };
});
