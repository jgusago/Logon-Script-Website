<?php
header("Content-Type: application/json; charset=UTF-8");
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
require "{$_SERVER['DOCUMENT_ROOT']}/php/functions/session/session.check.php";
$success = true;
$obj = json_decode($_POST["x"], true);
for ($x = 0; $x < count($obj); $x++) {

  $query = $conn->prepare("DELETE FROM logonscript.tbl_employee WHERE (emp_id = ?)");
  $query->bind_param("s",$obj[$x]["id"]);
  if($query->execute()){
    $success = $success*true;
  }
  else{
    $success = $success * false;
  }
}
$arrayName = array('success' => $success);
echo json_encode($arrayName);
mysqli_close($conn);
$db = null;
?>
