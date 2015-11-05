<?php
require_once 'auth.php';

session_start();

$auth = new Auth();
echo $_SESSION['user_id'];
if (!isset($_SESSION['user_id'])) {
	//Not logged in, send to login page.
	if($auth->login($_REQUEST['login_email'],$_REQUEST['login_pword']) == 4){
        echo '{"result":0,"message":"error code 4"}';
        header( 'Location: ../../login.php' );
    }else{
        echo '{"result":1,"message":"Succesfully Logged In"}';
    }
} else {
    echo "Here Now";
	//Check we have the right user
	$logged_in = $auth->checkSession();
	
	if(empty($logged_in)){
		//Bad session, ask to login
		$auth->logout();
		header( 'Location: login.html' );
		
	} else {
		//User is logged in, show the page
        header( 'Location: index.html' );
	}
}
//$auth = new Auth();
//
//if($_REQUEST['opt']==1){
//    if(!$auth->createUser($_REQUEST['signup_email'],$_REQUEST['signup_pword'],$_REQUEST['is_admin'])){
//        echo '{"result":0,"message":"Failed to Create A User"}';
//    }else{
//        echo '{"result":1,"message":"You Have Succesfully Created An Account"}';
//    }
//}else if($_REQUEST['opt']==2){
//    if($auth->login($_REQUEST['login_email'],$_REQUEST['login_pword']) == 4){
//        echo '{"result":0,"message":"error code 4"}';
//    }else{
//        echo '{"result":1,"message":"Succesfully Logged In"}';
//    }
//     
//}