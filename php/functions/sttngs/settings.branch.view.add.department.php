<?php

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$branch = $_POST['branch'];
$path = $_POST['path'];
$dept = $_POST['dept'];
$filter = $_POST['filter'];

if ($branch == $path){
$length = 2;
$parent = $branch;
}
else{
$path = explode("/",$path);
$length = sizeof($path)+1;
$parent = $path[$length-2];
}
$existing = false;
$sql = "SELECT * FROM logonscript.tbl_tree WHERE tree_name LIKE '$dept' AND tree_parent LIKE '$parent'";
foreach ($db->query($sql) as $row) {
  $existing = true;
}
if($existing == false){
$query = "INSERT INTO logonscript.tbl_tree (tree_name, tree_level, tree_parent, tree_filter) VALUES ('$dept', $length, '$parent', '$filter')";
$db->query($query);
echo "true";
}
else{
  echo "Error Have Been Accured";
}
?>
