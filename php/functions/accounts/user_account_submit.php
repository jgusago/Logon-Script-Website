<?php

session_start();

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$userid = $_POST['userid'];
$AddUser = "Add User";

if(!isset($error)){ 
        $stmt = $db->prepare("SELECT userid FROM tbl_user WHERE userid = :userid");
        $stmt->execute(array($userid));
        $row_count = $stmt->rowCount();
        
        if ($row_count > 0){
            echo "<script>alert('User ID is already exist!'); window.location='../../../.admin.html'</script>";
        }
else
    {
        //$hashed_password = password_hash($_POST["password2"],PASSWORD_DEFAULT);
        $password = md5(sha1($password));

        $sql = "INSERT INTO tbl_user (userid, name, department, role, status, password)
             
        VALUES ('".$_POST["userid"]."', '".$_POST["name"]."', '".$_POST["department"]."', '".$_POST["role"]."', '".$_POST["status"]."', '$password')";
        ($db->query($sql));

        $sql2 = "INSERT INTO tbl_history (history_id, transact_name, transact_details, user_id)
             
        VALUES ('".$_POST["$AddUser"]."', '".$_POST["name"]."', '".$_POST["$userid"]."')"
        ($db->query($sql2));

        echo "<script>alert('User Account Save Successfully!'); window.location='../../../.admin.html'</script>";
    }
}
?>