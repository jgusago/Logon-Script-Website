<?php
header("Content-Type: application/json; charset=UTF-8");
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
  $sql = file_get_contents("{$_SERVER['DOCUMENT_ROOT']}/sql/computer.list.sql");
  $newquery = http_build_query($sql);
  echo $newquery;
  $sql = "$sql";
  $query = $conn->prepare($newquery);
  $query->bind_param("s",2);
  $query->execute();
$result = $query->get_result();
$outp = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($outp);
mysqli_close($conn);
$db = null;

?>
