<?php
	session_start();
	
	require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
  
	$un=$_POST['username'];
    $pw=md5($_POST['password']);

    $stmt = $db->prepare("SELECT * from tbl_user WHERE username=? AND password=?");
    $stmt->execute(array($un, $pw));
    $row_count = $stmt->rowCount();

    if ($row_count > 0) {
    $_SESSION["username"]=$un;
        header("Location: ../../iMonitoring_Website/admin_dashboard.php");
    }

    else {
        header("Location: ../../iMonitoring_Website/index.php?msg=wrong");
    }
?>
                                     
                                     