<?php
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

session_start();
echo "Transact Name|Transact Details|Transact Date|User";
if($_SESSION['role'] == "ADMINISTRATOR")
{
    $query = "SELECT * FROM logonscript.tbl_history";

    foreach ($db->query($query) as $row) 
    {

        $transact_name = $row['transact_name'];
        $transact_details = $row['transact_details'];
        $transact_date = $row['transact_date'];
        $user_id = $row['user_id'];

        echo "#$transact_name|$transact_details|$transact_details|$user_id";

    }
}
else
{
    // $dept = $_SESSION['department'];
    // $query2 = "SELECT * FROM logonscript.tbl_log_history where branch like '$dept'";
    // foreach ($db->query($query2) as $row) {

    //     $id = $row['userid'];
    //     $ip = $row['ip_address'];
    //     $services = $row['services'];
    //     $branch = $row['branch'];
    //     $time = $row['scan_time'];
    //     $query4 = "SELECT hostname from logonscript.tbl_log WHERE ip_address LIKE '$ip'";
    //     foreach ($db->query($query4) as $row) 
    //     {
    //         $hostname = $row['hostname'];
    //     }

    //     echo "#$hostname|$id|$ip|$services|$branch|$time";

    // }
}
?>