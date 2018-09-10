function login(){

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    $.post("php/login_confirm.php",{username:username,password:password},function(data){
        var dts = data.split(";");
        switch(dts[0]){
            case "success":
            /*
            var status = dts[1];
            var active = dts[2];
            var passchange = dts[3];
            
                    if(passchange == 0){
                        if(status == 'admin'){
                                window.location.assign("http://172.16.39.241/om/.admin.html");
                            }
                        else if(status == 'itStaff'){
                                window.location.assign("http://172.16.39.241/om/.user.html");
                            }
                        else if (status == 'superadmin'){
                            window.location.assign("http://172.16.39.241/om/.superadmin.html");
                        }
                        else{
                            //do nothing
                        }
                        }
                    else{
                        $('#npd').removeAttr('hidden');
                        $('#npcd').removeAttr('hidden');
                        $('#confirmbtns').removeAttr('hidden');
                        $('#loginbtn').attr('hidden',true);
                        $('#newpassword').attr('required',true);
                        $('#conpassword').attr('required',true);
                        $("#loginform").removeAttr('onsubmit');
                        $("#loginform").attr('onsubmit','return loginnewpass()');
                        document.getElementById("username").disabled = true;
                        document.getElementById("password").disabled = true;
                        $("#notifylogin").html("<div class='alert alert-success'>You're Required to change your password before you continue</div>");
                        }
                        */
                   
            break;
            case "failed":
                $("#notifylogin").html("<div class='alert alert-danger'>"+dts[1]+"</div>");
                
            break;
            default:

        }

        
        //$("#sampledt").html(data+"status: "+status+"<br>active: "+active+"<br>passchange: "+passchange);
        });

        return false;
}