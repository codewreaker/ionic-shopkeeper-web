<?php
header("Access-Control-Allow-Origin:*");
include_once("adb.php");

class shop extends adb{
    // A function to add products to the db
    function add_product($product_name, $product_price,$product_quant,$product_barcode){
        $str_query="insert into mw_product set product_name='$product_name',
        product_price='$product_price',product_quantity='$product_quant',product_barcode='$product_barcode'";
        return $this->query($str_query);
    }
    
    // A fcuntion to fetch all products from the db
    function fetch_products(){
        $str_query="select * FROM mw_product";
        return $this->query($str_query);
    }
    
    // A fcuntion to fetch all products from the db
    function fetch_product($id){
        $str_query="select * FROM mw_product WHERE product_id='$id'";
        return $this->query($str_query);
    }
    
    // A fcuntion to fetch a products based on it's barcode
    function fetch_product_via_barcode($barcode){
        $str_query="select * FROM mw_product WHERE product_barcode='$barcode'";
        return $this->query($str_query);
    }
    
    //A function to edit a product
    function edit_product($product_id,$product_name, $product_price,$product_quant,$product_barcode){
        $str_query="UPDATE mw_product SET product_name='$product_name',
        product_price='$product_price',product_quantity='$product_quant',product_barcode='$product_barcode' WHERE product_id='$product_id'";
        return $this->query($str_query);
    }

    // A function to delete a product
    function delete_product($product_id){
        $str_query="DELETE FROM mw_product WHERE product_id =$product_id";
        return $this->query($str_query);
    }
    

    // A function to add a transaction 
    function add_transaction($id,$a,$b){
        $str_query="insert into mw_transaction set product_id='$id',product_quantity='$a',customer_number='$b',transaction_date=CURTIME()";
        return $this->query($str_query);
    }
    
    function remove_transaction($transaction_id){
    }
    
    function fetch_transactions(){
        $str_query="SELECT t.transaction_id,p.product_name, p.product_barcode, t.product_quantity,t.customer_number,t.transaction_date FROM mw_transaction t INNER JOIN mw_product p ON p.product_id=t.product_id ORDER BY t.transaction_date DESC";
        return $this->query($str_query);
    }
}

$obj = new shop();
$opt = $_REQUEST['opt'];
//opt 1 adds a product
//opt 2 fetches all products from the database
//opt 3 deletes from the database
//opt 4 selects a single record
//opt 5 edits an item
//opt 6 fetches an item based on product code

if($opt==1){
    // adding a product
    $a = $_REQUEST['product_name'];
    $b = $_REQUEST['product_price'];
    $c = $_REQUEST['product_quant'];
    $d = $_REQUEST['product_barcode'];

    if(!$obj->add_product($a,$b,$c,$d)){
        echo '{"result":0,"message":"Failed"}';
        //echo mysql_error();
    }else{
        echo '{"result":1,"message":"Successfully Added Product"}';
    }
}else if($opt==2){
    // fetching products from product table
    $obj->fetch_products();
    $row=$obj->fetch();
    echo '{"result":1,"data":[';	/*start of json object*/
    while($row){
    echo json_encode($row);/*convert the result array to json object*/
    $row=$obj->fetch();
    if($row){ echo ",";	/*if there are more rows, add comma*/
            }
	   }
    echo "]}";
}else if($opt==3){
    // deleting product from database
    $id = $_REQUEST['product_id'];
    
    if(!$obj->delete_product($id)){
        echo '{"result":0,"message":"Unfortunately Could Not Delete Item"}';
    }else{
        echo '{"result":1,"message":"Successfully Deleted Item"}';
    }
    
}else if($opt==4){
    //selecting a single record
    $id = $_REQUEST['product_id'];
    
    if(!$obj->fetch_product($id)){
        echo '{"result":0,"message":"No such product"}';
    }else{
        $row=$obj->fetch();
        echo '{"result":1,"data":[';
        echo json_encode($row);
        echo ']}';
    }
    
}else if($opt==5){
    // editing an item in the products table
    $id = $_REQUEST['product_id'];
    $a = $_REQUEST['product_name'];
    $b = $_REQUEST['product_price'];
    $c = $_REQUEST['product_quantity'];
    $d = $_REQUEST['product_barcode'];
    
    if(!$obj->edit_product($id,$a,$b,$c,$d)){
        echo '{"result":0,"message":"Could not Edit Product"}';
    }else{
        echo '{"result":1,"message":"Record Edited"}';
    }  
}else if($opt==6){
    // fetching an item based on the product code
    $barcode = $_REQUEST['product_barcode'];
    $obj->fetch_product_via_barcode($barcode);
    $row=$obj->fetch();
    if($row){
        echo '{"result":1,"data":[';
        echo json_encode($row);
        echo ']}';
    }else{
        echo '{"result":0,"message":"No such product"}';
    }
    
}else if($opt==7){
    //saving a transaction
    $id = $_REQUEST['product_id'];
    $a = $_REQUEST['product_quantity'];
    $b = $_REQUEST['customer_number'];
    
    if(!$obj->add_transaction($id,$a,$b)){
        echo '{"result":0,"message":"Failed to save transaction"}';
    }else{
        echo '{"result":1,"message":"transaction recorded"}';
    }
    
}else if($opt==8){
    // fetching adata from the transaction table
    $obj->fetch_transactions();
    $row=$obj->fetch();
    echo '{"result":1,"data":[';	/*start of json object*/
    while($row){
    echo json_encode($row);/*convert the result array to json object*/
    $row=$obj->fetch();
    if($row){ echo ",";	/*if there are more rows, add comma*/
            }
	   }
    echo "]}";
    
}

?>