<?php
 session_start();
 require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
 
	$search = $_GET['term'];
	$stmt = $db->prepare("SELECT user FROM `tbl_log` WHERE `user` LIKE '%$search%' ORDER BY `user` ASC");
    $stmt->execute(array());
    $row_count = $stmt->rowCount();

	if($rows > 0){
		while($row=$stmt->fetch(PDO::FETCH_ASSOC)) {
			$data['value'] = $fetch['user']; 
			array_push($stmt, $data);
		}
	}
	
	echo json_encode($stmt);
?>