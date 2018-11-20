<?php
session_start();

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
?>
<?php
	$sql = "SELECT userid, name, department, position, role, status FROM tbl_user WHERE role<>'SUPER ADMIN'";
		foreach ($db->query($sql) as $row) {
			//$stmt = $db->query("SELECT id, userid, name, department, position, status, role FROM tbl_user WHERE role<>'SUPER ADMIN'");
			//$stmt->execute();
			//for($i=0; $row = $stmt->fetch(); $i++){
			$id=$row['userid'];			
?>
					
	<?php echo $row['userid']; ?>
	<?php echo $row['name']; ?>
	<?php echo $row['department']; ?>
	<?php echo $row['position']; ?>
	<?php echo $row['role']; ?>
	<?php echo $row['status']; ?>							
<?php } ?>
                                        