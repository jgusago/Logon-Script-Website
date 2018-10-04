<?php

echo "lol";

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
$branch = 226;

$query = "SELECT * FROM logonscript.tbl_log WHERE log_no = :logno";

$stmt = $db->prepare($query);
$stmt->bindParam(":logno",$branch);
$stmt->execute();
$rowcount = $stmt->rowCount();
$result = $stmt->fetchAll();

foreach($result as $row){
  echo $date = $row['ip_date_modified'];
  echo "<br>";
  $date2 = DateTime::createFromFormat('d-M-Y', $date);
  $date2->format('Y-m-d');
  echo $date2;
}


?>