// a function to swicth pages
var switch_pages;
//a function to send a request to a php server file
var sendRequest;
// a function that creates a new profile for a user
var sign_up;
// a function that sends an ajax request to log a user in
var login;
// A function that toggles between online and offline
var network_switch;

var _ticker = 0;
var network_status = 0;

network_switch = function () {
    $("#network-switch").click(function () {
        if (_ticker % 2 == 0) {
            $(this).addClass("green");
            network_status = 1;
            $(".status").text("online");
        } else {
            network_status = 0;
            $(this).removeClass("green");
            $(".status").text("offline");
        }
        _ticker++;
    });
}


sign_up = function () {
    $('#signup_user').click(function () {
        $a = $('#signup_email').val();
        $b = $('#signup_pword').val();
        $c = $('#admin_select option:selected').val();
        if (network_status == 0) {
            $json_string = {
                "email": $a,
                "password": $b,
                "admin": $c
            };
            var localData = JSON.stringify($json_string);
            window.localStorage.setItem('credentials', localData);
            Materialize.toast("You have succesfully created a profile", 3000);
            window.location.replace("main.html");
        } else if (network_status == 1) {
            $str = 'opt=1&signup_email=' + $a + '&signup_pword=' + $b + '&is_admin=' + $c;
            $obj = sendRequest($str);
            var $toastContent = $obj.message;
            if ($obj.result == 1) {
                window.location.replace("main.html");
                Materialize.toast($toastContent, 3000);
            } else {
                Materialize.toast($toastContent, 3000);
            }
        }

    });
}

login = function () {
    $('#login').click(function () {
        $a = $('#login_email').val();
        $b = $('#login_pword').val();
        if (network_status == 0) {
            $obj = JSON.parse(window.localStorage.getItem('credentials'));
            $obj.email;
                         if ($a == $obj.email && $b == $obj.password) {
                            window.location.replace("main.html");
                        }
           
        } else if (network_status == 1) {
            $str = 'opt=2&login_email=' + $a + '&login_pword=' + $b;
            //$str = 'login_email='+a+'&login_pword='+b;
            $obj = sendRequest($str);
            if ($obj.result == 1) {
                window.location.replace("main.html");
            } else {
                Materialize.toast("Wrong Username or Password", 3000);
            }
        }

    });
}


//This function will be used to send an Ajax call to a database
sendRequest = function (dataString) {
    var obj = $.ajax({
        type: "POST",
        //url: "src/php/login.php",
        url: "http://cs.ashesi.edu.gh/~csashesi/class2016/prophet-agyeman-prempeh/mobile_web_server/login.php", //for web
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
    network_switch();
    switch_pages();
    sign_up();
    login();

});