<?php
header("Content-Type: application/json; charset=UTF-8");
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
require "{$_SERVER['DOCUMENT_ROOT']}/php/functions/session/session.check.php";

if($ssrole == "ADMINISTRATOR" || $ssrole == "SUPERADMIN"){
  $query = $conn->prepare("
  SELECT transact_date, transact_name, transact_details, user_id, user_name
  FROM logonscript.tbl_history
  ORDER BY history_id DESC
  ");
  $query->execute();
  $getresult = $query->get_result();
  $result = $getresult->fetch_all(MYSQLI_ASSOC);
  echo json_encode($result);
}
else{
  $query = $conn->prepare("
    SELECT transact_date, transact_name, transact_details, user_id, user_name
    FROM logonscript.tbl_history
    WHERE tbl_history.user_id = Any(select userid from tbl_user where department like ?)
    ORDER BY history_id DESC;");
    $query->execute();
    $getresult = $query->get_result();
    $result = $getresult->fetch_all(MYSQLI_ASSOC);
    echo json_encode($result);
}

mysqli_close($conn);
$db = null;
?>
