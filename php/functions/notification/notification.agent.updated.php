<?php
$remarks = $_POST['remarks'];
$version = $_POST['agentversion'];
$hostname = $_POST['hostname'];
$id = $_POST['id'];
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$query = "UPDATE logonscript.tbl_computer_details SET remarks = '$remarks', agent_version = '$version' WHERE hostname like '$hostname'";
if($db->query($query)){
  $query = "SELECT version FROM logonscript.tbl_agent_version WHERE version = '$version' AND type = 'valid'";
  $count = 0;
  foreach ($db->query($query) as $row) {
    $count++;
  }
  if($count > 0){
    echo "success";
  }
  else{
    echo "invalid";
  }
}
else{
  echo "Error have been aquired";
}

$query = null;
?>
