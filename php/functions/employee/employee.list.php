<?php

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$sql = "SELECT * FROM logonscript.tbl_employee";
echo "|Employee ID|Name|Login ID|Department|Sub Department|Action";
foreach ($db->query($sql) as $row) {

  $id = $row['emp_id'];
  $name = $row['emp_name'];
  $login = $row['emp_login'];
  $login2 = $row['emp_login2'];
  $dept = $row['dept'];
  $subdept = $row['sub_dept'];

  echo "#input`form-check-label~checkemployee`value:$id~type:checkbox~onchange:empcheck(\"$id\")~id:$id`|$id|$name|$login~$login2|$dept|$subdept|input`btn~btn-primary`type:button~value:Edit~onClick:editemployee()`Edit";
}

$db = null;
?>
;
