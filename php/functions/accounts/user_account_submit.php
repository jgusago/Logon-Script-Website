<?php
error_reporting(0);
session_start();

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$userid = $_POST['userid'];
$AddUser = "Add User";
$userid2 = $_SESSION["userid"];

if(!isset($error)){ 
        $stmt = $db->prepare("SELECT userid FROM tbl_user WHERE userid = :userid");
        $stmt->execute(array($userid));
        $row_count = $stmt->rowCount();
        
        if ($row_count > 0){
            echo "<script>alert('User ID is already exist!'); window.location='../../../.admin.html'</script>";
        }
else
    {
        //$hashed_password = password_hash($_POST["password"],PASSWORD_DEFAULT);
        
        $encrypt_password = md5(sha1($password));

        $sql = "INSERT INTO tbl_user (userid, name, department, role, status, password)
             
        VALUES ('".$_POST["userid"]."', '".$_POST["name"]."', '".$_POST["department"]."', '".$_POST["role"]."', '".$_POST["status"]."', '$encrypt_password')";
        ($db->query($sql));

        $sql2 = "INSERT INTO tbl_history (transact_name, transact_details, transact_date, user_id)
             
        VALUES ('$AddUser', 'UserID:".$_POST["userid"].",Name:".$_POST["name"].",Department:".$_POST["department"].",Role:".$_POST["role"].",Status:".$_POST["status"]."', NOW(), '$userid2')";
        ($db->query($sql2));

        echo "<script>alert('User Account Save Successfully!'); window.location='../../../.admin.html'</script>";

        //if(!$sql)
        //{
            //echo dump();
        //}
    }
}
?>