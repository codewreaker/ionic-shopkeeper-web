// a function to swicth pages
var switch_pages;
//a function to send a request to a php server file
var sendRequest;
// a function that creates a new profile for a user
var sign_up;
// a function that sends an ajax request to log a user in
var login;


sign_up = function(){
    $('#signup_user').click(function(){
        $a = $('#signup_email').val();
        $b = $('#signup_pword').val();
        $c = $('#admin_select option:selected').val();
        
        $str = 'opt=1&signup_email='+$a+'&signup_pword='+$b+'&is_admin='+$c;
        $obj = sendRequest($str);
        var $toastContent = $obj.message;
        Materialize.toast($toastContent, 3000);
    });
}

login = function(){
    $('#login').click(function(){
        var a = $('#login_email').val();
        var b = $('#login_pword').val();
        //$str = 'opt=2&login_email='+$a+'&login_pword='+$b;
        $str = 'login_email='+a+'&login_pword='+b;
        $obj = sendRequest($str);
        var $toastContent = $obj.message;
        Materialize.toast($toastContent, 3000);
    });
}


//This function will be used to send an Ajax call to a database
sendRequest = function (dataString) {
        var obj = $.ajax({
            type: "POST",
            url: "src/php/login.php",
            //url: "http://cs.ashesi.edu.gh/~csashesi/class2016/prophet-agyeman-prempeh/mobile_web_server/login.php", //for web
            data: dataString,
            async: false,
            cache: false
        });
        var result = $.parseJSON(obj.responseText);
        return result;
    }


switch_pages = function () {
    $('#signup_page').hide();
    $('#signup').click(function () {
        $('#signup_page').show();
        $('#login_page').hide();
    });
    $('#signup_cancel').click(function () {
        $('#login_page').show();
        $('#signup_page').hide();
    });
}


// code
$(function () {
    switch_pages();
    sign_up();
    login();

});