<?php

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$sql = "SELECT * FROM logonscript.tbl_employee";
echo "Employee ID|Name|Login ID|Second Login|Sub Department";
foreach ($db->query($sql) as $row) {

  $id = $row['emp_id'];
  $name = $row['emp_name'];
  $login = $row['emp_login'];
  $login2 = $row['emp_login2'];
  // $dept = $row['dept'];
  $subdept = $row['sub_dept'];

  echo "#$id|$name|$login|$login2|$subdept";
}

?>
