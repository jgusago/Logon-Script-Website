<?php

$tree_id = $_POST['tree_id'];

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$query = "SELECT * FROM logonscript.tbl_tree WHERE tree_id = $tree_id";
foreach ($db->query($query1) as $row) {
  $tree_name = $row['tree_name'];
}




?>
