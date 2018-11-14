<?php 
session_start();
$department = $_SESSION["department"];
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

		echo "Comp ID|Hostname|Processor|HDD Serial|Mac Address|MB manufacturer|MB Product|Scan Time|IP|Status|Remarks|Agent Version|Branch";

		$sql = "SELECT * from tbl_computer_details WHERE hostname like '%$department%'";
		foreach ($db->query($sql) as $row) {
	
			$compID = $row['compID'] ?: 'null';
			$hostname = $row['hostname'] ?: 'null';
			$processor = $row['processor'] ?: 'null';
            $HDD_Serial = $row['HDD_Serial'] ?: 'null';
            $MAC_Address = $row['MAC_Address'] ?: 'null';
            $mb_manufacturer = $row['mb_manufacturer'] ?: 'null';
            $mb_product = $row['mb_product'] ?: 'null';
            $Scan_Time = $row['Scan_Time'] ?: 'null';
            $ip = $row['ip'] ?: 'null';
            $Status = $row['status'] ?: 'null';
            $remarks = $row['remarks'] ?: 'null';
            $agent_version = $row['agent_version'] ?: 'null';
            $branch = $row['branch'] ?: 'null';
       
			echo "#$compID|$hostname|$processor|$HDD_Serial|$MAC_Address|$mb_manufacturer|$mb_product|$Scan_Time|$ip|$Status|$remarks|$agent_version|$branch";

		}
	?>