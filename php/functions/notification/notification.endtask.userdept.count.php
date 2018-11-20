<?php
session_start();
$role = $_SESSION["role"];
$department = $_SESSION["department"];

date_default_timezone_set('Asia/Manila');
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
$count = 0;
$count2 = 0;
$notif1 = "";
$notif2 = "";
$time = date("h:i a");

if ($role == "STAFF"){

    $query = "SELECT * FROM logonscript.tbl_log WHERE connection_status not like 'ESTABLISHED' or iMonitor_Status not like 'running' group by hostname";
    foreach ($db->query($query) as $row){
        $count++;
    }
    if ($count != 0){
    $notif1 = "NOTIFnotconnected|text-danger|Disconnected iMonitor|$time|There are $count computers detected! Install imonitor agent.";
    
    }

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

    
    $query3 = "SELECT * FROM logonscript.tbl_computer_details WHERE $newquery group by hostname";
    $pdo = $db->prepare($query3);
    $pdo->bindParam(":version",$version);
    $pdo->execute();
    $result = $pdo->fetchAll();

    foreach ($result as $row) {
        $count2++;
    }

    if ($count2 != 0){
        $notif2 = "`";
        if($notif1 != 0){
            $notif2 =  "`";
        }
        $notif2 = $notif2."NOTIFimonitorupdate|text-warning|Agent Need Update|$time|There are $count2 computers detected! Update imonitor agent";
        }

    //notif number
    if($count == 0 && $count2 == 0){
        echo "0`<a class='dropdown-item' href='#'>
        <div class='dropdown-message small'>No notification</div></a>";
    }
    elseif($count !== 0 or $count2 !== 0){
        echo $notif1.$notif2;
    }

}

else{
    echo "0`<a class='dropdown-item' href='#'>
    <div class='dropdown-message small'>No notification</div></a>";
}
$pdo = null;

?>
