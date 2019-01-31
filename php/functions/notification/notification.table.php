<?php
header("Content-Type: application/json; charset=UTF-8");
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
require "{$_SERVER['DOCUMENT_ROOT']}/php/functions/session/session.check.php";
require "{$_SERVER['DOCUMENT_ROOT']}/php/functions/load/string.replace.php";

$obj = json_decode($_POST["x"], false);
$query = $conn->prepare("SELECT n_title, n_role, n_dept, n_t_header, n_t_query, n_t_data
                            FROM logonscript.tbl_notif
                            WHERE n_id = ?");
$query->bind_param("s",$obj->id);
$query->execute();
$qrr = $query->get_result();
$result = $qrr->fetch_all(MYSQLI_ASSOC);

foreach ($result as $row) {
  $title = $row['n_title'];
  $role = $row['n_role'];
  $dept = $row['n_dept'];
  $header = $row['n_t_header'];
  $newquery = $row['n_t_query'];
  $data = $row['n_t_data'];

  if($ssrole == $role){
    if($ssdepartment == $dept || $dept == "*"){
      $qq = $conn->prepare($newquery);
      $qq->execute();
      $rr = $qq->get_result();
      $oo = $rr->fetch_all();
      $hd = json_decode($header);
      array_push($hd, $oo);
      echo json_encode($hd);
    }
    else{
      //do nothing
    }
  }
  else{
    //do nothing
  }

}

mysqli_close($conn);
$db = null;
?>
