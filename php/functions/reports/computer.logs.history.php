<?php
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
$query = "SELECT * FROM logonscript.tbl_log_history";

	foreach ($db->query($query) as $row) {

        $id = $row['userid'];
        $ip = $row['ip_address'];
        $services = $row['services']


    }
?>