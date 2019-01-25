<?php
header("Content-Type: application/json; charset=UTF-8");
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
require "{$_SERVER['DOCUMENT_ROOT']}/php/functions/session/session.check.php";

if($ssrole == "ADMINISTRATOR")
{
  $query = $conn->prepare("
  SELECT userid, name, department, position, role, status
  FROM logonscript.tbl_user WHERE role<>'SUPER ADMIN'
  ");
  $query->execute();
  $getresult = $query->get_result();
  $result = $getresult->fetch_all(MYSQLI_ASSOC);
  echo json_encode($result);
}
else
{
  $query = $conn->prepare("
  SELECT userid, name, department, position, role, status
  FROM logonscript.tbl_user");
    $query->execute();
    $getresult = $query->get_result();
    $result = $getresult->fetch_all(MYSQLI_ASSOC);
    echo json_encode($result);
}

mysqli_close($conn);
$db = null;
?>

