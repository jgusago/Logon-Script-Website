function confirmlogin(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    return false;

}

/*


    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var message = document.getElementById("login-message");

    $.post("php/login_confirm.php",{username:username,password:password},function(data){
        var dts = data.split(";");
        switch(dts[0]){
            case "success":
                message.style.display = "block";
            break;
            case "failed":
                message.style.display = "block";
            break;
            default:

        }
        //$("#sampledt").html(data+"status: "+status+"<br>active: "+active+"<br>passchange: "+passchange);
        });

        return false;

        */