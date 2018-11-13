<?php
session_start();
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
$role = $_SESSION["role"];
$department = $_SESSION["department"];
$count = 0;
if ($role == "ADMINISTRATOR" || $role == "SUPER ADMIN"){

    $query = "SELECT * FROM logonscript.tbl_log WHERE connection_status not like 'ESTABLISHED'";
    foreach ($db->query($query) as $row){
        $count++;
    }
}
elseif ($role == "STAFF"){
    $query = "SELECT * FROM logonscript.tbl_log WHERE connection_status not like 'ESTABLISHED' AND branch LIKE :branch";

}
else{
    //do nothing
}


?>