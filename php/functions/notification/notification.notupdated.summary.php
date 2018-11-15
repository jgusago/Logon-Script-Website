<?php
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
$query =  "SELECT * FROM logonscript.tbl_agent_version WHERE type like 'valid'";
$count = 0;
$newquery = "";
foreach ($db->query($query) as $row){
    $version = $row['version'];
    if ($count !== 0){
        $newquery = $newquery." or agent_version != $version";
    }
    else{
        $newquery = "agent_version != $version";
    }
    $count++;
}


echo $count." ".$version." ".$newquery;


$query3 = "SELECT * FROM logonscript.tbl_computer_details WHERE $newquery";
$pdo = $db->prepare($query3);
$pdo->bindParam(":version",$version);
$pdo->execute();
$result = $pdo->fetchAll();

foreach ($result as $row) {
    $hostname = $row['hostname'];
    $aversion = $row['agent_version'];
    echo "<br>$hostname $aversion";
}
?>