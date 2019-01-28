<?php
header("Content-Type: application/json; charset=UTF-8");
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
require "{$_SERVER['DOCUMENT_ROOT']}/php/functions/session/session.check.php";

  $query = $conn->prepare("
  SELECT * FROM logonscript.tbl_employee
  ");
  $query->execute();
  $getresult = $query->get_result();
  $result = $getresult->fetch_all(MYSQLI_ASSOC);
  echo json_encode($result);

mysqli_close($conn);
$db = null;
?>


