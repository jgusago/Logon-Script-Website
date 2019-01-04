<?php
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
$post = $_POST["currentval"];

session_start();
$id = $_SESSION["userid"];

if($post !== "null" && $post !== "" && $post !== null){

$query = "UPDATE logonscript.tbl_user SET position = '$post' WHERE userid = '$id'";
if($db->query($query)){

$query = "INSERT INTO logonscript.tbl_history (transact_name, transact_details, transact_date, user_id) VALUES ('User Position Update','position:$post', NOW(), '$id')";
$db->query($query);

echo "success";
unset($_SESSION['position']);
$_SESSION["position"] = $post;
}
else{
  echo "failed";
}
}




 ?>
