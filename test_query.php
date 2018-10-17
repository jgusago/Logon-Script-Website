<?php 
error_reporting(0);
session_start();
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
?>
<!DOCTYPE html>
<html>
  <head>

  </head>

  <body>
    <?php

		echo "ID|User ID|Name|Department|Position|Status|Role";

		$sql = "SELECT id, userid, name, department, position, status, role FROM tbl_user WHERE role<>'SUPER ADMIN'";
		foreach ($db->query($sql) as $row) {
	
			$id = $row['id'] ?: 'null';
			$userid = $row['userid'] ?: 'null';
			$name = $row['name'] ?: 'null';
			$department = $row['department'] ?: 'null';
			$position = $row['position'] ?: 'null';
			$status = $row['status'] ?: 'Not Found';
			$role = $row['role'] ?: 'All Running';
		
			echo "#$id|$userid|$name|$department|$position|$status|$role";

		}
	?>

  </body>
</html>
