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
    $password = $_POST['password2'];
    $hashed_password = password_hash($_POST["password2"],PASSWORD_DEFAULT);
   
    $stmt = $db->prepare("SELECT userid, password FROM tbl_user WHERE userid=?");
    $stmt->execute([$userid]);
    $check_user=$stmt->fetch();
    if(count($check_user)>0 && password_verify($_POST["password2"],$hashed_password)) {
      $_SESSION['userid']=$check_user['userid'];
                 header("Location: ../../iMonitor_Website/admin_dashboard.php");
    exit;          
    }
            else {
                header("Location: ../../iMonitor_Website/index.php?msg=wrong");
            }

?>