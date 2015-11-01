function onLoad() {
    // A simple check for phones tto make sure device is ready to with all plugins
    document.addEventListener("deviceready", deviceReady, false);
}

var deviceReady = $(function () {
    // causes a sidebar to pop-up on click of menu button
    $(".button-collapse").sideNav();


    $('.collapsible').collapsible({
      accordion : true; // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

    //This function will be used to send an Ajax call to a database
    function sendRequest(dataString) {
        var obj = $.ajax({
            type: "POST",
            url: "src/php/shop.php",
            data: dataString,
            async: false,
            cache: false
        });
        var result = $.parseJSON(obj.responseText);
        return result;
    }

    // An ajax call to save product
    var saveProduct = function () {
        $("#save-product").on('click', function () {
            var a = $("#product_name").val();
            var b = $("#product_price").val();
            var c = $("#product_quant").val();
            var str = 'opt=1&product_name=' + a + '&product_price=' + b + '&product_quant=' + c;
            $obj = sendRequest(str);
            var $toastContent = $obj.message;
            Materialize.toast($toastContent, 3000);
        });
    }
    
    
    //An Ajax call to fetch data from server
    var fetchProduct = function() {
        
        $obj = sendRequest("opt=2");
        var $toastContent = $obj.message;
        Materialize.toast($toastContent, 3000);
        
        
            var data = $obj.data;
           
            var mid = "";
            for (var i = 0; i < data.length; i++) {
                mid = mid + '<li><div class="collapsible-header"><i class="fa fa-dot-circle-o"></i>'  +data[i].product_name + '<span class="price">&cent;' + data[i].product_price + '</span></div><div class="collapsible-body"><p> are in stock</p><div class="control"><a class="btn-floating red bottom-modal-trigger" href="#modal1" id="'+data[i].product_id+'"><i class="fa fa-trash"></i></a><a class="btn-floating yellow bottom-modal-trigger" href="#modal1" id="'+data[i].product_id+'"><i class="fa fa-edit"></i></a></div></div></li>';
            }
          
            $("#listSection").append(mid);
        
       
        
    }
    
    // this function triggers the completed form modal
    var saveBarcodeData = function(){
        var result = "product:Don Simon,price:23,quanitity:3";
        $('.scan-complete-trigger').leanModal({
                        ready: function () {
                            $("#resultInfo").text(result.text);
                        }, // Callback for Modal open
                        complete: function () {

                            } // Callback for Modal close
                    });
    }
                    
    

    var barcode = function () {
        $("#scan-btn").click(function () {
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                },
                function (error) {
                    $("#resultInfo").val("Scanning failed: " + error);
                }
            );
        });
    }







    // this function triggers the modal at the bottom of the screen
    $('.bottom-modal-trigger').leanModal({
        ready: function () {
            Materialize.toast('Change the price of this product', 2000)
        }, // Callback for Modal open
        complete: function () {
                alert('Closed');
            } // Callback for Modal close
    });

    // this function triggers the modal at the bottom of the screen to add data
    $('.add-product-trigger').leanModal({
        ready: function () {
            Materialize.toast('Add a product here', 2000);
        }, // Callback for Modal open
        complete: function () {

            } // Callback for Modal close
    });
    
      // this function triggers the modal at the bottom of the screen
    $('.bottom-modal-trigger').leanModal({
        ready: function () {
            Materialize.toast('Change the price of this product', 2000)
        }, // Callback for Modal open
        complete: function () {
                alert('Closed');
            } // Callback for Modal close
    });
    
    
   


    //A function that populates the table
    fetchProduct();
    //executes a barcode reader on phones
    barcode();
    //executes a save product function
    saveProduct();
    //a test function
    saveBarcodeData();



});