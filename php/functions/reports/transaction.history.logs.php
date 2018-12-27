<?php

session_start();
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

	echo "Transcat Name|Transact Details|Transact Date|User";

	if ($_SESSION['role'] == "ADMINISTRATOR") 
	{

		$sql = "SELECT transact_name, transact_details, transact_date, user_id FROM tbl_history";

		foreach ($db->query($sql) as $row) 
		{

			$userid = $row['transact_name'] ?: 'null';
			$name = $row['transact_details'] ?: 'null';
			$department = $row['transact_date'] ?: 'null';
			$position = $row['user_id'] ?: 'null';

			echo "#$transact_name|$transact_details|$transact_date|$user_id";
		}
	}
	else
	{
		$sqlquery = "SELECT transact_name, transact_details, transact_date, user_id FROM tbl_history";

		foreach ($db->query($sqlquery) as $row) 
		{

			$userid = $row['transact_name'] ?: 'null';
			$name = $row['transact_details'] ?: 'null';
			$department = $row['transact_date'] ?: 'null';
			$position = $row['user_id'] ?: 'null';

			echo "#$transact_name|$transact_details|$transact_date|$user_id";
		}
	}
	
	$db = null;
?>
