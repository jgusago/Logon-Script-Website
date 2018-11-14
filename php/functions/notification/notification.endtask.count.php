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

if ($role == "ADMINISTRATOR" || $role == "SUPER ADMIN"){

    $query = "SELECT * FROM logonscript.tbl_log WHERE connection_status not like 'ESTABLISHED' or iMonitor_Status not like 'running'";
    foreach ($db->query($query) as $row){
        $count++;
    }
    if ($count != 0){
    $notif1 = "<a class='dropdown-item' href='#' onClick='NOTIFnotconnected'><span class='text-danger'><strong>Disconnected iMonitor</strong></span><span class='small float-right text-muted'>$time</span>
    <div class='dropdown-message small'>There are $count computers detected! Install imonitor agent.</div></a>
    ";
    }

    $query2 = "SELECT coalesce(MAX(agent_version), 0) AS maxversion FROM logonscript.tbl_computer_details WHERE remarks not like 'Resigned'";
    foreach ($db->query($query2) as $row){
    $version = $row['maxversion'];
    }
    $query3 = "SELECT * FROM logonscript.tbl_computer_details WHERE agent_version != :version";
    $pdo = $db->prepare($query3);
    $pdo->bindParam(":version",$version);
    $pdo->execute();
    $result = $pdo->fetchAll();

    foreach ($result as $row) {
        $count2++;
    }

    if ($count2 != 0){
        $notif2 = "`<a class='dropdown-item' href='#' onClick='NOTIFimonitorupdate'><span class='text-warning'><strong>Agent Need Update</strong></span><span class='small float-right text-muted'>$time</span>
        <div class='dropdown-message small'>There are $count2 computers detected! Update imonitor agent. </div></a>
        ";
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
