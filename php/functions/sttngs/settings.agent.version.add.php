<?php

$version = $_POST['version'];
$validation = $_POST['validation'];

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$query = "SELECT * FROM logonscript.tbl_agent_version WHERE version LIKE '$version'";
$count = 0;
foreach ($db->query($query) as $row) {
  $count++;
}

if($count == 0){
  $query = "INSERT INTO logonscript.tbl_agent_version (type, version) VALUES ('$validation', '$version')";
  if($db->query($query)){
    echo "success";
  }
  else{
    echo "Please input proper values and try again";
  }
}
else{
  echo "Version already exist, Please try Again";
}

?>
