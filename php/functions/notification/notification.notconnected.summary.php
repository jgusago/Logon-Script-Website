<?php

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

session_start();
if ($_SESSION['role'] != "STAFF"){
    $sql = "SELECT * FROM logonscript.tbl_log WHERE connection_status not like 'ESTABLISHED' or iMonitor_Status not like 'running'";
}
else{
    $dept = $_SESSION['department'];
    $query = "SELECT tree_filter FROM logonscript.tbl_tree WHERE tree_name LIKE '$dept'";
    foreach ($db->query($query) as $row){
        
    }
    if(isset($row['tree_filter'])){
        $filter = $row['tree_filter'];
    }
    else{
        $filter = "123123123123";
    }
    echo "$filter<br>";

    $sql = "SELECT * FROM logonscript.tbl_log WHERE hostname LIKE '%$filter%' AND connection_status not like 'ESTABLISHED' or iMonitor_Status not like 'running'";
}
echo $sql."<br>";
    foreach ($db->query($sql) as $row){
        $hostname = $row['hostname'];
        echo "$hostname<br>";
    }

    echo $_SESSION['role'];
?>