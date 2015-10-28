function onLoad() {
    // A simple check for phones tto make sure device is ready to with all plugins
    document.addEventListener("deviceready", deviceReady, false);
}

var deviceReady = $(function () {
    // causes a sidebar to pop-up on click of menu button
    $(".button-collapse").sideNav();

    // this function triggers the modal at the bottom of the screen
    $('.bottom-modal-trigger').leanModal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 200, // Transition out duration
        ready: function () {
            Materialize.toast('Change the price of this product', 4000)
        }, // Callback for Modal open
        complete: function () {
                alert('Closed');
            } // Callback for Modal close
    });






    var barcode = function () {
        $("#scan-btn").click(function () {
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    
                    // this function triggers the completed form modal
                    $('.scan-complete-trigger').leanModal({
                        dismissible: true, // Modal can be dismissed by clicking outside of the modal
                        opacity: .5, // Opacity of modal background
                        in_duration: 300, // Transition in duration
                        out_duration: 200, // Transition out duration
                        ready: function () {
                            Materialize.toast(result.cancelled, 4000)
                        }, // Callback for Modal open
                        complete: function () {
                                alert('Closed');
                            } // Callback for Modal close
                    });
                    
                    $(".scan-complete-trigger p").text("We got a barcode\n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n");


                },
                function (error) {
                    $(".scan-complete-trigger p").val("Scanning failed: " + error);
                }
            );
        });

    }

    barcode();

});