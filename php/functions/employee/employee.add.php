<?php
header("Content-Type: application/json; charset=UTF-8");
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$obj = json_decode($_POST["x"], false);

if($obj->add == false){
  $string = "UPDATE logonscript.tbl_employee SET emp_id = ?, emp_name = ?, emp_login = ?, emp_login2 = ?, dept = ?, sub_dept = ? WHERE (emp_id = ?)";
  $query = $conn->prepare($string);
  $query->bind_param("sssssss",$obj->id, $obj->name, $obj->log1, $obj->log2, $obj->dept, $obj->subd, $obj->did);
}
else{
  $string = "INSERT INTO logonscript.tbl_employee (emp_id, emp_name, emp_login, emp_login2, dept, sub_dept) VALUES (?, ?, ?, ?, ?, ?);";
  $query = $conn->prepare($string);
  $query->bind_param("ssssss",$obj->id, $obj->name, $obj->log1, $obj->log2, $obj->dept, $obj->subd);
}

if($query->execute()){
  $outp = array('success' => 'success');
  echo json_encode($outp);
}
else{
  $outp = array('success' => 'failed');
  echo json_encode($outp);
}

mysqli_close($conn);
$db = null;
?>
