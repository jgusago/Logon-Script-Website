<?php 
session_start();
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$id=$_GET['id'];
?>

    <?php
		$stmt = $db->query('SELECT id, userid, name, department, position, role, status FROM tbl_user WHERE id='$id'');
		$stmt->execute();
		for($i=0; $row = $stmt->fetch(); $i++){
		$id=$row['id'];
	?>