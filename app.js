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
            var str = 'opt=1&product_name=' + a + '&product_price=' + b + '&product_quant=' +c+'&product_barcode='+d;
           alert("Hello");
            $obj = sendRequest(str);
            var $toastContent = $obj.message;
            Materialize.toast($toastContent, 3000);
        });    
    }
    
    //An ajax call to delete a product from the database
     var deleteProduct = function () {
            $("ul").on('click','li .delete-product', function () {
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
            $("ul").on('click','li .edit-product', function () {
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
            var str = 'opt=5&product_id='+id+'&product_name='+a+'&product_price='+b+'&product_quantity='+c+'&product_barcode='+d;
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
                mid = mid + '<li><div class="collapsible-header"><i class="fa fa-dot-circle-o"></i>'  +data[i].product_name + '<span class="price">&cent;' + data[i].product_price + '</span></div><div class="collapsible-body"><p>'+data[i].product_quantity+' are in stock</p><div class="control"><a class="btn-floating red delete-product" id="'+data[i].product_id+'"><i class="fa fa-trash"></i></a><a class="btn-floating yellow edit-product" href="#modal-edit" id="'+data[i].product_id+'"><i class="fa fa-edit"></i></a></div></div></li>';
            }
          
            $("#listSection").html(mid);
            list_control();
        
       
        
    }

                    

    var barcode = function () {
        $("#scan-btn").click(function () {
            alert("hi");
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    $("#product_barcode_1").val(result.text);
                    $("#product_barcode_1").val(result.text);
                },
                function (error) {
                    $("#resultInfo").val("Scanning failed: " + error);
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
    
    // A series of functions that are bound to each list, an alternative for method delegation
    var list_control = function(){
        $('.collapsible').collapsible({
            accordion : false // setting true changes to collapsible
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