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
//$password= $_POST['password2'];

$stmt = $db->prepare("UPDATE tbl_user SET userid='$userid', name='$name', department='$department', position='$position', role='$role', password=md5() WHERE id='$get_id'");
$stmt->execute(array());
$affected_rows = $stmt->rowCount();

echo "<script>alert('Account updated successfully!'); window.location='../../iMonitor_Website/admin_users.php'</script>";
?>