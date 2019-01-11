<?php
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
$employee = $_POST["element"];
$or = "";
$array = "";
for($i = 0; $i < count($employee); $i++){
    $array = $array.$or.$employee[$i];
  $or = ",";
}

$query = "DELETE FROM logonscript.tbl_employee WHERE emp_id IN ($array)";
if($db->query($query)){
  echo "success";
}
else{
  echo "failed";
}


?>
