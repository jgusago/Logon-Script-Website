document.getElementById("login-form").addEventListener("submit",login);

function login(){
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;

    $.post("php/login_confirm.php",{username:username,password:password},function(data){

        data = data.split("#");

        switch(data(0)){
            case "success":
                document.getElementById("login-message").style.display = "block";
                return false;

            break;

            case "failed":
                document.getElementById("login-message").style.display = "block";
                return false;

            break;

            default:
                document.getElementById("login-message").style.display = "block";
                return false;
        }

        return false;
    });

    return false;
}