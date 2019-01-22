<?php
header("Content-Type: application/json; charset=UTF-8");
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
require "{$_SERVER['DOCUMENT_ROOT']}/php/functions/session/session.check.php";

$obj = json_decode($_POST["x"], false);
$changed = $obj->changed;
if($changed == true){
  $query = $conn->prepare("
    UPDATE logonscript.tbl_computer_details
    SET remarks = ?, agent_version = ?
    WHERE (hostname = ?);
  ");
  $query->bind_param("sis",$obj->remarks, $obj->agent, $obj->hostname);
$update = $query->execute();

$transactname = "Computer List Update";
}
else{
$transactname = "Computer List Checked";
$update = false;
}

$transaction = "Hostname: ".$obj->hostname.", Agent Version: ".$obj->agent." Remarks: ".$obj->remarks;

$query = $conn->prepare("
  INSERT INTO logonscript.tbl_history
    (transact_name, transact_details, user_id, user_name)
  VALUES
    (?, ?, ?, ?);
");
$query->bind_param("ssss",$transactname, $transaction, $ssid, $ssname);
$history = $query->execute();

mysqli_close($conn);
if((($changed==true && $update==true) || $changed==false && $update == false) && $history == true){
      $encode = true;
}
else{
    $encode = false;
}
$array = array(
  "changed"=>$changed,
  "update"=>$update,
  "history"=>$history,
  "encoded"=>$encode
);
echo json_encode($array);
?>
