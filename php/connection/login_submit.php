<?php
	session_start();
	
	/*require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
  
	$un=$_POST['username'];
    $pw=md5($_POST['password']);
    $sql = "SELECT * FROM tbl_user WHERE username = '$un' AND password = '$pw' ";
    $stmt = $db->prepare("SELECT * from tbl_user WHERE username = '$un' AND password ='$pw'' ");
    $stmt->execute(array($un, $pw)); 
    $row_count = $stmt->rowCount();

    if ($row_count > 0) {
    $_SESSION["username"]=$un;
        header("Location: ../../iMonitor_Website/admin_dashboard.php");
    }

    else {
        header("Location: ../../iMonitor_Website/index.php?msg=wrong");
    }
    */



    function(){
        require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
        $username = mysqli_real_escape_string($con,$_POST['username']);
        $encrypted_password = mysqli_real_escape_string($con,$_POST['password']);
        $res = mysqli_query($con,"SELECT * FROM tbl_user WHERE username = '$username' AND password = '$password' ");
        $row = mysqli_fetch_assoc($res);
        if($row['password'] == md5(sha1($encrypted_password)))
        {
            $_SESSION["username"] = $username;
            header("Location: ../../iMonitor_Website/admin_dashboard.php");
        }else{
            header("Location: ../../iMonitor_Website/index.php?msg=wrong");
        }
    }
?>
                                     
                                     