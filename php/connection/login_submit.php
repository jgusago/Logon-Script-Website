<?php
	session_start();
	
	require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
  
	$un = $_POST['username'];
	$pw = $_POST['password'];
	
    //$stmt = $db->prepare("SELECT * from tbl_user WHERE username=? AND password=?");
	//$stmt->execute(array($un, $pw));
    //$row_count = $stmt->rowCount();
    $sql = "SELECT * FROM `tbl_user` WHERE username = ?", array($_REQUEST['username']));
    ($db->query($sql));

    if($un)
{
    // If the password they give maches
    if($un->pass === sha1($un->salt. $_REQUEST['password']))
    {
        echo "login success";
    }
    else
    {
        echo "wrong password";
    }
}

  
    //if($row_count >0)
        //{
            //$_SESSION['username'] = $un;
            //header("Location: ../../HTMLs/admin_viewing.php");
        //}
    //else
        //{ 
            //header("Location: ../../HTMLs/login.php?msg=wrong");
        //}
?>
                                     
                                     