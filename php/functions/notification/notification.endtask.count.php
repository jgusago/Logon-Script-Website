<?php
session_start();
date_default_timezone_set('Asia/Manila');
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
$role = $_SESSION["role"];
$department = $_SESSION["department"];
$count = 0;
$count2 = 0;
$time = date("h:i a");
if ($role == "ADMINISTRATOR" || $role == "SUPER ADMIN"){

    $query = "SELECT * FROM logonscript.tbl_log WHERE connection_status not like 'ESTABLISHED'";
    foreach ($db->query($query) as $row){
        $count++;
    }
    if ($count != 0){
    echo "success`<a class='dropdown-item' href='#'><span class='text-danger'><strong>Disconnected iMonitor</strong></span><span class='small float-right text-muted'>$time</span>
    <div class='dropdown-message small'>There are $count that is not updated or not connected to the server</div></a>
    ";
    }
    else{
        // do nothing
    }
    $query2 = "SELECT MAX(agent_version) AS maxversion FROM logonscript.tbl_computer_details WHERE remarks LIKE 'Active'";
    foreach ($db->query($query2) as $row){
    $version = $row['maxversion'];
    }
    $query3 = "SELECT * FROM logonscript.tbl_computer_details WHERE agent_version like ':version' AND remarks Like 'Active' or remarks LIKE '' or remarks = null";
    $pdo = $db -> prepare($query2);
    $pdo->bindParam(":version",$version);
    $pdo->execute();
    $result = $pdo->fetchAll();

    foreach ($result as $row) {
        $count++;
    }
    if ($count2 != 0){
        echo "<a class='dropdown-item' href='#'><span class='text-warning'><strong>Agent Need Update</strong></span><span class='small float-right text-muted'>$time</span>
        <div class='dropdown-message small'>There are $count2 computers that need to be confirmed</div></a>
        ";
        }

}
elseif ($role == "STAFF"){
    $query = "SELECT * FROM logonscript.tbl_log WHERE connection_status not like 'ESTABLISHED' AND branch LIKE :branch";

}
else{
    //do nothing
}


?>