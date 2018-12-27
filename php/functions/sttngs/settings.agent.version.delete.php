<?php

$version = $_POST['version'];
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$query = "DELETE FROM logonscript.tbl_agent_version WHERE version = '$version'";
if($db->query($query)){
  echo "success";
}
else{
  echo "Error have been aquired, Please try again.";
}




 ?>
