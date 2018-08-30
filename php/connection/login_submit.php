<?php
session_start();
include("connection.php");
  
       if (isset($_POST['username']))
		{
			$username = mysqli_real_escape_string($con, $_POST['username']);
			$password = mysqli_real_escape_string($con, $_POST['pass']);
			
			$query 		= mysqli_query($con, "SELECT * FROM tbl_user WHERE  username='$username' and pass='$password'");
			$row		= mysqli_fetch_array($query);
			$num_row 	= mysqli_num_rows($query);
			
			if ($num_row > 0) 
				{			
					$_SESSION['username']=$row['username'];
					header('Location: ../../superadmin.php');
					
				}
			else
				{
					header("Location: index.php?msg=wrong");
				}
    }  
    ?>                                              
                                     