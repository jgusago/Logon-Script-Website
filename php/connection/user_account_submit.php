<?php
error_reporting(0);

session_start();

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$username = $_POST['userid'];

/*if(!isset($error)){ 
        $stmt = $db->prepare("SELECT userid FROM tbl_user WHERE userid = :userid");
        $stmt->execute(array($username));
        $row_count = $stmt->rowCount();
        
        if ($row_count > 0){
            echo "<script>alert('Username exist!'); window.location='../../iMonitor_Website/admin_users.php'</script>";
        }
else
    {
        $sql = "INSERT INTO tbl_user (userid, name, department, position, role, password)
         
        VALUES ('".$_POST["userid"]."', '".$_POST["name"]."', '".$_POST["department"]."', '".$_POST["position"]."', '".$_POST["role"]."', '".$_POST["password2"]=md5($_POST['password'])."')";
        ($db->query($sql));
        echo "<script>alert('User Account Save Successfully!'); window.location='../../iMonitor_Website/admin_users.php'</script>";
    }
}*/
    
        $hash_password = password_hash($_POST['password2'], PASSWORD_DEFAULT);
        $sql = "INSERT INTO sys_user (userid, password, role) VALUES ('".$_POST['userid']."', '$hash_password', '".$_POST['role']."')";
        ($db->query($sql));
        echo "<script>alert('User Account Save Successfully!'); window.location='../../iMonitor_Website/admin_users.php'</script>";
?>