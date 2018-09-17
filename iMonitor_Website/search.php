<?php
 session_start();
 require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
 
    $search = strtolower($_GET["q"]);
    if (!$search) return;
	$stmt = $db->prepare("SELECT DISTINCT user FROM `tbl_log` WHERE `user` LIKE '%$search%' ORDER BY `user` ASC");
    $stmt->execute(array());
    $row_count = $stmt->rowCount();
    while($row=$stmt->fetch(PDO::FETCH_ASSOC)) {
        $user = $row['user'];
        echo "$user\n";
    }
?>