<?php
header("Content-Type: application/json; charset=UTF-8");
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
require "{$_SERVER['DOCUMENT_ROOT']}/php/functions/session/session.check.php";

$obj = json_decode($_POST["x"], false);

$query = $conn->prepare("UPDATE tbl_user SET name = ?, department = ?, position = ?, role = ?, status = ? WHERE (userid = ?);");
$query->bind_param("sssssi",
                  $obj->name,
                  $obj->dept,
                  $obj->post,
                  $obj->role,
                  $obj->stat,
                  $obj->id);
$query->execute();
  if($query->execute()){
    $query->execute();
    $return = array('insertion' => "success");
  }
  else{
      $return = array('insertion' => "failed" );
  }

echo json_encode($return);

$query->close();
mysqli_close($conn);
$db = null;
?>
