<?php
$remarks = $_POST['remarks'];
$version = $_POST['agentversion'];
$hostname = $_POST['hostname'];
$id = $_POST['id'];
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$query = "UPDATE logonscript.tbl_computer_details SET remarks = '$remarks', agent_version = '$version' WHERE hostname like '$hostname'";
if($db->query($query)){
  echo "success";
}
else{
  echo "Error have been aquired";
}
$query = null;
?>
