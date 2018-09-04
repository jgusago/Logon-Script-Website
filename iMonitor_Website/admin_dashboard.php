<?php
session_start();

if(!isset($_SESSION["username"])) {
  header("Location: index.php");
exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
	<title>Skyluster Technology Inc.</title>
	<link rel="stylesheet" href="dashboard.css">
	<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
	<nav class="navbar navbar-default navbar-fixed-top" class="col-lg-12 col-md-12 col-sm-12">
		<div class="navbar-header">
			<img class="nav-logo" src="icons/sky_luster.png">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>
        <label class="nav-label">iMonitoring</label>

        <div class="collapse bs-example-navbar-collapse" id="bs-example-navbar-collapse-1"></div>
	        <ul class="nav navbar-nav navbar-right" style="padding-left:-50px; padding-right:20px; padding-top:5px;">
				<li><a href="index.html"><i class="glyphicon glyphicon-envelope"></i></a></li> 
				<li><a href="index.html"><i class="glyphicon glyphicon-bell"></i></a></li>
	            <li class="dropdown">
	            	<a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="glyphicon glyphicon-user"></i> Jerry Chen<span class="glyphicon glyphicon-down"></span>
	            	<span class="caret"></span></a>
	            		<ul class="dropdown-menu" role="menu">
	            			<li class="dropdown-header"><i class="glyphicon glyphicon-cog"></i><b> Settings</b></li>
	            			<li class="sub-header"><a href="#">Account Settings</a></li>
	            			<li class="divider"></li>
	            			<li style="font-size:18px; font-weight:200px;"><a href="#logout" data-toggle="modal"><i class="glyphicon glyphicon-off"></i> Sign out</a></li>
	            		</ul>
	            </li>
	        </ul>
	</nav>
	<!-- End Navigation-->

 	<!-- Modal -->
	<div class="modal fade" id="logout" tabindex="-1" role="dialog" aria-labelledby="myModallabel" arial-hidden="true" style="margin-top:150px;">
		<div class="modal-dialog modal-md" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" class="btn btn-default" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				</div>
				<div class="body">
					<form>
						<p class="logout-modal">Are you sure you want to logout?</p>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal" style="font-size:15px;">Cancel</button>
					<a class="btn btn-success" href="index.html" style="font-size:15px;"><i class="glyphicon glyphicon-log-out"> Logout</i></a>
				</div>
			</div>
		</div>
	</div>
	<!-- End of Modal -->

	<!-- Sidebar -->
	<div class="side-navbar">
		<a class ="active" href="admin_dashboard.html"><i class="glyphicon glyphicon-th-large"></i> <p> Dashboard</p> 	</a>
		<div class="dropdown">
			<button onclick="myFunction()" class="dropbtn"><i class="glyphicon glyphicon-list-alt"></i> Computer List</button>
			<div id="myDropdown" class="dropdown-content">
				<a href="admin_viewing.html">Marvin 5th</a>
				<a href="admin_viewing.html">Marvin 10th</a>
				<a href="admin_viewing.html">B2B</a>
			</div>
		</div>

		<a href="admin_users.html"><i class="glyphicon glyphicon-edit"></i> <p>User Accounts</p>	</a>
		<a href="admin_reports.html"><i class="glyphicon glyphicon-duplicate"></i> <p>Reports</p> </a>
	</div>
	<!-- End of Sidebar -->

	<script type="text/javascript">
		function myFunction() 
		{
			document.getElementById("myDropdown").classList.toggle("show");
		}
		// Close the dropdown menu if the user clicks outside of it
		window.onclick = function(event) 
		{
			if (!event.target.matches('.dropbtn')) 
			{
				var dropdowns = document.getElementsByClassName("dropdown-content");
				var i;
				for (i = 0; i < dropdowns.length; i++) 
				{
					var openDropdown = dropdowns[i];
					if (openDropdown.classList.contains('show')) 
					{
						openDropdown.classList.remove('show');							
					}
				}
			}
		}
	</script>


	<script src="Bootstrap/js/jquery.min.js"></script>
	<script src="Bootstrap/js/bootstrap.min.js"></script>
	
</body>
</html>

