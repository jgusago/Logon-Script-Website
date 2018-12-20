<?php
// $value = $_POST['value'];
$value = "OM";

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$query = "SELECT * FROM logonscript.tbl_tree WHERE tree_name == $value";

$foreach($db->query($query) as $row){

  $name = $row['tree_name'];
  $filter = $row['tree_filter'];

}
echo "$filter";

?>
