<?php
session_start();

$version = $_POST['version'];
$userid2 = $_SESSION['userid'];
$users = $_SESSION['name'];

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$query = "DELETE FROM logonscript.tbl_agent_version WHERE version = '$version'";
if($db->query($query))
{
  $query2 = "INSERT INTO tbl_history (transact_date, transact_name, transact_details, user_id) VALUES (NOW(), 'Agent Version Deleted', 'Agent Version: ".$version."', '$userid2 / $users')";
  ($db->query($query2));

  echo "success";

}
else
{
  echo "Error have been aquired, Please try again.";
}




 ?>
