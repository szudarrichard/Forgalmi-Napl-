app.controller('calendarCtrl', function ($scope, $rootScope, factory) {
    //TODO: Naptár
    $scope.reservations = [];

    factory.selectAll('clock').then(function (res) {
        $scope.reservations = res;
        //$scope.reservationName = //TODO: foglaló diákok neve

        let events = [];

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
});
