<?php 
session_start();
$department = $_SESSION["department"];
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

		echo "Hostname|User|IP|Status|Remarks|Agent Version|Branch";

		$sql = "SELECT * from tbl_computer_details WHERE hostname like '%$tree_filter%'";
		foreach ($db->query($sql) as $row) {
	
			$hostname = $row['hostname'] ?: 'null';
            $user = $row['user'] ?: 'null';
            $ip = $row['ip'] ?: 'null';
            $Status = $row['status'] ?: 'null';
            $remarks = $row['remarks'] ?: 'null';
            $agent_version = $row['agent_version'] ?: 'null';
            $branch = $row['branch'] ?: 'null';
       
			echo "#$hostname|$useer|$ip|$Status|$remarks|$agent_version|$branch";

		}
	?>