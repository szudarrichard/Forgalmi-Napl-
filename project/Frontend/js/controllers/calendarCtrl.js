app.controller('calendarCtrl', function ($scope, $rootScope, factory) {
    //TODO: Naptár
    $scope.lessions = [];
    factory.selectAll('clock').then(function (res) {
        $scope.lessions = res;
    });

    factory.selectAll('clock').then(function (res) {
        $scope.lessions = res;
        let events = [];

        $scope.lessions.forEach((lession) => {
            lession.date = lession.date.substring(0, 10);
            events.push({
                title: '',
                start: lessions.date,
                end: lessions.date + 1,
            });
        });
        factory.toCalendar(events, 'calendar', 'dayGridMonth', false);
    });
});
