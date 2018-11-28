<?php

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
$branch = "6789(MK)";
//$branch = $_POST['branch'];
echo $branch."<br>";
$query = "SELECT * FROM logonscript.tbl_tree WHERE tree_parent LIKE '$branch'";
foreach ($db->query($query) as $row) {
  $path = "";
  $tree_name = $row['tree_name'];
  echo $path = $branch."/".$tree_name;
  echo "<br>";
  children($tree_name, $path);
}

function children($branch, $path){

  require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

  $query = "SELECT * FROM logonscript.tbl_tree WHERE tree_parent LIKE '$branch'";
  foreach ($db->query($query) as $row) {
    $tree_name = $row['tree_name'];
    echo $newpath = $path."/".$tree_name;
    echo "<br>";
    children($tree_name, $newpath);
  }
}

?>
