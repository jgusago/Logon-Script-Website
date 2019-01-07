<?php
session_start();
$newname = $_POST['newname'];
$newfilter = $_POST['newfilter'];
$id = $_POST['id'];
$comp = $_POST['newpcno'];
$xxx = false;

$EditTreeParent = "Edit Tree Parent";
$EditTreeName = "Edit Tree Name";
$userid2 = $_SESSION['userid'];

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$query1 = "SELECT tree_name FROM logonscript.tbl_tree WHERE tree_id = $id";
foreach ($db->query($query1) as $row) {
  $name = $row['tree_name'];
}

$query2 = "UPDATE logonscript.tbl_tree SET tree_parent = '$newname' WHERE tree_parent LIKE '$name'";
if ($db->query($query2)) {

  $sqlqurey = "INSERT INTO tbl_history (transact_name, transact_details, user_id)
  VALUES ('$EditTreeParent', 'Tree Parent:".$newname.", Tree Filter:".$newfilter.", Computer Count: ".$comp."', '$userid2')";
  ($db->query($sqlqurey));
  $xxx = true;
}
else{
}

$query = "UPDATE logonscript.tbl_tree SET tree_name = '$newname', tree_filter = '$newfilter',tree_computer_count = '$comp'  WHERE tree_id = $id";

  if ($db->query($query)) {
    if($xxx != true)
    {
      $sqlqurey2 = "INSERT INTO tbl_history (transact_name, transact_details, user_id)

      VALUES ('$EditTreeName', 'Tree Name:".$newname.", Tree Filter:".$newfilter.", Computer Count: ".$comp."', '$userid2')";
      ($db->query($sqlqurey2));
    }
    echo "true";
  }
  else{
    echo "false";
  }

?>
