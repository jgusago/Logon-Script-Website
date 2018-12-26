<?php

$tree_id = $_POST['tree_id'];
// DELETE FROM `logonscript`.`tbl_tree` WHERE `tree_id`='29';
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$query = "SELECT * FROM logonscript.tbl_tree WHERE tree_id = $tree_id";
foreach ($db->query($query) as $row) {
  $tree_name = $row['tree_name'];
}

deletechild($tree_id, $tree_name);
$delete = "DELETE FROM logonscript.tbl_tree WHERE tree_id = $tree_id";
if ($db->query($delete)) {
}

function deletechild($tree_id, $tree_name){

  require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
  $query1 = "SELECT * FROM logonscript.tbl_tree WHERE tree_parent like '$tree_name' or tree_parent = $tree_id";
  foreach ($db->query($query1) as $row) {
  $child_tree_id = $row['tree_id'];
  $child_tree_name = $row['tree_name'];

    deletechild($child_tree_id, $child_tree_name);
    $delete = "DELETE FROM logonscript.tbl_tree WHERE tree_id = $child_tree_id";
    if ($db->query($delete)) {
    }
  }
}

echo "success";
?>
