<?php
  header("Content-Type: application/json; charset=UTF-8");
  require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
  require "{$_SERVER['DOCUMENT_ROOT']}/php/functions/session/session.check.php";
  require "{$_SERVER['DOCUMENT_ROOT']}/php/functions/load/string.replace.php";

$prepare = $conn->prepare("SELECT n_id, n_title, n_class, n_msg, n_query, n_role, n_dept FROM logonscript.tbl_notif");
$prepare->execute();
$result = $prepare->get_result();
$notif = $result->fetch_all(MYSQLI_ASSOC);
$notification = array();
foreach ($notif as $nrow) {
  $id = $nrow['n_id'];
  $title = $nrow['n_title'];
  $class = $nrow['n_class'];
  $msg = $nrow['n_msg'];
  $query = $nrow['n_query'];
  $role = $nrow['n_role'];
  $dept = $nrow['n_dept'];

  if($role == "ADMINISTRATOR" || $role=="SUPER ADMIN"){
    $msgquery = $conn->prepare($query);
    $msgquery->execute();
    $msgresult = $msgquery->get_result();
    $msgoutput = $msgresult->fetch_all();

      foreach ($msgoutput as $msgrow) {
        $msg = string_replace($msgrow,$msg);
      }
  }
  elseif ($role == "IT STAFF") {

    // code...
  }
  else{
    // do nothing...
  }

$notif = array(
  "id" => $id,
  "title" => $title,
  "class" => $class,
  "msg" => $msg
);


array_push($notification, $notif);
}
echo json_encode($notification);

mysqli_close($conn);
$db = null;
?>
