app.controller('calendarCtrl', function ($scope, $rootScope, factory) {
    $scope.reservations = [];
    $scope.students = [];

    if (angular.fromJson(sessionStorage.getItem('permission')) == 2) {
        factory.select('teacher', 'email', angular.fromJson(sessionStorage.getItem('email'))).then(function (res) {
            factory.select('student', 'teacherID', res[0].ID).then(function (res) {
                let events = [];
                $scope.students = res;
                for (let i = 0; i < res.length; i++) {
                    factory.select('clock', 'studentID', res[i].ID).then(function (res) {
                        $scope.reservations = res;
                        console.log($scope.reservations);
                        $scope.reservations.forEach((reservation) => {
                            events.push({
                                title: reservation.studentID,
                                start: reservation.start,
                                end: reservation.end,
                                id: reservation.ID,
                            });
                        });
                        factory.toCalendar(events, 'calendar', 'timeGridWeek', true, true, 'clock');
                    });
                }
            });
        });
    } else {
        factory.select('teacher', 'ID', angular.fromJson(sessionStorage.getItem('teacherID'))).then(function (res) {
            factory.select('student', 'teacherID', res[0].ID).then(function (res) {
                let events = [];
                $scope.students = res;
                for (let i = 0; i < res.length; i++) {
                    factory.select('clock', 'studentID', res[i].ID).then(function (res) {
                        $scope.reservations = res;
                        console.log($scope.reservations);
                        $scope.reservations.forEach((reservation) => {
                            events.push({
                                title: reservation.studentID,
                                start: reservation.start,
                                end: reservation.end,
                                id: reservation.ID,
                            });
                        });
                        factory.toCalendar(events, 'calendar', 'timeGridWeek', true, true, 'clock');
                    });
                }
            });
        });
    }
});
