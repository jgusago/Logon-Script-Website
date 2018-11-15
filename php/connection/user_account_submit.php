<?php

session_start();

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$userid = $_POST['userid'];

if(!isset($error)){ 
        $stmt = $db->prepare("SELECT userid FROM tbl_user WHERE userid = :userid");
        $stmt->execute(array($userid));
        $row_count = $stmt->rowCount();
        
        if ($row_count > 0){
            echo "<script>alert('User ID is already exist!'); window.location='../../iMonitor_Website/admin_users.php'</script>";
        }
else
    {
        //$hashed_password = password_hash($_POST["password2"],PASSWORD_DEFAULT);
        $password = md5(sha1($password));

        $sql = "INSERT INTO tbl_user (userid, name, department, position, role, status, password)
             
        VALUES ('".$_POST["userid"]."', '".$_POST["name"]."', '".$_POST["department"]."', '".$_POST["position"]."', '".$_POST["role"]."', '".$_POST["status"]."', '$password')";
        ($db->query($sql));
        echo "<script>alert('User Account Save Successfully!'); window.location='../../admin.html'</script>";
    }
}
?>