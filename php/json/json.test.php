<?php
header("Content-Type: application/json; charset=UTF-8");
//$obj = json_decode($_GET["x"], false);

$conn = new mysqli("172.16.31.39:3306", "administrator", "Agsmc999", "logonscript");
$stmt = $conn->prepare("SELECT * FROM logonscript.tbl_log");
// $stmt->bind_param("ss", $obj->table, $obj->limit);
$stmt->execute();
$result = $stmt->get_result();
$outp = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($outp);
?>
