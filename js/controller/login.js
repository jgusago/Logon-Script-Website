function confirmlogin(){

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var notif = document.getElementById("login-message");
    var type = document.getElementById("login-alert-type");
    var message = document.getElementById("login-alert-message");

    $.post("php/functions/login/login_confirm.php",{username:username,password:password},function(data){
        var dts = data.split(";");

        switch(dts[0]){
            case "success":
                notif.classList.remove("alert-danger");
                notif.classList.add("alert-success");
                type.innerHTML = "Success";
                message.innerHTML = "Please wait a moment while you are loging in";
                notif.style.display = "block";

                $.post("php/functions/session/ssn.crt.php",{username:username},function(data){



                });

                setTimeout(function(){
                    window.location.href= '.superadmin.html';
                },3000);
            break;
            case "failed":
                notif.classList.remove("alert-success");
                notif.classList.add('alert-danger');
                type.innerHTML = "Failed";
                message.innerHTML = "Please enter the information correctly and try again";
                notif.style.display = "block";
            break;
            default:

        }

        });

        return false;
}