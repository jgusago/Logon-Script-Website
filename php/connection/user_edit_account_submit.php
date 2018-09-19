<?php
error_reporting(0);

session_start();
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$get_id=$_REQUEST['id'];

$userid= $_POST['userid'];
$name= $_POST['name'];
$department= $_POST['department'];
$position= $_POST['position'];
$role= $_POST['role'];
$status= $_POST['status'];
$hashed_password = password_hash($_POST["password2"],PASSWORD_DEFAULT);
//$password= md5($_POST['password']);

if($_POST['userid'] !== $_POST['userid2']) {
//if(!isset($error)){
    $stmt = $db->prepare("SELECT userid FROM tbl_user WHERE userid = :userid");
    $stmt->execute(array($userid));
    $row_count = $stmt->rowCount();
    
    if ($row_count > 0){
        echo "<script>alert('Username exist!'); window.location='../../iMonitor_Website/test_edit.php'</script>";
    }
else {
        $stmt = $db->prepare("UPDATE tbl_user SET userid='$userid', name='$name', department='$department', position='$position', role='$role', status='$status', password='$hashed_password' WHERE id='$get_id'");
        $stmt->execute(array());
        $affected_rows = $stmt->rowCount();
        echo "<script>alert('Account updated successfully!'); window.location='../../iMonitor_Website/admin_users.php'</script>";
        }
    }
?>