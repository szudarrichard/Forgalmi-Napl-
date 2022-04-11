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
                                color = '#45BA07'; //befejezett óra
                            }
                            factory.select('student', 'ID', reservation.studentID).then(function (res) {
                                events.push({
                                    title: res[0].userName,
                                    start: reservation.start,
                                    end: reservation.end,
                                    id: reservation.ID,
                                    color: color, //Tanár naptár színek (#0A5355 - alap, #45BA07 - az óra be lett fejezve)
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

    $scope.submit = function () {
        $scope.lession = {
            ID: document.getElementById('eventID').value,
            startKM: document.getElementById('startKM').value,
            endKm: document.getElementById('endKM').value,
        };

        $scope.car = {
            sumKM: document.getElementById('endKM').value,
        };

        factory.update('clock', $scope.lession.ID, $scope.lession).then(function (res) {
            factoryTools.alert('Óra adatainak mentése!', 'success', 'bx-check-circle');
        });

        factory.select('teacher', 'email', angular.fromJson(sessionStorage.getItem('email'))).then(function (res) {
            factory.select('car', 'teacherID', res[0].ID).then(function (res) {
                factory.update('car', res[0].ID, $scope.car).then(function (res) {
                    location.reload();
                });
            });
        });
    };
});
