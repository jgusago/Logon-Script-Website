<?php
session_start();
//require '../php/connection/login_submit.php';
if(isset($_SESSION["userid"])) {
  header("Location: admin_dashboard.php");
  exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Skyluster Technology Inc.</title>
    <link rel="stylesheet" type="text/css" href="login.css">
    <link href="../bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="../design/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
</head>
<body style="height: -webkit-fill-available;">
    <div class="wrapper">
        <div class="col-lg-12">
            <div style="clear:both; height:165px;"></div>
            <br>
            <div class="container">
                <?php
                    if(isset($_GET['msg']))                      
                    {                    
                        echo "<p align='center' class='error'>Wrong username or password.</p>";
                    }
                ?>
                <?php
                    if(isset($_GET['msg2']))                      
                    {                    
                        echo "<p align='center' class='error'>Your account is Inactive.</p>";
                    }
                ?>
                <?php
                        //login();
                ?>
                 <form action="../php/connection/login_submit.php" method="POST">
                    <div class="form-group" style="margin-left: -39px;">
                        <div class="input-group">
                            <span class="input-group-addon">
                                <i class="glyphicon glyphicon-user"></i>
                            </span> 
                            <input class="form-control" id="userid" placeholder="User ID" name="userid" type="text" autofocus="autofocus" required>
                        </div>
                    </div>
                    <div class="form-group" style="margin-left: -39px;">
                        <div class="input-group">
                            <span class="input-group-addon">
                                <i class="glyphicon glyphicon-lock"></i>
                            </span>
                            <input class="form-control" id="password" placeholder="Password" name="password" type="password" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required>
                        </div>
                    </div>
                    <div class="form-group" style="margin-left: -39px;">
                        <div>
                            <button type="submit" name="submit" class="btn btn-primary" style="width:70%; margin-bottom:20px; margin-left:110px;">Login</button></a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- <div>
            <h1 style="padding-top:110px; font-family: Verdana, Geneva, sans-serif; color: white; text-align:center; font-size: 60px; letter-spacing: 5px;">SKYLUSTER TECHNOLOGY INC.</h1>
        </div> -->
    </div>

</body>
</html>