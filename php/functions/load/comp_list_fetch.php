<?php 
// session_start();
$department = $_SESSION["department"];
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

        $sql2 = "SELECT * FROM logonscript.tbl_tree where tree_name like '$department'";
      
		foreach ($db->query($sql2) as $row) {
            $tree_filter = $row['tree_filter'];
        }    

		echo "Hostname|IP|Status|Remarks|Agent Version|Branch";

		$sql = "SELECT hostname, ip, status, remarks, agent_version from tbl_computer_details WHERE hostname like '%$tree_filter%'";
		foreach ($db->query($sql) as $row) {
	
			$hostname = $row['hostname'] ?: 'null';
            $ip = $row['ip'] ?: 'null';
            $Status = $row['status'] ?: 'null';
            $remarks = $row['remarks'] ?: 'null';
            $agent_version = $row['agent_version'] ?: 'null';
        
			echo "#$hostname|$ip|$Status|$remarks|$agent_version";

		}
	?>