<?php
header("Content-Type: application/json; charset=UTF-8");
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
require "{$_SERVER['DOCUMENT_ROOT']}/php/functions/session/session.check.php";
$success = true;
$obj = json_decode($_POST["x"], true);
for ($x = 0; $x < count($obj["id"]); $x++) {

  $query = $conn->prepare("UPDATE logonscript.tbl_employee SET dept = ?, sub_dept = ? WHERE (emp_id = ?)");
  $query->bind_param("sss",$obj["department"],$obj["subdepertment"],$obj["id"][$x]);
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
