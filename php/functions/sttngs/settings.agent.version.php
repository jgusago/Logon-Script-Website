<?php

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

echo "Validation|Version";
$query = "SELECT * FROM logonscript.tbl_agent_version";
foreach ($db->query($query) as $row){
  $type = $row['type'];
  $version = $row['version'];

  echo "#$type|$version";
}

?>
