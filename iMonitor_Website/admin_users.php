<script type="text/javascript">
var IDLE_TIMEOUT = 600; //seconds
var _idleSecondsCounter = 0;
document.onclick = function() {
_idleSecondsCounter = 0;
};
document.onmousemove = function() {
_idleSecondsCounter = 0;
};
document.onkeypress = function() {
_idleSecondsCounter = 0;
};
window.setInterval(CheckIdleTime, 1000);
function CheckIdleTime() {
_idleSecondsCounter++;
var oPanel = document.getElementById("SecondsUntilExpire");
if (oPanel)
oPanel.innerHTML = (IDLE_TIMEOUT - _idleSecondsCounter) + "";
if (_idleSecondsCounter >= IDLE_TIMEOUT) {
//alert("Time expired!");
document.location.href = "../php/connection/logout.php";
}
}
</script>

<?php 
error_reporting(0);

session_start();
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
$ID=$_GET['id'];
	if(!isset($_SESSION["userid"])) {
    	header("Location: index.php");
  	exit();
  	}
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="refresh" content="300">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script> 
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<!-- Our Custom CSS -->
	<link rel="stylesheet" href="general.css">
    <link rel="stylesheet" href="users.css">
</head>
<body onload="populateSecondTextBox();">
	<!-- Top navigation -->
	<nav class="navbar navbar-default navbar-fixed-top" class="col-lg-12 col-md-12 col-sm-12" style="background-color: #fffafa;">
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
            <ul class="nav navbar-nav navbar-right" style="padding-left:-50px; padding-right:25px; padding-top:7px; margin-top: -5px;">
                <li>
                    <p id="demo" hidden>
                        
                    </p>
                </li>

				<li class="dropdown">
                    <a href="#" style="padding-right: 30px; margin-top: 5px;">
                        <span class="glyphicon glyphicon-envelope"></span>
                    </a>
                </li> 

                <!-- Notification Dropdwon -->
				<li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#" style="padding-right: 28px;">
                        <span class="glyphicon glyphicon-bell"></span>
                        <span class="label label-pill label-warning count" style="border-radius: 10px;">
                        <?php
                            $query = $db->prepare("SELECT user,hostname,iMonitor_Status FROM tbl_log WHERE iMonitor_Status = 'End Task' AND user != 'Administrator' ");
                            $query->execute();
                            $query->setFetchMode(PDO::FETCH_ASSOC);
                            $countdown = 0;
                            while ($row = $query->fetch()) {
                                $countdown++;
                            }
                            echo  $countdown;
                        ?>
                        </span>
                    </a>
                    <ul class="dropdown-menu">
                        <?php 
                            $query = $db->prepare("SELECT user,hostname,iMonitor_Status FROM tbl_log WHERE iMonitor_Status = 'End Task' AND user != 'Administrator' LIMIT 5 ");
                            $query->execute();
                            $query->setFetchMode(PDO::FETCH_ASSOC);
                            while ($row = $query->fetch()) {
                                echo '
                                <li>
                                    <a href="#"><strong>'.$row['hostname'].'</strong><br>
                                    <small><em>'.$row['iMonitor_Status'].'</em></small></a>
                                </li>
                                <li class="divider"></li>
                                ';
                            }
                        ?>
                        <li>
                            <a href="admin_notification.php"><small>Show all notifications</small></a>
                        </li>
                    </ul>
                </li>
                <!-- End of Notification Dropdown -->

                <!-- User Dropdown -->
	            <li class="dropdown" style="padding-left: 5px;">
	            	<a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" style="padding-right: 30px;"><i class="glyphicon glyphicon-user"></i>
                    
                    <?php
                        $query = $db->prepare("SELECT name FROM tbl_user WHERE userid=:userid");
                        $query->bindValue(':userid', $_SESSION['userid'], PDO::PARAM_STR);
                        $query->execute();
                        $query->setFetchMode(PDO::FETCH_ASSOC);
         
                        while ($row = $query->fetch()) {
                        echo 'Welcome: ' . $row['name'];
                        }
                    ?>
	                </a>
	            	<ul class="dropdown-menu" role="menu">
	            		<li class="dropdown-header"><i class="glyphicon glyphicon-cog"></i><b> Settings</b></li>
	            		<li class="sub-header"><a href="#">Account Settings</a></li>
	            		<li class="divider"></li>
	            		<li style="font-size:18px; font-weight:200px;"><a href="#logout" data-toggle="modal"><i class="glyphicon glyphicon-off"></i> Sign out</a></li>
	            	</ul>
                </li>
                <!-- End of User Dropdown -->
            </ul>
	</nav>
	<!-- End of Top Navigation-->

 	<!-- Logout Modal -->
	<div class="modal fade" id="logout" tabindex="-1" role="dialog" aria-labelledby="myModallabel" arial-hidden="true" style="margin-top:150px;">
		<div class="modal-dialog modal-md" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" class="btn btn-default" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				</div>
				<div class="modal-body2">
					<form>
						<p class="logout-modal">Are you sure you want to logout?</p>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal" style="font-size:15px;">Cancel</button>
					<a class="btn btn-default" href="../php/connection/logout.php" style="font-size:15px;"><i class="glyphicon glyphicon-log-out"> Logout</i></a>
				</div>
			</div>
		</div>
	</div>
	<!-- End of Logout Modal -->

	<!-- Sidebar -->
	<div class="wrapper">
		<nav id="sidebar">
			<ul class="list-unstyled components">
		        <p></p>
		        <li>
		            <a href="admin_dashboard.php"><i class="glyphicon glyphicon-th-large" ></i> Dashboard</a>
		        </li>
		        <li>
		            <a href="admin_branch.php"><i class="glyphicon glyphicon-home"></i>Branch Settings</a>
		        </li>
		        <li>
		            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false"><i class="glyphicon glyphicon-list-alt"></i>Computer List</a>
		            <ul class="collapse list-unstyled" id="homeSubmenu">
		                <li><a href="admin_viewing.php">Marvin 5th</a></li>
		                <li><a href="admin_viewing.php">Marvin 10th</a></li>
		                <li><a href="admin_viewing.php">COP</a></li>
		            </ul>
		        </li>
		        <li  class="active">
		            <a href="admin_users.php"><i class="glyphicon glyphicon-edit"></i>User Accounts</a>
		        </li>
		        <li>
		            <a href="admin_reports.php"><i class="glyphicon glyphicon-duplicate"></i>Reports</a>
		        </li>	  
	   		</ul>
        </nav>
        <div class="container" style="width:100%;">
            <div class="well" style="padding: 10px;">User Accounts</div>
            <div class="col-lg-12">
				<div class="panel with-nav-tabs pane-default" style="margin-left: -30px;">
					<div class="panel panel-heading">
						<a href="#addUser" data-toggle="modal"><i class="glyphicon glyphicon-plus"></i><u>Add User</u></a>
					</div>
                    <div class="panel panel-body"> 
                        <div style="clear:both"></div>
                        <br>
                        	<div class="table-responsive" style="overflow-x:auto; margin-top:-50px;">
                                <table class="table table-bordered" style="background: #ffffff;">
                                    <thead>
                                    	<tr>
											<th style="padding-bottom:15px;">No.</th>
											<th style="padding-bottom:15px;">ID Number</th>
											<th style="padding-bottom:15px;">Name</th>
											<th style="padding-bottom:15px;">Department</th>
											<th style="padding-bottom:15px;">Position</th>
											<th style="padding-bottom:15px;">Role</th>
											<th style="padding-bottom:15px;">Status</th>
											<th style="padding-bottom:15px;">Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
										<?php
											$sql = "SELECT id, userid, name, department, position, status, role FROM tbl_user WHERE role<>'SUPER ADMIN'";
											foreach ($db->query($sql) as $row) {
												//$stmt = $db->query("SELECT id, userid, name, department, position, status, role FROM tbl_user WHERE role<>'SUPER ADMIN'");
												//$stmt->execute();
												//for($i=0; $row = $stmt->fetch(); $i++){
												$id=$row['id'];			
											?>
											<tr>
												<td><?php echo $row['id']; ?></td>
												<td><?php echo $row['userid']; ?></td>
												<td><?php echo $row['name']; ?></td>
												<td><?php echo $row['department']; ?></td>
												<td><?php echo $row['position']; ?></td>
												<td><?php echo $row['role']; ?></td>
												<td><?php echo $row['status']; ?></td>
												<td><a href="#editUser" data-toggle="modal"><button class="btn btn-primary">Edit Record</button></a></td>
											
											</tr>
										<?php } ?>
                                    </tbody>
                                </table>
                            </div>
                     </div>
                </div>
            </div>
		</div>
	</div>
	<!-- End of User Table -->

<!-- Add User Modal -->
<form action="../php/connection/user_account_submit.php" method="POST">
    <div class="modal fade" id="addUser" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" arial-hidden="true" style="margin-top:50px;">
		<div class="modal-dialog modal-md" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" class="btn btn-default" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="myModalLabel">User Registration</h4>
				</div>

				<div class="modal-body">
					<form class="form-horizontal" role="form">
						<div class="form-group">
							<label class="col-sm-12 control-label" for="userID">ID Number</label>
							<div class="col-sm-12">
								<input type="text" class="form-control" id="userid" name="userid" pattern="[0-9]{7}" required placeholder="ID Number" onkeypress="return isNumberKey(event)"/>
							</div>

								<script type="text/javascript">
									function isNumberKey(evt)
									{
										var charCode = (evt.which) ? evt.which : evt.keyCode;
										if (charCode > 31 && (charCode < 48 || charCode > 57))
											return false;
											return true;
									}
								</script>

						</div>
						<br>
						<div class="form-group">
							<label class="col-sm-12 control-label" for="userName">Name</label>
							<div class="col-sm-12">
								<input type="text" class="form-control" id="name" name="name" required placeholder="Name" onkeypress="return LettersrOnly(this, event)" maxlength="30"/>
							</div>
									
								<script type="text/javascript">
									function LettersrOnly(txt, e) 
									{
            							var arr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ";
            							var code;
            							if (window.event)
										code = e.keyCode;
										else
                						code = e.which;
            							var char = keychar = String.fromCharCode(code);
            							if (arr.indexOf(char) == -1)
                							return false;
        							}
    							</script>
						</div>
						<br>
						<div class="form-group">
							<label class="col-sm-12 control-label" for="Dept">Department</label>
							<div class="col-sm-12">
								<select class="form-control" id="department" name="department">
									<option value="">--Select Department--</option>
										<?php     
              								$sql = "select DISTINCT branch_name from tbl_department ORDER BY branch_name ASC";
              								$stmt = $db->prepare($sql);
              								$stmt->execute();

											  while($row=$stmt->fetch(PDO::FETCH_ASSOC))
											  {
                								echo '<option>'.$row['branch_name'].'</option>'; 
              								}
            							?>
								</select>
							</div>
						</div>
						<br>
						<div class="form-group">
							<label class="col-sm-12 control-label" for="position">Position</label>
							<div class="col-sm-12">
								<select class="form-control" id="position" name="position" required>
								<option value="">--Select Position--</option>
								</select>
							</div>
						</div>
						<br>
						<div class="form-group">
							<label class="col-sm-12 control-label" for="Role">Role</label>
							<div class="col-sm-12">
								<select class="form-control" id="role" name="role">
									<option value="">--Select role--</option>
									<option value="Adminsitrator">Administrator</option>
									<option value="Staff">Staff</option>
								</select>
							</div>
						</div>
						<br>
						<div class="form-group">
							<label class="col-sm-12 control-label" for="position">Status</label>
							<div class="col-sm-12">
								<select class="form-control" id="position" name="position">
										<option value="">--Select status--</option>
										<option value="Active">Active</option>
										<option value="Inactive">Inactive</option>
								</select>
							</div>
						</div>
						<br>
						<div class="form-group">
							<label class="col-sm-12 control-label" for="position">Password</label>
							<div class="col-sm-12">
								<input class="form-control" type="text" id="password" name="password" value="Aa123456" disabled>
							</div>
						</div>
						<br>
						<div class="form-group">
							<div class="col-sm-12">
								<button type="submit" class="btn btn-success" style="margin: auto; margin-top: 15;">Register</button>
								<input type="text" hidden>
							</div>
						</div>
					</form>
				</div>

				<div class="modal-footer">
				<input type="text" id="password2" name="password2"></td>
					<button type="button" class="btn btn-default" data-dismiss="modal" onclick="ClearFields();">Close</button>
				</div>
			</div>
		</div>
	</div>
</form>
<!-- End of Add User Modal  -->

<!-- Edit User Modal -->
<form action="../php/connection/user_account_submit.php" method="POST">
    <div class="modal fade" id="editUser" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" arial-hidden="true" style="margin-top:50px;">
		<div class="modal-dialog modal-md" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" class="btn btn-default" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="myModalLabel">Edit User Information</h4>
				</div>

				<div class="modal-body1" style="height: 580px;">
					<form class="form-horizontal" role="form">
						<div class="form-group">
							<label class="col-sm-12 control-label" for="userID">ID Number</label>
							<div class="col-sm-12">
								<input type="text" class="form-control" id="idnumber" placeholder="ID Number" required>

								<script type="text/javascript">
									function isNumberKey(evt)
									{
										var charCode = (evt.which) ? evt.which : evt.keyCode;
										if (charCode > 31 && (charCode < 48 || charCode > 57))
											return false;
											return true;
									}
								</script>

							</div>
						</div>
						<br>
						<div class="form-group">
							<label class="col-sm-12 control-label" for="userName">Name</label>
							<div class="col-sm-12">
								<input type="text" class="form-control" id="name" placeholder="Name" required>
							</div>
						</div>
						<br>
						<div class="form-group">
							<label class="col-sm-12 control-label" for="Dept">Department</label>
							<div class="col-sm-12">
								<select class="form-control" id="department" name="department" placeholder="--Select Department--" required>
									<option></option>
										<?php     
              								$sql = "select DISTINCT branch_name from tbl_department ORDER BY branch_name ASC";
              								$stmt = $db->prepare($sql);
              								$stmt->execute();

											  while($row=$stmt->fetch(PDO::FETCH_ASSOC))
											  {
                								echo '<option>'.$row['branch_name'].'</option>'; 
              								}
            							?>
								</select>
							</div>
						</div>
						<br>
						<div class="form-group">
							<label class="col-sm-12 control-label" for="position">Position</label>
							<div class="col-sm-12">
								<select class="form-control" id="position" name="position" required>
								</select>
							</div>
						</div>
						<br>
						<div class="form-group">
							<label class="col-sm-12 control-label" for="Role">Role</label>
							<div class="col-sm-12">
								<select class="form-control" name="dept" id="role" >
									<option value="">--Select role--</option>
									<option value="Adminsitrator">Administrator</option>
									<option value="Staff">Staff</option>
								</select>
							</div>
						</div>
						<br>
						<div class="form-group">
							<label class="col-sm-12 control-label" for="position">Status</label>
							<div class="col-sm-12">
								<select class="form-control" name="position" id="position">
										<option value="">--Select status--</option>
										<option value="Active">Active</option>
										<option value="Inactive">Inactive</option>
								</select>
							</div>
						</div>
						<br>
						<div class="form-group">
							<label class="col-sm-12 control-label" for="position">Password</label>
							<div class="col-sm-12">
								<input class="form-control" type="text" id="password" name="password" value="Aa123456" disabled>
							</div>
						</div>
						<br>
						<div class="form-group">
							<div class="col-sm-12">
								<div class="checkbox">
									<label><input type="checkbox"/>Reset password</label>
								</div>
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-12">
								<button type="submit" class="btn btn-warning" style="margin: auto; margin-top: 5px;">Update</button>
							</div>
						</div>
					</form>
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					<input type="text" id="password2" name="password2"></td>
				</div>
			</div>
		</div>
	</div>
</form>



				<script type="text/javascript">
					function populateSecondTextBox() 
					{
   						document.getElementById('password2').value = document.getElementById('password').value;
					}
				</script>

					<script type="text/javascript">
						function populateSecondTextBox() {
   							document.getElementById('password2').value = document.getElementById('password').value;
						}
					</script>

				<script type="text/javascript">
					function ClearFields() 
					{
        				document.getElementById("userid").value = "";
						document.getElementById("name").value = "";
						document.getElementById("department").selectedIndex = "0";
						document.getElementById("position").selectedIndex = "1";
						document.getElementById("status").selectedIndex = "1";
						document.getElementById("role").selectedIndex = "1";
    				}
				</script>

				<!-- <div class="modal-footer">
					<input type="hidden" id="password2" name="password2"></td>
					<button type="button" class="btn btn-default" data-dismiss="modal" style="font-size:15px;" onclick="ClearFields();">Close</button>
				</div> -->

<!-- FOR SUB DEPARTMENT -->
<script type="text/javascript">
	$("#department").change(function() {
  	$("#position").load("get_sub_department.php?branch_name=" + $("#department").val());
	});
</script>
<!-- END -->


<script>

$(document).ready(function(){
	$(".dropdown").hover(            
		function() {
			$('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideDown("400");
			$(this).toggleClass('open');        
		},
		function() {
			$('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideUp("400");
			$(this).toggleClass('open');       
		}
	);
});

		$(document).ready(function () {
				$('#sidebarCollapse').on('click', function () {
					$('#sidebar').toggleClass('active');
				});
			});



	function isNumber(input) {
	var regex =/[^0-9]/gi;
	input.value = input.value.replace(regex,"");
		
	}


	function lettersOnly(input) {
	var regex = /[^a-z]/gi;
	input.value = input.value.replace(regex,"");   
}  

}
</script>

</body>
</html>

<script>
				
        function isNumber(input) {
          var regex =/[^0-9]/gi;
          input.value = input.value.replace(regex,"");
               
        }
               
        function lettersOnly(input) {
          var regex = /[^a-z]/gi;
          input.value = input.value.replace(regex,"");
               
             }   
             
         function resetPass() 
         {
            var x = document.getElementById("default-pass");
            if (x.type === "password")
            {
                x.type = "text";
            } 
            else 
            {
                x.type = "password";
            }
		}  
</script>

