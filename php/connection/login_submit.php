<?php
//error_reporting(0);

session_start();
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

/*$un=$_POST['userid'];
$pw=md5($_POST['password2']);

$stmt = $db->prepare("SELECT * from tbl_user WHERE userid=? AND password=?");
$stmt->execute(array($un, $pw));
$row_count = $stmt->rowCount();

if ($row_count > 0) {
    $_SESSION["userid"]=$un;
    header("Location: ../../iMonitor_Website/admin_dashboard.php");
    }

else {
    header("Location: ../../iMonitor_Website/index.php?msg=wrong");
}*/


    $userid = $_POST['userid'];
    $password = $_POST['password'];
   
    $stmt = $db->prepare("SELECT * FROM tbl_user WHERE userid=?");
    $stmt->execute(array($userid, $password));
    $row_count = $stmt->rowCount();
    if ($row_count > 0) { 
    
        if(password_verify($_POST["password"],$hashed_password)) {
            
            if(isset($_SESSION["userid"])) {
                 //header("Location: ../../iMonitor_Website/admin_dashboard.php");
                 echo "correct";
    exit;          
    }
            else {
                //header("Location: ../../iMonitor_Website/index.php?msg=wrong");
                echo "Wrong";
            }
        }
    }
?>