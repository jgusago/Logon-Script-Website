<?php
session_start();

$empid = $_POST['empid'];
$name = $_POST['name'];
$l1 = $_POST['l1'];
$l2 = $_POST['l2'];
$dept = $_POST['dept'];
$subdept = $_POST['subdept'];
$AddEmployee = "Add Employee";
$userid2 = $_SESSION['userid'];
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

$sqlqurey = "INSERT INTO tbl_history (transact_name, transact_details, transact_date, user_id)
VALUES ('$AddEmployee' | 'Employee ID: ".$empid." | Name: ".$name." | Login1: ".$l1." |  Login2:".$l2." | Department: ".$dept." | Sub-Department: ".$subdept."', |  NOW() | '$userid2')";
($db->query($sqlqurey));

echo "success";

}
else{
    echo "Your Employee ID, or Login have been already used, please try again";
}


 ?>
