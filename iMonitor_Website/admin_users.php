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
    <link rel="stylesheet" href="style2.css">
</head>
<body onload="populateSecondTextBox();">
	<!-- Top navigation -->
	<nav class="navbar navbar-default navbar-fixed-top" class="col-lg-12 col-md-12 col-sm-12" style="background-color: #fffafa; height:60px;">
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
				<li class="dropdown">
                    <a href="#" style="padding-right: 30px;">
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
				<div class="modal-header" style="background-color: #66bb307a;">
					<button type="button" class="close" class="btn btn-default" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				</div>
				<div class="modal-body">
					<form>
						<p class="logout-modal">Are you sure you want to logout?</p>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal" style="font-size:15px;">Cancel</button>
					<a class="btn btn-success" href="../php/connection/logout.php" style="font-size:15px;"><i class="glyphicon glyphicon-log-out"> Logout</i></a>
				</div>
			</div>
		</div>
	</div>
	<!-- End of Logout Modal -->

	<!-- Sidebar -->
	<div class="wrapper" style="height: 105vh;"> 
		<nav id="sidebar" style="position:fixed;margin-top:30px;">
			<ul class="list-unstyled components">
		        <p></p>
		        <li>
		            <a href="admin_dashboard.php"><i class="glyphicon glyphicon-th-large" ></i> Dashboard</a>
		        </li>
		        <li>
		            <a href="admin_branch.php"><i class="glyphicon glyphicon-home"></i> Branch Settings</a>
		        </li>
		        <li>
		            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false"><i class="glyphicon glyphicon-list-alt"></i> Computer List</a>
		            <ul class="collapse list-unstyled" id="homeSubmenu">
		                <li><a href="admin_viewing.php">Marvin 5th</a></li>
		                <li><a href="admin_viewing.php">Marvin 10th</a></li>
		                <li><a href="admin_viewing.php">COP</a></li>
		            </ul>
		        </li>
		        <li class="active">
		            <a href="admin_users.php"><i class="glyphicon glyphicon-edit"></i> User Accounts</a>
		        </li>
		        <li>
		            <a href="admin_reports.php"><i class="glyphicon glyphicon-duplicate"></i> Reports</a>
		        </li>	  
	   		</ul>
		</nav>
	</div>               
	<!-- End of Sidebar -->

    <div class="container-body">
        <div class="info" style="margin-top:-11px;">
            <p><strong>User Accounts</strong></p>
        </div>
        <div class="container-table" style="position:sticky;  overflow: hidden;">
            <div class="row" style="margin-top:200px">
                <div class="panel panel-default" style="margin-top:0px;">
                    <div class="panel-heading">
                        <a href="#addUser" data-toggle="modal"><i class="glyphicon glyphicon-plus"></i><u>Add User</u></a>
					</div>
                </div>
			</div>
		</div>
		
		<!-- User table -->
        <div class="container">
            <table class="table table-bordered" style="position: fixed; margin-left:12px; margin-top:210px; margin-bottom:10px; width:87%">
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
                <tbody class="table-users">

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
						<td><a href="test_edit.php <?php echo '?id='.$id; ?>" data-toggle="modal"><button class="btn btn-primary">Edit Record</button></a></td>
					</tr>
					<?php } ?>
            	</tbody>
            </table>
		</div> 
		<!-- End of User Table -->

<!-- Add User Modal -->
<form action="../php/connection/user_account_submit.php" method="POST">
    <div class="modal fade" id="addUser" tabindex="-1" role="dialog" aria-labelledby="myModallabel" arial-hidden="true" style="margin-top:150px;">
		<div class="modal-dialog modal-md" role="document">
			<div class="modal-content">
				<div class="modal-header" style="background-color:#16811430;"><b>User Registration</b>
					<button type="button" class="close" class="btn btn-default" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				</div>
				<div class="body">

					<form style="padding:20px;">
						<table class="modal-form">

							<script type="text/javascript">
							function isNumberKey(evt)
							{
								var charCode = (evt.which) ? evt.which : evt.keyCode;
								if (charCode > 31 && (charCode < 48 || charCode > 57))
									return false;
									return true;
							}
							</script>

							<tr>
								<td><b>ID Number:</b></td>
								<td><input type="text" id="userid" name="userid" pattern="[0-9]{7}" required placeholder="User ID" onkeypress="return isNumberKey(event)"/></td>
							</tr>

								<script type="text/javascript">
								function numberOnly(txt, e) 
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

							<tr>
								<td><b>Name:</b></td>
								<td><input type="text" id="name" name="name" required placeholder="Name" onkeypress="return numberOnly(this, event)" maxlength="30"/></td>
							</tr>
							<tr>
								<td><b>Department:</b></td>
								<td class="dropdown-dept">
									<select id= "department" name="department" required>
										<option></option>
										<?php     
              								$sql = "select DISTINCT branch_name from tbl_department";
              								$stmt = $db->prepare($sql);
              								$stmt->execute();

											  while($row=$stmt->fetch(PDO::FETCH_ASSOC))
											  {
                								echo '<option>'.$row['branch_name'].'</option>'; 
              								}
            							?>
									</select>
								</td>
							</tr>
							<tr>
								<td><b>Position:</b></td>
								<td class="dropdown-status">
									<select id="position" name="position" required>
									</select>
								</td>
							</tr>
							<tr>
								<td><b>Role:</b></td>
								<td class="dropdown-status">
									<select id="role" name="role" required>
										<option></option>
										<option value="Admin">Asmin</option>
										<option value="Staff">Staff</option>
									</select>
								</td>
							</tr>
							<tr>
								<td><b>Status:</b> </td>
								<td class="dropdown-status">
									<select id="status" name="status" required>
										<option></option>
										<option value="Active">Active</option>
										<option value="Inactive">Inactive</option>
									</select>
								</td>
							</tr>
							<tr>
								<td><b>Password:</b></td>
								<td><input type="text" id="password" name="password" value="Aa123456" disabled></td>
							</tr>
							<tr>
								<td></td>
								<td><button class="btn btn-success">Register</button></td>
							</tr>
						</table>
					</form>
				</div>
</form>										
<!-- End of Add User Modal  -->

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
						document.getElementById("position").value = "";
						document.getElementById("role").selectedIndex = "0";
    				}
				</script>

				<div class="modal-footer">
					<input type="hidden" id="password2" name="password2"></td>
					<button type="button" class="btn btn-default" data-dismiss="modal" style="font-size:15px;" onclick="ClearFields();">Close</button>
				</div>
			</div>
		</div>
	</div>
</form>

<!-- FOR SUB DEPARTMENT -->

 <script src = "../js/controller/ajax_bybranch_name.js"></script>

<!-- END -->

<!-- Edit User Modal -->
<!--<form action="user_edit_account_submit.php" method="POST">	
	<div class="modal fade" id="editUser" tabindex="-1" role="dialog" aria-labelledby="myModallabel" arial-hidden="true" style="margin-top:150px;">
			<div class="modal-dialog modal-md" role="document">
				<div class="modal-content">
					<div class="modal-header" style="background-color:#16811430;"><b>Edit User Information</b>
						<button type="button" class="close" class="btn btn-default" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					</div>
					<div class="body">
						<form style="padding:10px;">
							<table class="modal-form">
								<tr>
									<td><b>ID Number:</b></td>
									<td><input type="text" id="userid" value="" name="userid" required placeholder="User ID"></td>
								</tr>
								<tr>
									<td><b>Name:</b></td>
									<td><input type="text" id="name" name="name" value=""  required  class="validate"></td>
								</tr>
								<tr>
									<td><b>Department:</b></td>
									<td class="dropdown-dept">
										<select name="department">
										<option value=""> </option>
										</select>
									</td>
								</tr>
								<tr>
									<td><b>Position:</b></td>
									<td class="dropdown-dept">
										<select name="position">
										<option value=""> </option>
										</select>
								</tr>
								<tr>
									<td><b>Role:</b></td>
									<td class="dropdown-role"> 
										<select name="role">
										<option value=""> </option>
										</select>
									</td>
                                </tr>
                                <tr class="reset-password">
                                    <td><b>Password:</b></td>
                                    <td><input id="default-pass" type="password" value="">></td> 
                                    <td>
                                        <div>
                                            <label class="checkbox-inline"><input type="checkbox" id="myCheck" onclick="resetPass()" style=" margin-left: -170px;">Reset password</label>
                                        </div>
                                    </td>
                                </tr>
								<tr>
									<td></td>
									<td><button class="btn btn-primary">Update</button></td>
								</tr>
							</table>
						</form>
					</div>					
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal" style="font-size:15px;">Close</button>
					</div>			
				</div>
			</div>
	</div>
</form>-->
<!-- End of Edit User Modal -->
	
</body>
</html>

<script>

	$(document).ready(function()
	{
		$(".dropdown").hover(function() 
		{
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideDown("400");
            $(this).toggleClass('open');        
        },
		function() 
		{
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideUp("400");
            $(this).toggleClass('open');       
        });
    });

	(document).ready(function () 
	{
		$('#sidebarCollapse').on('click', function () 
		{
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

