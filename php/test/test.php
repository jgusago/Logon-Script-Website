<?php

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$query = "SELECT * FROM logonscript.tbl_log WHERE log_no = :logno";

$stmt = $db->prepare($query);
$stmt->bindParam(":logno",$branch);
$stmt->execute();
$rowcount = $stmt->rowCount();
$result = $stmt->fetchAll();

foreach($result as $row){
  echo $date = $row['ip_date_modified'];

  $newdate = date_create($date);

  $newdate2 = date_format($newdate, "Y-m-d");

  echo $newdate2;
  echo "waweawea";
}
?>