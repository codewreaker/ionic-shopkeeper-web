function onLoad() {
    // A simple check for phones tto make sure device is ready to with all plugins
    document.addEventListener("deviceready", deviceReady, false);
}

var deviceReady = $(function () {
    // causes a sidebar to pop-up on click of menu button
    $(".button-collapse").sideNav();



    //This function will be used to send an Ajax call to a database
    function sendRequest(dataString) {
        var obj = $.ajax({
            type: "POST",
            //url: "src/php/shop.php",
            url: "http://cs.ashesi.edu.gh/~csashesi/class2016/prophet-agyeman-prempeh/mobile_web_server/shop.php", //for web
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
            var d = $("#product_barcode").val();
            var str = 'opt=1&product_name=' + a + '&product_price=' + b + '&product_quant=' + c + '&product_barcode=' + d;
            $obj = sendRequest(str);
            var $toastContent = $obj.message;
            Materialize.toast($toastContent, 3000);
        });
    }

    //An ajax call to delete a product from the database
    var deleteProduct = function () {
        $("ul").on('click', 'li .delete-product', function () {
            var id = $(this).prop("id");
            var str = 'opt=3&product_id=' + id;
            $obj = sendRequest(str);
            var $toastContent = $obj.message;
            Materialize.toast($toastContent, 3000);
            fetchProduct();
        });

    }

    //An ajax call to edit a product in the database
    var editModal = function () {
        var id;
        // This part populates the form
        $("ul").on('click', 'li .edit-product', function () {
            id = $(this).prop("id");
            var str = 'opt=4&product_id=' + id;
            $obj = sendRequest(str);
            var $toastContent = $obj.message;
            Materialize.toast($toastContent, 3000);
            $("#product_name_1").val($obj.data[0].product_name);
            $("#product_price_1").val($obj.data[0].product_price);
            $("#product_quant_1").val($obj.data[0].product_quantity);
            $("#product_barcode_1").val($obj.data[0].product_barcode);
        });

        // This part executes the edit function
        $("#edit-product").click(function () {
            var a = $("#product_name_1").val();
            var b = $("#product_price_1").val();
            var c = $("#product_quant_1").val();
            var d = $("#product_barcode_1").val();
            var str = 'opt=5&product_id=' + id + '&product_name=' + a + '&product_price=' + b + '&product_quantity=' + c + '&product_barcode=' + d;
            $obj = sendRequest(str);
            var $toastContent = $obj.message;
            Materialize.toast($toastContent, 3000);

        });

    }


    //An Ajax call to fetch data from server
    var fetchProduct = function () {

        $obj = sendRequest("opt=2");
        var $toastContent = $obj.message;
        Materialize.toast($toastContent, 3000);


        var data = $obj.data;
        var top = '<li class="collection-header"><h4>Products</h4></li>';
        var mid = "";
        for (var i = 0; i < data.length; i++) {
            mid = mid+'<li class="collection-item avatar"><img src="src/img/logo-1.png" alt="" class="circle"><span class="title">' + data[i].product_name + '</span><p>&cent;' + data[i].product_price + '&nbsp|&nbsp' + data[i].product_quantity + ' left</p><span class="controls secondary-content"><a class="btn-floating teal lighten-2 edit-product" href="#modal-edit" id="' + data[i].product_id + '"><i class="fa fa-edit"></i></a><a class="btn-floating teal lighten-2 delete-product" id="' + data[i].product_id + '"><i class="fa fa-2x fa-trash"></i></a></span></li>';
        }

        $("#listSection").html(top+mid);
        list_control();
    }


    // The barcode of the product is scanned and form is filled
    var makePurchase = function () {
        var id;
        var currentQuantity;
        var barcode_id;
        $("#scan-btn-2").click(function () {
//            barcode_id = "000003";
//            $obj = sendRequest('opt=6&product_barcode=' + barcode_id);
//            if ($obj.result == 0) {
//                alert("No Such Product");
//            } else {
//                id = $obj.data[0].product_id;
//                currentQuantity = $obj.data[0].product_quantity;
//                $("#product_name_2").val($obj.data[0].product_name);
//                $("#product_price_2").val($obj.data[0].product_price);
//
//                $("#product_barcode_2").val($obj.data[0].product_barcode);
//            }
cordova.plugins.barcodeScanner.scan(
                function (result) {
                     barcode_id = result.text;
            $obj = sendRequest('opt=6&product_barcode=' + barcode_id);
            if ($obj.result == 0) {
                alert("No Such Product");
            } else {
                id = $obj.data[0].product_id;
                currentQuantity = $obj.data[0].product_quantity;
                $("#product_name_2").val($obj.data[0].product_name);
                $("#product_price_2").val($obj.data[0].product_price);
                $("#product_barcode_2").val($obj.data[0].product_barcode);
            }


                },
                function (error) {

                }
            );
        });

        // a function to save the transaction
        // This part executes the edit function
        $("#purchase-product").click(function () {
            var a = $("#product_name_2").val();
            var b = $("#product_price_2").val();
            var c = $("#product_quant_2").val();
            var d = $("#product_barcode_2").val();

            // checking if the transaction can be made
            if ((currentQuantity - c) < 0) {
                alert("Cannot buy that many");
            } else {
                var str = 'opt=5&product_id=' + id + '&product_name=' + a + '&product_price=' + b + '&product_quantity=' + (currentQuantity - c) + '&product_barcode=' + d;
                $obj = sendRequest(str);
                var $toastContent = $obj.message;
                Materialize.toast($toastContent, 3000);
            }

        });
    }

    

    //A function that triggers the barcode scanner to append to the edit form
    var barcode = function () {
        $("#scan-btn, #scan-btn-1").click(function () {
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    $("#product_barcode_1").val(result.text);
                    $("#product_barcode").val(result.text);
                },
                function (error) {

                }
            );
        });
    }


    // this function triggers the modal at the bottom of the screen to add data
    $('.add-product-trigger').leanModal({
        ready: function () {
            Materialize.toast('Add a product here', 2000);
        }, // Callback for Modal open
        complete: function () {
                fetchProduct();
            } // Callback for Modal close
    });


    $("#purchase").leanModal({
        ready: function () {
            Materialize.toast('Save a purchase', 2000);
        }, // Callback for Modal open
        complete: function () {
                fetchProduct();
            } // Callback for Modal close
    });



    // A series of functions that are bound to each list, an alternative for method delegation
    var list_control = function () {
        $('.collapsible').collapsible({
            accordion: false // setting true changes to collapsible
        });
        // this function triggers the modal at the bottom of the screen to add data
        $('.edit-product').leanModal({
            ready: function () {
                Materialize.toast('Edit a product here', 2000);
            }, // Callback for Modal open
            complete: function () {
                    fetchProduct();
                } // Callback for Modal close
        });
    }





    makePurchase();
    //A function that populates the table
    fetchProduct();
    //executes a barcode reader on phones
    barcode();
    //executes a save product function
    saveProduct();
    //deletes a product based on the id
    deleteProduct();
    editModal();




});