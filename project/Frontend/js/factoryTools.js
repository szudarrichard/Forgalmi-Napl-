app.factory('factoryTools', function () {
    //ALERT WINDOW
    return {
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

        //DATE FORMAT
        format: function (amount, decimalCount = 0, decimal = ',', thousands = '.') {
            var re = '\\d(?=(\\d{' + 3 + '})+' + (decimalCount > 0 ? '\\,' : '$') + ')';
            return amount.toFixed(Math.max(0, ~~decimalCount)).replace(new RegExp(re, 'g'), '$&.');
        },
    };
});
