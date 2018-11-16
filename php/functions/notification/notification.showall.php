<?php

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$query =  "SELECT * FROM logonscript.tbl_agent_version WHERE type like 'valid'";
$count = 0;
$newquery = "";
foreach ($db->query($query) as $row){
    $version = $row['version'];
    $version2[$count] = $row['version'];
    if ($count !== 0){
        $newquery = $newquery." and agent_version != $version";
    }
    else{
        $newquery = "tbl_computer_details.agent_version != $version";
    }
    $count++;
}

//--------------------------------------------------------------------------------------------------------------------------------//

session_start();
if($_SESSION['role'] != 'STAFF'){
    $query3 = "SELECT * from logonscript.tbl_log inner join logonscript.tbl_computer_details on tbl_log.hostname=tbl_computer_details.hostname where tbl_log.user not like 'admin%' and (($newquery) or (connection_status not like 'ESTABLISHED' or iMonitor_Status not like 'running')) group by tbl_log.hostname";
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

    $query3 = "SELECT * from logonscript.tbl_log inner join logonscript.tbl_computer_details on tbl_log.hostname=tbl_computer_details.hostname where tbl_log.user not like 'admin%' AND (($newquery) or (connection_status not like 'ESTABLISHED' or iMonitor_Status not like 'running') AND hostname LIKE '%$filter%' group by tbl_log.hostname";
}


echo "Computer Name|IP Address|Version|iMonitor Status|Server Status|Branch|Scan Time";

$pdo = $db->prepare($query3);
$pdo->bindParam(":version",$version);
$pdo->execute();
$result = $pdo->fetchAll();

foreach ($result as $row) {
    $hostname = $row['hostname'];
    $aversion = $row['agent_version'];
    $newsql = "SELECT * FROM logonscript.tbl_log WHERE hostname like '$hostname' and user not like 'admin%'";
    foreach($db->query($newsql) as $row){
        $ip_address = $row['ip_address'] ?: 'null';
        $iMonitor_Status = $row['iMonitor_Status'] ?: 'Not Found';
        $connections_status = $row['connection_status'] ?: 'Not Connected';
        $branch = $row['branch'] ?: 'Scan Failed';
        $scan_time = $row['scan_time'] ?: 'null';
        $date = $scan_time;

        $date = explode(" ",$scan_time);

        $date[0] = preg_replace("/[^a-zA-Z]/", "", $date[0]);

        if ($newdate = new DateTime($date[0]." ".$date[1])){

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
        for($i = 0; $i < count($version2); $i++){
            if($version2[$i] == $aversion){
                $vstyle = "bg-success";
                $i = count($version2);
            }
            else{
                $vstyle = "bg-warning";
            }
        }

    }
    echo "#$hostname|$ip_address|div`$vstyle`width:100%`$aversion|div`$style`width:100%`$iMonitor_Status|div`$style`width:100%`$connections_status|$branch|$scan_time";
}

?>