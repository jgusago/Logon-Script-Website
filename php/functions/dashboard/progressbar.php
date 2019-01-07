<?php
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
$query = "SELECT COUNT(*) FROM logonscript.tbl_log";
$count = 0;
foreach ($db->query($query) as $row) {
  $total = $row["COUNT(*)"];
}

$query = "SELECT * FROM logonscript.tbl_tree WHERE tree_parent = 'root' ORDER BY tree_name ASC";
$count = 0;
foreach ($db->query($query) as $row) {
  $tname[$count] = $row["tree_name"];
  $tfilter[$count] = $row["tree_filter"];
  $comp[$count] = $row["tree_computer_count"];
  $count++;
}

$colon = "";
for($i = 0; $i < $count; $i++){
  $query = "SELECT COUNT(*) FROM logonscript.tbl_log WHERE hostname LIKE '$tfilter[$i]%'";
  foreach ($db->query($query) as $row) {
    $result = $row["COUNT(*)"];
    if($comp[$i] == 0){
      $divident = 1;
    }
    else{
      $divident = $comp[$i];
    }
    $percentage = ($result/$divident)*100;
    $whole = explode(".",$percentage);
    if($whole[0] <= 10){
      $color = "danger";
    }
    else if($whole[0] <= 80 && $whole >= 11){
      $color = "warning";
    }
    else if($whole[0] <= 100 && $whole >= 81){
      $color = "success";
    }
    else{
      $color = "primary";
      $whole[0] = 100;
    }
    echo "$colon$tname[$i]|$result out of $comp[$i]|$whole[0]|$color";
    $colon = ";";
  }
}

$db = null;
 ?>
