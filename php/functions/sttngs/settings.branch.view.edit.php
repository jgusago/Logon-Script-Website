<?php
$newname = $_POST['newname'];
$newfilter = $_POST['newfilter'];
$id = $_POST['id'];

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$query1 = "SELECT tree_name FROM logonscript.tbl_tree WHERE tree_id = $id";
foreach ($db->query($query1) as $row) {
  $name = $row['tree_name'];
}

$query2 = "UPDATE logonscript.tbl_tree SET tree_parent = '$newname' WHERE tree_parent LIKE '$name'";
if ($db->query($query2)) {
}
else{
}


$query = "UPDATE logonscript.tbl_tree SET tree_name = '$newname', tree_filter = '$newfilter' WHERE tree_id = $id";

  if ($db->query($query)) {
    echo "true";
  }
  else{
    echo "false";
  }

?>
