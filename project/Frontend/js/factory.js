app.factory('factory', function ($http, $q, factoryTools) {
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
    };
});
