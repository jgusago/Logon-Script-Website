<?php
	require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

	echo echo "User ID|Name|Department|Position|Status|Role";

	$sql = "SELECT userid, name, department, position, status, role FROM tbl_user WHERE role<>'SUPER ADMIN'";
		
		foreach ($db->query($sql) as $row) {
								
			$userid = $row['userid'] ?: 'null';
			$name = $row['name'] ?: 'null';
			$department = $row['department'] ?: 'null';
			$position = $row['position'] ?: 'null';
			$status = $row['status'] ?: 'null';
			$role = $row['role'] ?: 'null';
			
			echo "#$userid|$name|$department|$position|$status|$role";
		}								
?>