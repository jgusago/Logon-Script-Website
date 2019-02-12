<?php
header("Content-Type: application/json; charset=UTF-8");
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
require "{$_SERVER['DOCUMENT_ROOT']}/php/functions/session/session.check.php";

$obj = json_decode($_POST["x"], false);
$query = $conn->prepare("SELECT tree_name FROM logonscript.tbl_tree where tree_parent like ? ORDER BY tree_name");
$query->bind_param("s",$obj->department);
$query->execute();
$result = $query->get_result();
$output = $result->fetch_all();
$query->close();

echo json_encode($output);
mysqli_close($conn);
$db = null;
?>
