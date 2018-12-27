<?php
$empid = $_POST['empid'];
$name = $_POST['name'];
$l1 = $_POST['l1'];
$l2 = $_POST['l2'];
$dept = $_POST['dept'];
$subdept = $_POST['subdept'];
$count = 0;

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$query = "SELECT * FROM logonscript.tbl_employee WHERE emp_id = '$empid' or emp_login like '$l1' or emp_login like '$l2' or emp_login like '$l1' or emp_login like '$l2'";

foreach ($db->query($query) as $row) {
  $count++;
}

if ($count == 0){

$insert = "INSERT INTO logonscript.tbl_employee (emp_id, emp_name, emp_login, emp_login2, dept, sub_dept)
VALUES ('$empid', '$name', '$l1', '$l2', '$dept', '$subdept')";
$db->query($insert);
echo "success";

}
else{
    echo "Your Employee ID, or Login have been already used, please try again";
}


 ?>
