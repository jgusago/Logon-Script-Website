<?php
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

session_start();
echo "Hostname|User ID|IP Address|Missing Services|Branch|Scan Time|End Time";
if($_SESSION['role'] != "STAFF")
{
    $query = "SELECT *, MAX(scan_date), MIN(scan_date) FROM logonscript.tbl_log_history group by ip_address order by scan_date Desc";

    foreach ($db->query($query) as $row)
    {
        $hostname = "";
        $id = $row['userid'];
        $ip = $row['ip_address'];
        $services = $row['services'];
        $branch = $row['branch'];
        $maxtime = $row['MAX(scan_date)'];
        $mintime = $row['MIN(scan_date)'];

        $query3 = "SELECT hostname from logonscript.tbl_log WHERE ip_address LIKE '$ip'";
        foreach ($db->query($query3) as $row)
         {
            $hostname = $row['hostname'];
        }

        echo "#$hostname|$id|$ip|$services|$branch|$maxtime|$mintime";
    }
}
else
{
    $dept = $_SESSION['department'];
    $query2 = "SELECT * FROM logonscript.tbl_log_history where branch like '$dept'";
    foreach ($db->query($query2) as $row) {

        $id = $row['userid'];
        $ip = $row['ip_address'];
        $services = $row['services'];
        $branch = $row['branch'];
        $time = $row['scan_time'];
        $query4 = "SELECT hostname from logonscript.tbl_log WHERE ip_address LIKE '$ip'";
        foreach ($db->query($query4) as $row)
        {
            $hostname = $row['hostname'];
        }

        echo "#$hostname|$id|$ip|$services|$branch|$time";

    }
}

$db = null;
?>
