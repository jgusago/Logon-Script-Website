<?php
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
$query =  "SELECT * FROM logonscript.tbl_agent_version WHERE type like 'valid'";
$count = 0;
$newquery = "";
foreach ($db->query($query) as $row){
    $version = $row['version'];
    if ($count !== 0){
        $newquery = $newquery." and agent_version != $version";
    }
    else{
        $newquery = "agent_version != $version";
    }
    $count++;
}
session_start();
if($_SESSION['role'] != 'STAFF'){
    $query3 = "SELECT * FROM logonscript.tbl_computer_details WHERE $newquery group by hostname";
}

/*FOR STAFF*/
elseif($_SESSION['role'] == 'STAFF'){
    $query3 = "SELECT * FROM logonscript.tbl_computer_details WHERE $newquery group by hostname";


}

else{
    $dept = $_SESSION('department');
    $sql = "SELECT * FROM tbl_tree where tbl_name LIKE '$dept'";
    foreach($db->query($sql) as $row){

        if(isset($row['filter'])){
            $filter = $row['filter'];
        }
        else{
            $filter = "123123123123";
        }


    }

    $query3 = "SELECT * FROM logonscript.tbl_computer_details WHERE $newquery AND hostname LIKE '%$filter%' group by hostname";
}

echo "Computer Name|IP Address|Version|iMonitor Status|Server Status|Branch|Scan Time|Option";
$pdo = $db->prepare($query3);
$pdo->bindParam(":version",$version);
$pdo->execute();
$result = $pdo->fetchAll();

foreach ($result as $row) {
    $hostname = $row['hostname'];
    $aversion = $row['agent_version'];
    $newsql = "SELECT * FROM logonscript.tbl_log WHERE hostname like '$hostname' group by hostname";
    foreach($db->query($newsql) as $row){
        $log_no = $row['log_no'];
        $ip_address = $row['ip_address'] ?: 'null';
        $iMonitor_Status = $row['iMonitor_Status'] ?: 'Not Found';
        $connections_status = $row['connection_status'] ?: 'Not Connected';
        $branch = $row['branch'] ?: 'Scan Failed';
        $scan_time = $row['scan_time'] ?: 'null';
        $date = $scan_time;

        $date = explode(" ",$scan_time);

        $date[0] = preg_replace("/[^a-zA-Z]/", "", $date[0]);

        if ($newdate = new DateTime($date[0]." ".$date[1]))
        {
        $scan_time = date_format($newdate, "M-d-Y H:i");
        }
        if($connections_status == "ESTABLISHED"){
            $style = "bg-success";
        }
        else{
            $style = "bg-danger";
        }
        if($iMonitor_Status != "End Task"){
            $style2 ="bg-success";
        }
        else{
            $style2 = "bg-danger";
        }
    }
    echo "#p`text-lg-left`id:$log_no-1`$hostname|p`text-lg-left`id:$log_no-2`$ip_address|div`bg-warning`width:100%~id:$log_no-3`$aversion|div`$style`width:100%~id:$log_no-4`$iMonitor_Status|div`$style`width:100%~id:$log_no-5`$connections_status|p`text-lg-left`id:$log_no-6`$branch|p`text-lg-left`id:$log_no-7`$scan_time|button`btn~btn-primary`onClick:AgentUpdate(\"$hostname\",\"$log_no\")`Edit";
}
?>
