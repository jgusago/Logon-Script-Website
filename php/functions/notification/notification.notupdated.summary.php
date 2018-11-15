<?php
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

?>