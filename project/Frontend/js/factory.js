app.factory('factory', function ($http, $q) {
    let url = 'http://localhost:3000';
    return {
        //LOGIN
        logincheck: function (tablename, user, pass) {
            let deferred = $q.defer();
            let data = {
                table: tablename,
                email: user,
                passwrd: pass,
            };
            $http.post(url + '/login', data).then(
                function (res) {
                    deferred.resolve(res);
                },
                function (err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        // SELECT ALL
        selectAll: function (tablename) {
            let deferred = $q.defer();

            $http.get(url + '/' + tablename).then(
                function (res) {
                    deferred.resolve(res.data);
                },
                function (err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        // SELECT ONE RECORD
        select: function (tablename, field, id) {
            let deferred = $q.defer();

            $http.get(url + '/' + tablename + '/' + field + '/' + id).then(
                function (res) {
                    deferred.resolve(res.data);
                },
                function (err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        // INSERT ONE RECORD
        insert: function (tablename, values) {
            let deferred = $q.defer();

            $http.post(url + '/' + tablename, values).then(
                function (res) {
                    deferred.resolve(res.data);
                },
                function (err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        // UPDATE ONE RECORDS
        update: function (tablename, id, values) {
            let deferred = $q.defer();

            $http.patch(url + '/' + tablename + '/' + id, values).then(
                function (res) {
                    deferred.resolve(res.data);
                },
                function (err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        // DELETE ONE RECORDS
        delete: function (tablename, id) {
            let deferred = $q.defer();

            $http.delete(url + '/' + tablename + '/' + id).then(
                function (res) {
                    deferred.resolve(res.data);
                },
                function (err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        // DELETE ALL RECORDS
        deleteAll: function (tablename) {
            let deferred = $q.defer();
            $http.delete(url + '/' + tablename).then(
                function (res) {
                    deferred.resolve(res.data);
                },
                function (err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

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
                    //TODO console-log helyére be kell húzni a factory alert function-t
                    $http.get(url + '/' + 'student' + '/' + 'email' + '/' + angular.fromJson(sessionStorage.getItem('email'))).then(function (res) {
                        let data = {
                            start: moment(arg.start).locale('hu').format('YYYY-MM-DD HH:mm'),
                            end: moment(arg.start).add(1, 'hours').locale('hu').format('YYYY-MM-DD HH:mm'), //TODO azonnal frissíteni kell az oldalt!!! VAGY keresni full calendar hove eseményt
                            studentID: res.data[0].ID,
                        };

                        $http.get(url + '/' + tablename).then(function (res) {
                            for (let i = 0; i < res.data.length; i++) {
                                if (data.studentID != res.data[i].studentID) {
                                } else {
                                    if (data.start.substring(0, 10) != res.data[i].start.substring(0, 10)) {
                                    } else {
                                        data.start = '';
                                        console.log('Már van foglat órád ezen a napon');
                                    }
                                }
                            }

                            if (data.start.length != 0) {
                                console.log('Óra sikeresen rögzítve!');
                                $http.post(url + '/' + tablename, data).then(function (res) {
                                    calendar.addEvent({
                                        start: arg.start,
                                        end: arg.end,
                                        id: res.data.insertId,
                                        allDay: arg.allDay,
                                    });
                                });
                            }
                        });

                        calendar.unselect();
                    });
                },

                eventClick: function (arg) {
                    $http.get(url + '/' + tablename + '/' + 'ID' + '/' + arg.event.id).then(function (res) {
                        $http.get(url + '/' + 'student' + '/' + 'ID' + '/' + res.data[0].studentID).then(function (res) {
                            if (res.data[0].email != angular.fromJson(sessionStorage.getItem('email'))) {
                                console.log('Ez az óra már foglalt!');
                            } else {
                                $http.delete(url + '/' + tablename + '/' + arg.event.id).then(function (res) {
                                    console.log('Óra eltávolítva!');
                                    arg.event.remove();
                                });
                            }
                        });
                    });
                },
                events: events,
            });

            calendar.render();
        },

        //DATE FORMAT
        format: function (amount, decimalCount = 0, decimal = ',', thousands = '.') {
            var re = '\\d(?=(\\d{' + 3 + '})+' + (decimalCount > 0 ? '\\,' : '$') + ')';
            return amount.toFixed(Math.max(0, ~~decimalCount)).replace(new RegExp(re, 'g'), '$&.');
        },

        //ALERT WINDOW
        alert: function (message, type, icon) {
            var alertplaceholder = document.getElementById('alertplaceholder');
            var wrapper = document.createElement('div');
            wrapper.innerHTML =
                '<div class="animate__animated animate__slideInRight animate__delay-0s animate__faster alert alert-' +
                type +
                '" role="alert"><i class="alert-icon bx ' +
                icon +
                '"></i>' +
                message +
                '<button type="button" class="btn-close ms-2" data-bs-dismiss="alert" aria-label="Close"></div>';

            alertplaceholder.append(wrapper);
            setTimeout(function () {
                wrapper.remove();
            }, 5000);
        },
    };
});
