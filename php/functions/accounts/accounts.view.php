<?php
	require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

	echo "User ID|Name|Department|Position|Status|Role|Option";

	$sql = "SELECT userid, name, department, position, status, role FROM tbl_user WHERE role<>'SUPER ADMIN'";

		foreach ($db->query($sql) as $row) 
		{

			$userid = $row['userid'] ?: 'null';
			$name = $row['name'] ?: 'null';
			$department = $row['department'] ?: 'null';
			$position = $row['position'] ?: 'null';
			$status = $row['status'] ?: 'null';
			$role = $row['role'] ?: 'null';

<<<<<<< HEAD
			echo "#$userid|$name|$department|$position|$status|$role|button`btn~btn-primary`onclick:ACCTedit('$userid','$name','$department','$position','$status','$role')`Edit";
=======
			echo "#$userid|$name|$department|$position|$status|$role|button`btn~btn-primary`onclick:ACCTedit(\"$userid\", \"$name\",\"$department\", \"$status\",\"$role\")`Edit";
>>>>>>> 60b6fcfe02ba2a69008523ce988c847bb7d7bcf5
		}
	$db = null;
?>
