<?php 
error_reporting(0);
session_start();
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

		echo "ID|User ID|Name|Department|Position|Status|Role";

		$sql = "SELECT user,hostname, ip_address,iMonitor_Status,connection_status from tbl_log WHERE user != 'Administrator'";
		foreach ($db->query($sql) as $row) {
	
			$id = $row['id'] ?: 'null';
			$hostname = $row['hostname'] ?: 'null';
			$ip_address = $row['ip_address'] ?: 'null';
			$iMonitor_Status = $row['iMonitor_Status'] ?: 'null';
            $connection_status = $row['connection_status'] ?: 'null';
            
			    if($row['iMonitor_Status'] == 'Running' AND $row['connection_status'] == 'ESTABLISHED')
                    echo 'Active';
                else
                    echo "Inactive";

			echo "#$id|$hostname|$ip_address|$iMonitor_Status|$connection_status";

		}
	?>