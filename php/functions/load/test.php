<?php

session_start();
$department = $_POST['department'];
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$rows = array();
if(isset($_GET['branch_name'])) {
    $stmt = $pdo->prepare("select DISTINCT branch_name from tbl_department ORDER BY branch_name ASC");
    $stmt->execute(array($_GET['branch_name']));
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
}
echo json_encode($rows);
?>