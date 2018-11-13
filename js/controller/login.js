function load(){
  SESSIONConfirm();
}
function confirmlogin(){

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var notif = document.getElementById("login-message");
    var type = document.getElementById("login-alert-type");
    var message = document.getElementById("login-alert-message");

    $.post("php/functions/session/session.start.php",{username:username,password:password},function(data){

        var dts = data.split(":");

        switch(dts[0]){
            case "success":
                notif.classList.remove("alert-danger");
                notif.classList.add("alert-success");
                type.innerHTML = "Success";
                message.innerHTML = "Please wait a moment while you are loging in";
                notif.style.display = "block";
                switch(dts[1]){
                    case "admin":
                        setTimeout(function(){
                            window.location.href = '.admin.html';
                        },500);
                    break;
                    case "superadmin":
                        setTimeout(function(){
                            window.location.href = '.superadmin.html';
                        },500);
                    break;
                    case "user":
                        setTimeout(function(){
                            window.location.href = '.user.html';
                        },500);
                    break;
                    default:
                      setTimeout(function(){
                        window.location.href = '.user.html';
                      },500);
                    }
            break;
            case "failed":
                notif.classList.remove("alert-success");
                notif.classList.add('alert-danger');
                type.innerHTML = "Failed!!";
                notif.style.display = "block";

                switch(dts[1]){
                    case "inactive":
                        message.innerHTML = "Your account is disabled/inactive";
                    break;
                    case "password":
                        message.innerHTML = "Your password and account doesn't match";
                    break;
                    case "user":
                        message.innerHTML = "Your account doesn't exist";
                    break;
                    default:
                        message.innerHTML = "Unknown Error have been accured!!<br>The current site have been modefied<br>please refresh the page and try again";
                }
            break;
            default:
            notif.classList.remove("alert-success");
                notif.classList.add('alert-danger');
                type.innerHTML = "Failed!!!";
                message.innerHTML ="Unknown Error have been accured!!<br>The current site have been modefied<br>please refresh the page and try again"+data;
                notif.style.display = "block";

        }

        });

        return false;
}


function SESSIONConfirm(){
    $.post("php/functions/session/session.confirm.php",function(data){

      data = data.split(";");

      if(data[0] == "Active"){
        //redirect
        switch (data[1]) {
          case "SUPER ADMIN":
            window.location.assign("/.superadmin.html");
            break;
          case "ADMINISTRATOR":
            window.location.assign("/.admin.html");
            break;
          case "STAFF":
            window.location.assign("/.user.html");
            break;
          default:
          window.location.assign("/index.html");
        }
        //riderect
      }
      else{
        //window.location.assign("/index.html");
      }


    });
}

