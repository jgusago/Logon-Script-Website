<?php

$version = $_POST['version'];
$userid2 = $_SESSION['userid'];
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$query = "DELETE FROM logonscript.tbl_agent_version WHERE version = '$version'";
if($db->query($query))
{
  echo "success";

  $query2 = "INSERT INTO tbl_history (transact_name, transact_details, transact_date, user_id) VALUES ('Agent Version Deleted', 'Agent Version: ".$version."', NOW(), '$userid2')";
  ($db->query($query2));

}
else
{
  echo "Error have been aquired, Please try again.";
}




 ?>
