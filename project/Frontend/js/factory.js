app.factory('factory', function($http, $q) {
    return {
        logincheck: function(tablename, user, pass) {
            let deferred = $q.defer();
            let data = {
                table: tablename,
                email: user,
                passwrd: pass
            }
            $http.post(url + '/login', data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        // SELECT ALL
        selectAll: function(tablename) {
            let deferred = $q.defer();

            $http.get(url + '/' + tablename).then(
                function(res) {
                    deferred.resolve(res.data);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        // SELECT ONE RECORD
        select: function(tablename, field, id) {
            let deferred = $q.defer();

            $http.get(url + '/' + tablename + '/' + field + '/' + id).then(
                function(res) {
                    deferred.resolve(res.data);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        // INSERT ONE RECORD
        insert: function(tablename, values) {
            let deferred = $q.defer();

            $http.post(url + '/' + tablename, values).then(
                function(res) {
                    deferred.resolve(res.data);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        // UPDATE ONE RECORDS
        update: function(tablename, id, values) {
            let deferred = $q.defer();

            $http.patch(url + '/' + tablename + '/' + id, values).then(
                function(res) {
                    deferred.resolve(res.data);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        // DELETE ONE RECORDS
        delete: function(tablename, id) {
            let deferred = $q.defer();

            $http.delete(url + '/' + tablename + '/' + id).then(
                function(res) {
                    deferred.resolve(res.data);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        // DELETE ALL RECORDS
        deleteAll: function(tablename) {
            let deferred = $q.defer();
            $http.delete(url + '/' + tablename).then(
                function(res) {
                    deferred.resolve(res.data);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        toChart: function(title, type, div, datapoints, theme, anim,
            exp) {
            var chart = new CanvasJS.Chart(div, {
                animationEnabled: anim,
                exportEnabled: exp,
                theme: theme, // "light1", "light2", "dark1", "dark2"
                title: {
                    text: title
                },
                axisY: {
                    includeZero: true
                },
                data: [{
                    // "bar", "column", "pie", "doughnut", "line", "spline", "splineArea", "area"
                    type: type,
                    dataPoints: datapoints
                }]
            });
            chart.render();
        },

        toCalendar: function(events, div, view, edit) {

            var calendarEl = document.getElementById(div);
            var today = new Date();
            var calendar = new FullCalendar.Calendar(calendarEl, {
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
                },
                initialDate: today,
                initialView: view, // dayGridMonth,timeGridWeek,timeGridDay,listMonth
                locale: 'hu',
                buttonIcons: false, // show the prev/next text
                weekNumbers: true,
                navLinks: true, // can click day/week names to navigate views
                editable: edit,
                dayMaxEvents: true, // allow \"more\" link when too many events
                events: events

            });

            calendar.render();

        },

        format: function(amount, decimalCount = 0, decimal = ",", thousands = ".") {
            var re = '\\d(?=(\\d{' + (3) + '})+' + (decimalCount > 0 ? '\\,' : '$') + ')';
            return amount.toFixed(Math.max(0, ~~decimalCount)).replace(new RegExp(re, 'g'), '$&.');
        }
    }
});