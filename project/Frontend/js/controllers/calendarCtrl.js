app.controller('calendarCtrl', function ($scope, $rootScope, factory) {
    $scope.reservations = [];
    $scope.students = [];

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
                            factory.select('student', 'ID', reservation.studentID).then(function (res) {
                                console.log(res);
                                events.push({
                                    title: res[0].userName,
                                    start: reservation.start,
                                    end: reservation.end,
                                    id: reservation.ID,
                                    color: '#0A5355', // TODO tanaár szín - kell egy átláthatóbb szín
                                });
                                factory.toCalendar(events, 'calendar', 'timeGridWeek', true, true, 'clock');
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
                                factory.toCalendar(events, 'calendar', 'timeGridWeek', true, true, 'clock');
                            });
                        });
                    });
                }
            });
        });
    }
});
