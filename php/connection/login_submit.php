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


if(isset($_POST['login'])){

    $userid = $_POST['userid'];
    $password = $_POST['password'];

   
    $stmt = $db->prepare('SELECT * FROM tbl_user WHERE userid = :userid');

        $stmt->execute(['userid' => $userid]);

        if($stmt->rowCount() > 0){
    
            $user = $stmt->fetch();

            if(password_verify($password, $user['password'])){
                //$_SESSION["userid"]=$userid;
                header("Location: ../../iMonitor_Website/admin_dashboard.php");
            }
            else{
                $_SESSION['userid'] = $userid;
                $_SESSION['password'] = $password;

                header("Location: ../../iMonitor_Website/index.php?msg=wrong");
            }
        }
    } 

?>