<?php
session_start();
date_default_timezone_set('Asia/Manila');
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
$role = $_SESSION["role"];
$department = $_SESSION["department"];
$count = 0;
$time = date("h:i a");
if ($role == "ADMINISTRATOR" || $role == "SUPER ADMIN"){

    $query = "SELECT * FROM logonscript.tbl_log WHERE connection_status not like 'ESTABLISHED'";
    foreach ($db->query($query) as $row){
        $count++;
    }

    echo "success`<a class='dropdown-item' href='#'><span class='text-danger'><strong>Disconnected iMonitor</strong></span><span class='small float-right text-muted'>$time</span>
    <div class='dropdown-message small'>There are $count that is not updated or not connected to the server</div></a>
    ";
}
elseif ($role == "STAFF"){
    $query = "SELECT * FROM logonscript.tbl_log WHERE connection_status not like 'ESTABLISHED' AND branch LIKE :branch";

}
else{
    //do nothing
}


?>