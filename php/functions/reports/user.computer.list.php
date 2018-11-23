<?php 
    session_start();
    $department = $_SESSION["department"];
    require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

    $sql2 = "SELECT * FROM logonscript.tbl_tree where tree_name like '$department'";
      
    foreach ($db->query($sql2) as $row) {
        $tree_filter = $row['tree_filter'];
    }    

		echo "Hostname|User|IP|Status|Remarks|Agent Version";

		$sql = "SELECT logonscript.tbl_computer_details.hostname As hostname, logonscript.tbl_log.user AS user, logonscript.tbl_computer_details.ip AS ip, logonscript.tbl_computer_details.status AS status, logonscript.tbl_computer_details.remarks, logonscript.tbl_computer_details.agent_version as agent_version
        FROM logonscript.tbl_computer_details 
        INNER JOIN logonscript.tbl_log ON logonscript.tbl_log.hostname = tbl_computer_details.hostname
        WHERE tbl_computer_details.hostname like '%$tree_filter%' group by tbl_computer_details.branch";
		foreach ($db->query($sql) as $row) {
	
			$hostname = $row['hostname'] ?: 'null';
            $user = $row['user'] ?: 'null';
            $ip = $row['ip'] ?: 'null';
            $Status = $row['status'] ?: 'null';
            $remarks = $row['remarks'] ?: 'null';
            $agent_version = $row['agent_version'] ?: 'null';
       
            echo "#$hostname|$user|$ip|$Status|$remarks|$agent_version";

		}
	?>