<?php
$newname = $_POST['newname'];
$newfilter = $_POST['newfilter'];
$id = $_POST['id'];

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$query1 = "SELECT * FROM logonscript.tbl_tree WHERE tree_id = $id";
foreach ($db->query($sql) as $row) {
  
}

$query = "UPDATE logonscript.tbl_tree SET tree_name = '$newname', tree_filter = '$newfilter' WHERE tree_id = $id";

  if ($db->query($query)) {
    echo "true";
  }
  else{
    echo "false";
  }

?>
