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

        //KM MODAL
        modal: function (res) {
            alert('óra ' + res);
            /*
            <div class="modal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Modal body text goes here.</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button type="button" class="btn btn-primary">
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            */
        },

        //DATE FORMAT
        format: function (amount, decimalCount = 0, decimal = ',', thousands = '.') {
            var re = '\\d(?=(\\d{' + 3 + '})+' + (decimalCount > 0 ? '\\,' : '$') + ')';
            return amount.toFixed(Math.max(0, ~~decimalCount)).replace(new RegExp(re, 'g'), '$&.');
        },
    };
});
