<?php

session_start();
	require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

	echo "User ID|Name|Department|Position|Role|Status|Option";

	if ($_SESSION['role'] == "ADMINISTRATOR")
	{

		$sql = "SELECT userid, name, department, position, role, status FROM tbl_user WHERE role<>'SUPER ADMIN'";

		foreach ($db->query($sql) as $row)
		{

			$userid = $row['userid'] ?: 'null';
			$name = $row['name'] ?: 'null';
			$department = $row['department'] ?: 'null';
			$position = $row['position'] ?: 'null';
			$role = $row['role'] ?: 'null';
			$status = $row['status'] ?: 'null';

			echo "#p`text-lg-left`id:$userid`$userid|p`text-lg-left`id:$name`$name|p`text-lg-left`id:$department`$department|";
			echo "p`text-lg-left`id:$position`$position|p`text-lg-left`id:$role`$role|p`text-lg-left`id:$status`$status|";
			echo "button`btn~btn-primary`onclick:ACCTedit(\"$userid\",\"$name\",\"$department\",\"$position\",\"$role\",\"$status\")`Edit`";
		}
	}
	else
	{
		$sql1 = "SELECT userid, name, department, position, role, status FROM tbl_user";

		foreach ($db->query($sql1) as $row)
		{

			$userid = $row['userid'] ?: 'null';
			$name = $row['name'] ?: 'null';
			$department = $row['department'] ?: 'null';
			$position = $row['position'] ?: 'null';
			$role = $row['role'] ?: 'null';
			$status = $row['status'] ?: 'null';

			echo "#$userid|$name|$department|$position|$role|$status|button`btn~btn-primary`onclick:ACCTedit(\"$userid\",\"$name\",\"$department\",\"$position\",\"$role\",\"$status\")`Edit`";
		}
	}

	$db = null;
?>
