<?php

session_start();
	require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

	echo "User ID|Name|Department|Position|Role|Status|Option";

	if ($_SESSION['role'] == "ADMINISTRATOR") 
	{

		$sql = "SELECT userid, name, department, position, role, status FROM tbl_user WHERE role<>'SUPER ADMIN'";
	}
	else
		$sql = "SELECT userid, name, department, position, role, status FROM tbl_user";

		foreach ($db->query($sql) as $row) 
		{

			$userid = $row['userid'] ?: 'null';
			$name = $row['name'] ?: 'null';
			$department = $row['department'] ?: 'null';
			$position = $row['position'] ?: 'null';
			$status = $row['role'] ?: 'null';
			$role = $row['status'] ?: 'null';

			echo "#$userid|$name|$department|$position|$role|$status|button`btn~btn-primary`onclick:ACCTedit(\"$userid\",\"$name\",\"$department\",\"$position\",\"$role\",\"$status\")`Edit";
		}
	
	$db = null;
?>
