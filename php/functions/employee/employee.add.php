<?php

//id:id,name:name,l1:l1,l2:l2,dept:dept,subdept:subdept

$id = $_POST('id');
$name = $_POST('name');
$l1 = $_POST('l1');
$l2 = $_POST('l2');
$dept = $_POST('dept');
$dept = $_POST('subdept');
$count = 0;

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$query = "SELECT * FROM logonscript.tbl_employee WHERE emp_id like '$id' or emp_login like '$l1' or emp_login like '$l2' or emp_login like '$l1' or emp_login like '$l2'";

foreach ($db->query($query) as $row) {
  $count++;
}

if ($count == 0){

$insert = "INSERT INTO logonscript.tbl_employee (emp_id, emp_name, emp_login, emp_login2, dept, sub_dept) VALUES ('$id', '$name', '$l1', '$l2', '$dept', '$subdept')"

if($db->query($query)){
echo "true";
}
else{
  echo "Your Employee ID, or Login have been already used, please try again";
}

}
else{
    echo "Your Employee ID, or Login have been already used, please try again";
}

 ?>
