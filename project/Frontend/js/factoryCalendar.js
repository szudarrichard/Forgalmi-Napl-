app.factory('factoryCalendar', function (factory, factoryTools) {
    return {
        //CALENDAR
        toCalendar: function (events, div, view, edit, selectable, tablename) {
            var calendarEl = document.getElementById(div);
            var today = new Date();
            var calendar = new FullCalendar.Calendar(calendarEl, {
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
                },
                businessHours: {
                    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
                    startTime: '06:00', // a start time (6am in this example)
                    endTime: '20:00', // an end time (8pm in this example)
                },
                timeZone: 'Europe/Budapest',
                slotDuration: '01:00',
                selectable: selectable,
                initialDate: today,
                initialView: view, // dayGridMonth,timeGridWeek,timeGridDay,listMonth
                locale: 'hu',
                buttonIcons: false, // show the prev/next text
                weekNumbers: true,
                navLinks: true, // can click day/week names to navigate views
                dayMaxEvents: true, // allow \"more\" link when too many events
                eventColor: events.color,
                eventResizableFromStart: false,
                height: 750,
                select: function (arg) {
                    if (moment(arg.start).locale('hu').format('H') - 2 < 6 || moment(arg.start).locale('hu').format('HH') - 2 >= 20) {
                        factoryTools.alert('06:00 és 20:00 között lehetséges az időpontok foglalása!', 'danger', 'bxs-error');
                    } else {
                        factory.select('student', 'email', angular.fromJson(sessionStorage.getItem('email'))).then(function (res) {
                            let data = {
                                start: moment(arg.start).locale('hu').format('YYYY-MM-DD HH:mm'),
                                end: moment(arg.start).add(1, 'hours').locale('hu').format('YYYY-MM-DD HH:mm'),
                                studentID: res[0].ID,
                            };

                            factory.selectAll(tablename).then(function (res) {
                                for (let i = 0; i < res.length; i++) {
                                    if (data.studentID != res[i].studentID) {
                                    } else {
                                        if (data.start.substring(0, 10) != res[i].start.substring(0, 10)) {
                                        } else {
                                            console.log(data.start.length);
                                            data.start = '';
                                            factoryTools.alert('Már van foglat órád ezen a napon', 'danger', 'bxs-error');
                                        }
                                    }
                                }

                                if (data.start.length != 0) {
                                    factoryTools.alert('Óra sikeresen rögzítve!', 'success', 'bx-check-circle');
                                    factory.insert(tablename, data).then(function (res) {
                                        calendar.addEvent({
                                            start: arg.start,
                                            end: arg.end,
                                            id: res.insertId,
                                            allDay: arg.allDay,
                                        });
                                    });
                                }
                            });

                            calendar.unselect();
                        });
                    }
                },

                eventClick: function (arg) {
                    //diak
                    if (angular.fromJson(sessionStorage.getItem('permission')) == 1) {
                        factory.select(tablename, 'ID', arg.event.id).then(function (res) {
                            factory.select('student', 'ID', res[0].studentID).then(function (res) {
                                if (res[0].email != angular.fromJson(sessionStorage.getItem('email'))) {
                                    factoryTools.alert('Ez az óra már foglalt!', 'danger', 'bxs-error');
                                } else {
                                    factory.delete(tablename, arg.event.id).then(function (res) {
                                        factoryTools.alert('Óra eltávolítva!', 'danger', 'bxs-error');
                                        arg.event.remove();
                                    });
                                }
                            });
                        });
                    } else {
                        //tanar
                        factoryTools.modal(arg.event.id);
                    }
                },
                events: events,
            });

            calendar.render();
        },
    };
});
