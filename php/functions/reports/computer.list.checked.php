<?php
//hostname:hostname,version:version,remarks:remarks,date:today

$hostname = $_POST["hostname"];
$version = $_POST["version"];
$remarks = $_POST["remarks"];

session_start();
$id = $_SESSION["userid"];
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$query = "INSERT logonscript.tbl_history (transact_name, transact_details, transact_date, user_id) VALUES ('Computer List Checked', 'Hostname: $hostname | Agent Version: $version | Remarks: $remarks',NOW() | '$id')";
if($db->query($query)){
  echo "success|";
  $query = "SELECT transact_date FROM logonscript.tbl_history WHERE transact_name = 'Computer List Checked' and transact_details like '%hostname:$hostname%' order by transact_date desc Limit 2";
  $count = 0;
  foreach ($db->query($query)as $row) {
    $history[$count] = "";
    $history[$count] = $row["transact_date"];
    $datea = date_create($history[$count]);
    $date[$count] = date_format($datea, 'M d, Y');
    $count++;
  }
  if(isset($history[0])){
    echo $date[0];
    if(isset($history[1])){
      echo "<br>".$date[1];
    }
  }
}
else{
  echo "Error have been aquired";
}


$db = null;
 ?>
