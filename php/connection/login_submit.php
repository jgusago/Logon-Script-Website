<?php
session_start();
include("connection.php");
  
       if (isset($_POST['username']))
		{
			$username = mysqli_real_escape_string($con, $_POST['username']);
			$password = mysqli_real_escape_string($con, $_POST['password']);
			
			$query 		= mysqli_query($con, "SELECT * FROM tbl_user WHERE  username='$username' and password='$password'");
			$row		= mysqli_fetch_array($query);
			$num_row 	= mysqli_num_rows($query);
			
			if ($num_row = 0) 
				{			
					$_SESSION['username']=$row['username'];
					header("Location: index.php?msg=wrong");
					
				}
			else
				{
					header('Location: ../../superadmin.php');
				}
    }  
    ?>                                              
                                     