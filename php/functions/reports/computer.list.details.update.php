<?php
header("Content-Type: application/json; charset=UTF-8");
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$obj = json_decode($_POST["x"], false);

if(($obj->changed) == true){
  $query = $conn->prepare("
    UPDATE logonscript.tbl_computer_details
    SET remarks = ?, agent_version = ?
    WHERE (hostname = ?);
  ");
  $query->bind_param("sis",$obj->remarks, $obj->agent, $obj->hostname);
//   $query->execute();
// $result = $query->get_result();
// $outp = $result->fetch_all(MYSQLI_ASSOC);
//
$result = $query->execute();
}

echo json_encode($result);

mysqli_close($conn);
?>
