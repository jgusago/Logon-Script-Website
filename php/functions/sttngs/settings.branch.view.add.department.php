<?php
session_start();

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$branch = $_POST['branch'];
$path = $_POST['path'];
$dept = $_POST['dept'];
$filter = $_POST['filter'];
$comp = $_POST['comp'];

$AddDepartment = "Add Department";
$userid2 = $_SESSION['userid'];

if ($branch == $path && $path !== "root"){
$length = 2;
$parent = $branch;
}
else if($path == "root"){
  $length = 1;
  $parent = $branch;
}
else{
$path = explode("/",$path);
$length = sizeof($path)+1;
$parent = $path[$length-2];
}
if ($parent == ''){
  $parent = 'root';
  $length = 1;
}
$existing = false;
$sql = "SELECT * FROM logonscript.tbl_tree WHERE tree_name LIKE '$dept' AND tree_parent LIKE '$parent'";
foreach ($db->query($sql) as $row) {
  $existing = true;
}
if($existing == false){
  $query = "INSERT INTO logonscript.tbl_tree (tree_name, tree_level, tree_parent, tree_filter, tree_computer_count) VALUES ('$dept', $length, '$parent', '$filter', '$comp')";
$db->query($query);
echo "true";

$sqlqurey = "INSERT INTO tbl_history ( transact_name, transact_details, user_id) VALUES ('$AddDepartment', 'Department: ".$dept." / Filter Department: ".$filter." / Computer Count: ".$comp."', '$userid2')";
($db->query($sqlqurey));

}
else{
  echo "Error Have Been Accured";
}
?>
