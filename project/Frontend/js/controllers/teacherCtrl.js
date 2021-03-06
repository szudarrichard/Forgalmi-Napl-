app.controller('teacherCtrl', function ($scope, factory, factoryTools) {
    $scope.peoples = [];
    $scope.db = [];
    $scope.teachers = [];
    $scope.cars = [];
    $scope.decide = 0;
    $scope.userTitle = 'Tanár';

    //Tanárok listája a belépett administrátor iskolájában
    factory.select('teacher', 'schoolID', angular.fromJson(sessionStorage.getItem('schoolID'))).then(function (res) {
        $scope.peoples = res;
    });

    //Felvétel
    $scope.addPeople = function () {
        let password = 'tanar';
        $scope.people = {
            schoolID: angular.fromJson(sessionStorage.getItem('schoolID')),
            permission: '2',
            clockStatus: '1',
            status: '0',
            password: CryptoJS.SHA1(password).toString(),
        };
        $scope.car = {};
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
        factory.select('car', 'teacherID', id).then(function (res) {
            $scope.car = res[0];
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
            if ($scope.people.userName == null || $scope.people.email == null || $scope.people.phoneNum == null || $scope.car.plateNum == null || $scope.car.sumKM == null) {
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
                                    factoryTools.alert('Tanár felvétele sikeres!', 'success', 'bx-check-circle');

                                    //Tanár autó felvétel
                                    $scope.car.teacherID = $scope.people.ID;
                                    factory.insert('car', $scope.car).then(function (res) {
                                        console.log(res);
                                    });

                                    $scope.people = {};
                                    $scope.car = {};
                                });
                            }
                        });
                    }
                });
            }
        }

        // update
        if ($scope.mode == 2) {
            factory.select('teacher', 'ID', $scope.people.ID).then(function (res) {
                let editdata = [];
                editdata.push(res[0]);

                if ($scope.people.userName == '' || $scope.people.phoneNum == '' || $scope.people.email == '') {
                    factoryTools.alert('Hiányzó adat!', 'danger', 'bxs-error');
                } else {
                    if ($scope.people.userName != editdata[0].userName) {
                        factory.update('teacher', $scope.people.ID, $scope.people).then(function (res) {
                            let index = $scope.peoples.findIndex((item) => item.ID === $scope.people.ID);
                            $scope.peoples[index] = $scope.people;
                            $scope.people = {};
                        });
                    }
                    if ($scope.people.phoneNum != editdata[0].phoneNum) {
                        factory.update('teacher', $scope.people.ID, $scope.people).then(function (res) {
                            let index = $scope.peoples.findIndex((item) => item.ID === $scope.people.ID);
                            $scope.peoples[index] = $scope.people;
                            $scope.people = {};
                        });
                    }
                    if ($scope.people.email != editdata[0].email) {
                        factory.update('teacher', $scope.people.ID, $scope.people).then(function (res) {
                            let index = $scope.peoples.findIndex((item) => item.ID === $scope.people.ID);
                            $scope.peoples[index] = $scope.people;
                            $scope.people = {};
                        });
                    }
                    editdata = [];

                    factory.select('car', 'teacherID', $scope.people.ID).then(function (res) {
                        editdata.push(res[0]);
                        if ($scope.car.plateNum == '' || $scope.car.sumKM == '') {
                            factoryTools.alert('Hiányzó adat!', 'danger', 'bxs-error');
                        } else {
                            if ($scope.car.plateNum != editdata[0].plateNum) {
                                factory.update('car', editdata[0].ID, $scope.car).then(function (res) {
                                    $scope.car = {};
                                });
                            }
                            if ($scope.car.sumKM != editdata[0].sumKM) {
                                factory.update('car', editdata[0].ID, $scope.car).then(function (res) {
                                    $scope.car = {};
                                });
                            }
                        }
                    });

                    //TODO auto adatok módosítása

                    factoryTools.alert('Az adatok módosítása sikeres!', 'success', 'bx-check-circle');
                }
                editdata = [];
            });
        }

        // delete
        if ($scope.mode == 3) {
            factory.select('car', 'teacherID', $scope.people.ID).then(function (res) {
                factory.delete('car', res[0].ID).then(function (res) {
                    factory.delete('teacher', $scope.people.ID).then(function (res) {
                        let index = $scope.peoples.findIndex((item) => item.ID === $scope.people.ID);
                        $scope.peoples.splice(index, 1);
                        $scope.people = {};
                        factoryTools.alert('Az adat eltávolítva!', 'success', 'bx-check-circle');
                    });
                });
            });
        }
    };
});
