<?php
session_start();

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
?>
<?php
	$sql = "SELECT id, userid, name, department, status, role FROM tbl_user WHERE role<>'SUPER ADMIN'";
		foreach ($db->query($sql) as $row) {
			//$stmt = $db->query("SELECT id, userid, name, department, position, status, role FROM tbl_user WHERE role<>'SUPER ADMIN'");
			//$stmt->execute();
			//for($i=0; $row = $stmt->fetch(); $i++){
			$id=$row['id'];			
?>
					
	<?php echo $row['id']; ?>
	<?php echo $row['userid']; ?>
	<?php echo $row['name']; ?>
	<?php echo $row['department']; ?>
	<?php echo $row['role']; ?>
	<?php echo $row['status']; ?>											
<?php } ?>
                                        