<?php
	session_start();
	//include("../config/db_connection.php");
	require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
  
		$un = $_POST['username'];
		$pw = $_POST['password'];
		$stmt = $db->prepare("SELECT * from tbl_user WHERE username=? AND password=?");
		$stmt->execute(array($un, $pw));
		$row_count = $stmt->rowCount();
			if($row_count >0)
			{
				$_SESSION['username'] = $un;
				header("Location: admin_viewing.php");
			}
			else
			{
				header("Location: login.php?msg=wrong");
			}
?>
                                     
                                     