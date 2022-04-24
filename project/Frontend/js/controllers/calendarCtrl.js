app.controller('calendarCtrl', function ($scope, $rootScope, factory, factoryCalendar, factoryTools) {
    $scope.reservations = [];
    $scope.students = [];
    $scope.decide = 2;

    $scope.modaltitle = 'Óra adatok';
    $scope.modalBtn = 'Felvesz';
    $scope.modalType = 'success';

    //Tanár
    if (angular.fromJson(sessionStorage.getItem('permission')) == 2) {
        factory.select('teacher', 'email', angular.fromJson(sessionStorage.getItem('email'))).then(function (res) {
            factory.select('student', 'teacherID', res[0].ID).then(function (res) {
                let events = [];
                $scope.students = res;
                for (let i = 0; i < res.length; i++) {
                    factory.select('clock', 'studentID', res[i].ID).then(function (res) {
                        $scope.reservations = res;
                        $scope.reservations.forEach((reservation) => {
                            let color = '#0A5355';

                            if (reservation.startKM != reservation.endKM) {
                                color = '#45BA07';
                            }

                            factory.select('student', 'ID', reservation.studentID).then(function (res) {
                                let title = res[0].userName;

                                events.push({
                                    title: title,
                                    start: reservation.start,
                                    end: reservation.end,
                                    id: reservation.ID,
                                    color: color, //Tanár naptár színek, #45BA07 - az óra be lett fejezve( fizetett ))
                                });
                                factoryCalendar.toCalendar(events, 'calendar', 'timeGridDay', true, true, 'clock');
                            });
                        });
                    });
                }
            });
        });
    } else {
        //Diák
        factory.select('teacher', 'ID', angular.fromJson(sessionStorage.getItem('teacherID'))).then(function (res) {
            factory.select('student', 'teacherID', res[0].ID).then(function (res) {
                let events = [];
                $scope.students = res;
                for (let i = 0; i < res.length; i++) {
                    factory.select('clock', 'studentID', res[i].ID).then(function (res) {
                        $scope.reservations = res;
                        $scope.reservations.forEach((reservation) => {
                            factory.select('student', 'ID', reservation.studentID).then(function (res) {
                                let title = 'Foglalt';
                                let color = '#C70039';
                                if (res[0].userName == angular.fromJson(sessionStorage.getItem('user'))) {
                                    title = res[0].userName;
                                    color = '#30A510';
                                }
                                events.push({
                                    title: title,
                                    start: reservation.start,
                                    end: reservation.end,
                                    id: reservation.ID,
                                    color: color,
                                });
                                factoryCalendar.toCalendar(events, 'calendar', 'timeGridWeek', true, true, 'clock');
                            });
                        });
                    });
                }
            });
        });
    }

    //Órák beírása
    $scope.submit = function () {
        $scope.lession = {
            ID: document.getElementById('eventID').value,
            startKM: document.getElementById('startKM').value,
            endKM: document.getElementById('endKM').value,
            pay: $('#pay').prop('checked') == true ? '1' : '0',
        };

        if ($scope.lession.endKM == '' || $scope.lession.startKM == '') {
            factoryTools.alert('Nem adott meg minden adatot!', 'danger', 'bxs-error');
        } else {
            if ($scope.lession.endKM < $scope.lession.startKM) {
                factoryTools.alert('A végső KM kissebb mind a kezdő!', 'danger', 'bxs-error');
            } else {
                $scope.car = {
                    sumKM: document.getElementById('endKM').value,
                };

                factory.update('clock', $scope.lession.ID, $scope.lession).then(function (res) {
                    factoryTools.alert('Óra adatainak mentése!', 'success', 'bx-check-circle');
                });

                factory.select('teacher', 'email', angular.fromJson(sessionStorage.getItem('email'))).then(function (res) {
                    factory.select('car', 'teacherID', res[0].ID).then(function (res) {
                        factory.update('car', res[0].ID, $scope.car).then(function (res) {
                            setTimeout(function () {
                                location.reload();
                            }, 1000);
                        });
                    });
                });
            }
        }
    };
});
