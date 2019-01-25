<?php
  header("Content-Type: application/json; charset=UTF-8");
  require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
  require "{$_SERVER['DOCUMENT_ROOT']}/php/functions/session/session.check.php";

$prepare = $conn->prepare("SELECT ns_name, ns_title, ns_msg, ns_msg_query, ns_class
                            FROM logonscript.tbl_notif_settings");
$prepare->execute();
$result = $prepare->get_result();
$notif = $result->fetch_all(MYSQLI_ASSOC);
$notification = array();
foreach ($notif as $nsrow) {
  $msg = $nsrow['ns_msg'];
  $name = $nsrow['ns_name'];
  $title = $nsrow['ns_title'];
  $nsquery = $nsrow['ns_msg_query'];
  $class = $nsrow['ns_class'];

  $querye = $conn->prepare($nsquery);
  $querye->execute();
  $result = $querye->get_result();
  $outp = $result->fetch_all();
  foreach ($outp as $row) {
    $msg = string_replace($row,$msg);
  }


}


echo json_encode($msg);
mysqli_close($conn);
$db = null;

function string_replace($replacements, $string){
    $string = explode("?",$string);
    $newstring = "";

    for($x = 0; $x < sizeof($string); $x++){
      $newstring = $newstring.$string[$x];
      if($x < sizeof($replacements)){
        $newstring = $newstring.$replacements[$x];
      }
    }

    return $newstring;
  }
//array_merge();
?>
