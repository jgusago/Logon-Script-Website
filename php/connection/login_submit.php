<?php
error_reporting(0);

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
   
    $stmt = $db->prepare("SELECT * FROM tbl_user WHERE userid=:userid LIMIT 1"); 
    $stmt->bindValue(':userid', $userid, PDO::PARAM_STR); 
    $stmt->execute(); 
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC); 

    if (count($row) > 0) 
    {
        $hashed_password = $row[0]['password']; 
        $status = $row[0]['status']; 
        $role = $row[0]['role']; 
            if($status == 'Inactive') 
            {
                header("Location: ../../iMonitor_Website/index.php?msg2=wrong");
            }
            elseif(($status == 'Active') && (password_verify($password, $hashed_password))) { 
                    $_SESSION["userid"] = $row[0]['userid']; 
                    if($role == "ADMINISTRATOR")
                    {
                        echo "<script>alert('Welcome Admin!');location.href='admin_dashboard.php';</script>"
                        // header("Location: ../../iMonitor_Website/admin_dashboard.php"); 
                    }
                    else
                    {
                        header("Location: ../../iMonitor_Website/user_dashboard.php"); 
                    }
            }
            else {  
            header("Location: ../../iMonitor_Website/index.php?msg=wrong"); 
            }
    }
    else
    {
        header("Location: ../../iMonitor_Website/index.php?msg=wrong"); 
    } 
           
?>