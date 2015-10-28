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
            Materialize.toast('Change the price of this product', 2000)
        }, // Callback for Modal open
        complete: function () {
                alert('Closed');
            } // Callback for Modal close
    });


    //This function will be used to send an Ajax call to a database
   var sendData = function(d){
       alert(d);
   }



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
                            $("#resultInfo").text("We got a barcode\n");
                        }, // Callback for Modal open
                        complete: function () {
                                sendData(result);
                            } // Callback for Modal close
                    });



                },
                function (error) {
                    $(".scan-complete-trigger p").val("Scanning failed: " + error);
                }
            );
        });

    }

    barcode();

});
