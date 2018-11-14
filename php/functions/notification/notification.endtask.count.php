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
    $notif1 = "<a class='dropdown-item' href='#'><span class='text-danger'><strong>Disconnected iMonitor</strong></span><span class='small float-right text-muted'>$time</span>
    <div class='dropdown-message small'>There are $count that is not updated or not connected to the server</div></a>
    ";
    }

    $query2 = "SELECT MAX(agent_version) AS maxversion FROM logonscript.tbl_computer_details WHERE agent_version not like ''and agent_version not like null and remarks not like 'Resigned'";
    foreach ($db->query($query2) as $row){
    $version = $row['maxversion'];
    }
    $query3 = "SELECT * FROM logonscript.tbl_computer_details WHERE agent_version not like ':version'";
    $pdo = $db->prepare($query3);
    $pdo->bindParam(":version",$version);
    $pdo->execute();
    $result = $pdo->fetchAll();

    foreach ($result as $row) {
        $count2++;
    }

    if ($count2 != 0){
        $notif2 = "`<a class='dropdown-item' href='#'><span class='text-warning'><strong>Agent Need Update</strong></span><span class='small float-right text-muted'>$time</span>
        <div class='dropdown-message small'>$version!! There are $count2 computers that need to be confirmed</div></a>
        ";
        }

    //notif number
    if($count == 0 && $count2 == 0){
        echo "0`<a class='dropdown-item' href='#'>
        <div class='dropdown-message small'>There are no notification</div></a>";
    }
    elseif($count !== 0 or $count2 !== 0){
        echo $notif1.$notif2;
    }

}

else{
    //do nothing
}
$pdo = null;

?>
