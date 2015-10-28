<?php

include_once("adb.php");

class shop extends adb{
    // A function to add products to the db
    function add_product($product_name, $product_price,$product_quant){
        $str_query="insert into mw_product set product_name='$product_name',
        product_price='$product_price',product_quantity='$product_quant'";
        return $this->query($str_query);
    }
    
    // A fcuntion to fetch all products from the db
    function fetch_products(){
        $str_query="select * FROM mw_product";
        return $this->query($str_query);
    }
    
    
    //A function to edit a product
    function edit_products($product_id){
    }
    
    // A function to delete a product
    function delete_product($product_id){
    }
    
    // A function to add a transaction 
    function add_transaction($product_id){
    }
    
    function remove_transaction($transaction_id){
    }
}

$obj = new shop();
$opt = $_REQUEST['opt'];

if($opt==1){
    $a = $_REQUEST['product_name'];
    $b = $_REQUEST['product_price'];
    $c = $_REQUEST['product_quant'];

    if(!$obj->add_product($a,$b,$c)){
        echo '{"result":0,"message":"Failed"}';
        //echo mysql_error();
    }else{
        echo '{"result":1,"message":"Successfully Added Product"}';
    }
}else if($opt==2){
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
}

?>
