<?php
include_once("adb.php");

class Auth extends adb{
    
	private $_siteKey;
    /**
    * This function is thedefault constructor
    */
	public function __construct()
  	{
		$this->siteKey = 'my site key will go here';
	}
    
    /** 
    * This function creates a user with the security features implemented
    **/
    public function createUser($email, $password, $is_admin = 0)
    {			
	//Generate users salt
	$user_salt = $this->randomString();
			
	//Salt and Hash the password
	$password = $user_salt . $password;
	$password = $this->hashData($password);
			
	//Create verification code
	$code = $this->randomString();
    
        
	//Commit values to database here.
	$str= "INSERT into mw_users set email='$email',password='$password',user_salt='$user_salt',is_verified=1,is_active=1,is_admin='$is_admin',verification_code='$code'";
        
    $created = $this->query($str);
	if($created != false){
		return true;
	}
			
	return false;
    }
    

    
    
    /**
    * This function is used to log a user in
    **/
    public function login($email, $password)
{
    $str = "SELECT * FROM mw_users WHERE email='$email'";
	//Select users row from database base on $email
    $this->query($str);
	$selection = $this->fetch();
    //print_r($selection);
	//Salt and hash password for checking
	$password = $selection['user_salt'].$password;
	$password = $this->hashData($password);
   
   
   $match = "";
   $db_pword = (string) $selection['password'];
   $db_email = (string) $selection['email'];
	//Check email and password hash match database row
    if($password==$db_pword && $email == $db_email){
        $match = true;
    }else{
        $match = false;
    }
        

	//Convert to boolean
	$is_active = (boolean) $selection['is_active'];
	$verified = (boolean) $selection['is_verified'];
	if($match == true) {
		if($is_active == true) {
			if($verified == true) {
				//Email/Password combination exists, set sessions
				//First, generate a random string.
				$random = $this->randomString();
				//Build the token
				$token = $_SERVER['HTTP_USER_AGENT'].$random;
				$token = $this->hashData($token);
					
				//Setup sessions vars
				session_start();
				$_SESSION['token'] = $token;
				$_SESSION['user_id'] = $selection['uid'];
				$id = $selection['uid'];
                
				//Delete old logged_in_member records for user
                $str = "DELETE FROM logged_in_member WHERE id ='$id'";
                $this->query($str);
                
                
				
				//Insert new logged_in_member record for user
                $sid = session_id();
                $str = "INSERT INTO logged_in_member SET user_id='$id',session_id='$sid',token='$token'";
				$inserted = $this->query($str);

				//Logged in
				if($inserted != false) {
					return 0;
				} 
					
				return 3;
			} else {
				//Not verified
				return 1;
			}
		} else {
			//Not active
			return 2;
		}
	}
		
	//No match, reject
	return 4;
}


    
    /**
    * This function generates a random 50 letter word
    */
    private function randomString($length = 50)
    {
	$characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	$string = "";    
		for ($p = 0; $p < $length; $p++) {
		  $string .= $characters[mt_rand(0, strlen($characters))];
	    }
      	return $string;
    }
    
    /**
    * This function hashes data given to it and returns it as a hash_hmac
    **/
    protected function hashData($data)
    	{
		return hash_hmac('sha512', $data, $this->_siteKey);
	}
    
    /**
    * This function checks the session id with the dabase to see if user is an admin
    **/
    public function isAdmin()
    {		
	//$selection being the array of the row returned from the database.
	if($selection['is_admin'] == 1) {
		return true;
	}
		
	return false;
    }
    
    /**
    * A function to check the session of a logged in user
    **/
    public function checkSession()
{
    $_session_id = $_SESSION['user_id'];
    $str = "SELECT * FROM mw_users WHERE email='$_session_id'";
	//Select users row from database base on $email
    $this->query($str);
	//Select the row
	$selection = $this->fetch();
		
		
	if($selection) {
		//Check ID and Token
		if(session_id() == $selection['session_id'] && $_SESSION['token'] == $selection['token']) {
			//Id and token match, refresh the session for the next request
			$this->refreshSession();
			return true;
		}
	}
		
	return false;
}
    
    /**
    * A function to refresh the session
    **/
    private function refreshSession()
    {
	//Regenerate id
	session_regenerate_id();
		
	//Regenerate token
	$random = $this->randomString();
	//Build the token
	$token = $_SERVER['HTTP_USER_AGENT'] . $random;
	$token = $this->hashData($token); 
		
	//Store in session
	$_SESSION['token'] = $token;

    }
    
    /**
    * This function logs out the sessios
    **/
    public function logout()
    {
        session_destroy();
    }
    
}
    
  
    
?>