app.controller('studentsCtrl', function ($scope, factory, factoryTools, $window) {
    $scope.peoples = [];
    $scope.db = [];
    $scope.teachers = [];
    $scope.students = [];
    $scope.decide = 1;

    $scope.userTitle = 'Diák';

    //admin => diákok kilistázása az admin iskolájába
    if (angular.fromJson(sessionStorage.getItem('permission')) == 3) {
        factory.select('teacher', 'schoolID', angular.fromJson(sessionStorage.getItem('schoolID'))).then(function (res) {
            let assistObj = [];
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
        let password = 'diak';
        if (angular.fromJson(sessionStorage.getItem('permission')) == 2) {
            factory.select('teacher', 'email', angular.fromJson(sessionStorage.getItem('email'))).then(function (res) {
                $scope.people = { teacherID: res[0].ID, permission: '1', status: '0', password: CryptoJS.SHA1(password).toString() };
            });
        } else {
            $scope.people = { permission: '1', status: '0', password: CryptoJS.SHA1(password).toString() };
        }
        $scope.modaltitle = 'Új diák felvétele';
        $scope.modalBtn = 'Felvesz';
        $scope.modalType = 'success';
        $scope.mode = 1;
    };

    //kiválasztott diák karton
    $scope.diary = function (id) {
        $scope.modaltitle = 'Diák karton';
        $scope.mode = 4;
        $scope.lessions = [];
        factory.select('student', 'ID', id).then(function (res) {
            $scope.selectedName = res[0].userName;
        });

        factory.select('clock', 'studentID', id).then(function (res) {
            for (let i = 0; i < res.length; i++) {
                if (res[i].startKM != res[i].endKM) {
                    $scope.lessions.push({
                        lessonKM: res[i].endKM - res[i].startKM,
                        startKM: res[i].startKM,
                        endKM: res[i].endKM,
                        payed: res[i].pay,
                        start: moment(res[i].start).locale('hu').format('YYYY-MM-DD HH:mm'),
                    });
                }
            }
        });
    };

    //TODO nyomtatás
    $scope.print = function () {
        var printContents = document.getElementById('print').innerHTML;
        var originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        $window.print();

        document.body.innerHTML = originalContents;
        location.reload();
    };

    //kiválasztott diák módosítása
    $scope.modPeople = function (id) {
        $scope.modaltitle = 'Diák adatainak módosítása';
        $scope.modalBtn = 'Módosít';
        $scope.modalType = 'warning';
        $scope.mode = 2;
        $scope.ID = id;
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
                console.log($scope.people.teacherID);
                factoryTools.alert('Nem adtál meg minden adatot!', 'danger', 'bxs-error');
            } else {
                factory.select('student', 'email', $scope.people.email).then(function (res) {
                    if (res.length != 0) {
                        factoryTools.alert('Ez az email cím már foglalt!', 'danger', 'bxs-error');
                    } else {
                        factory.select('student', 'phoneNum', $scope.people.phoneNum).then(function (res) {
                            if (res.length != 0) {
                                factoryTools.alert('Ez a telefonszám  már foglalt!', 'danger', 'bxs-error');
                            } else {
                                factory.insert('student', $scope.people).then(function (res) {
                                    $scope.people.ID = res.insertId;
                                    $scope.peoples.push($scope.people);
                                    $scope.people = {};
                                    factoryTools.alert('Diák felvétele sikeres!', 'success', 'bx-check-circle');
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
                factory.select('student', 'ID', $scope.people.ID).then(function (res) {
                    let editdata = [];
                    editdata.push(res[0]);

                    if ($scope.people.userName == '' || $scope.people.phoneNum == '' || $scope.people.email == '') {
                        factoryTools.alert('Hiányzó adat!', 'danger', 'bxs-error');
                    } else {
                        if ($scope.people.email != editdata[0].email) {
                            factory.update('student', $scope.people.ID, $scope.people).then(function (res) {
                                let index = $scope.peoples.findIndex((item) => item.ID === $scope.people.ID);
                                $scope.peoples[index] = $scope.people;
                                $scope.people = {};
                            });
                        }
                        if ($scope.people.phoneNum != editdata[0].phoneNum) {
                            factory.update('student', $scope.people.ID, $scope.people).then(function (res) {
                                let index = $scope.peoples.findIndex((item) => item.ID === $scope.people.ID);
                                $scope.peoples[index] = $scope.people;
                                $scope.people = {};
                            });
                        }
                        if ($scope.people.userName != editdata[0].userName) {
                            factory.update('student', $scope.people.ID, $scope.people).then(function (res) {
                                let index = $scope.peoples.findIndex((item) => item.ID === $scope.people.ID);
                                $scope.peoples[index] = $scope.people;
                                $scope.people = {};
                            });
                        }
                        factoryTools.alert('Az adatok módosítása sikeres!', 'success', 'bx-check-circle');
                    }
                    editdata = [];
                });
            }
        }

        // delete
        if ($scope.mode == 3) {
            factory.delete('student', $scope.people.ID).then(function (res) {
                let index = $scope.peoples.findIndex((item) => item.ID === $scope.people.ID);
                $scope.peoples.splice(index, 1);
                $scope.people = {};
                factoryTools.alert('Az adat eltávolítva!', 'success', 'bx-check-circle');
            });
        }
    };
});
