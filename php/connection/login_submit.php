<?php
	session_start();
	
	require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
  
	$un = $_POST['username'];
	$pw = $_POST['password'];
	//echo "$hash";
	$stmt = $db->prepare("SELECT * from sys_users WHERE username=? AND password=?");
	$stmt->execute(array($un, $pw));
	$row_count = $stmt->rowCount();

	//if (password_verify($pw, $hash)) {
    //$_SESSION['username'] = $un;
    //header("Location: main.php");
	//}

    if($row_count >0)
        {
            $_SESSION['username'] = $un;
            header("Location: ../../HTMLs/admin_viewing.php");
        }
    else
        { 
            header("Location: ../../HTMLs/login.php?msg=wrong");
        }
?>
                                     
                                     