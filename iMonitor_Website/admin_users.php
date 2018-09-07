<?php 
session_start();
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
$id=$_GET['id'];
//if(!isset($_SESSION["userid"])) {
    //header("Location: index.php");
  //exit();
  //}
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <!-- Our Custom CSS -->
    <link rel="stylesheet" href="style2.css">
</head>
<body>
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
	        <ul class="nav navbar-nav navbar-right" style="padding-left:-50px; padding-right:25px; padding-top:5px;">
				<li><a href="#"><i class="glyphicon glyphicon-envelope"></i></a></li> 
				<li class="dropdown">
					<a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="glyphicon glyphicon-bell"></i></a></li>
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
	<!-- End of Modal -->

	<!-- Sidebar -->
	<div class="wrapper">
		<nav id="sidebar">
			<ul class="list-unstyled components">
		        <p></p>
		        <li>
		            <a href="admin_dashboard.php"><i class="glyphicon glyphicon-th-large" ></i> Dashboard</a>
		        </li>
		        <li>
		            <a href="#"><i class="glyphicon glyphicon-home"></i> Branch Settings</a>
		        </li>
		        <li>
		            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false"><i class="glyphicon glyphicon-list-alt"></i> Computer List</a>
		            <ul class="collapse list-unstyled" id="homeSubmenu">
		                <li><a href="admin_viewing.html">Marvin 5th</a></li>
		                <li><a href="admin_viewing.html">Marvin 10th</a></li>
		                <li><a href="admin_viewing.html">COP</a></li>
		            </ul>
		        </li>
		        <li class="active">
		            <a href="admin_users.php"><i class="glyphicon glyphicon-edit"></i> User Accounts</a>
		        </li>
		        <li>
		            <a href="reports.html"><i class="glyphicon glyphicon-duplicate"></i> Reports</a>
		        </li>	  
	   		</ul>
		</nav>
	</div>               
	<!-- End of Sidebar -->

    <!-- Table -->
    <div class="container-body">
        <div class="info">
            <p><strong>User Accounts</strong></p>
        </div>
        <div class="container-table" style="position:sticky;  overflow: hidden;">
            <div class="row">
                <!-- style="margin-left:287px; margin-top:133px; background-color: white; width:90%; padding:10px; margin-right:100px;" -->
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <a href="#addUser" data-toggle="modal"><i class="glyphicon glyphicon-plus"></i><u>Add User</u></a>
                    </div>
                </div>
            </div>

            <div class="container">
                <table class="table table-bordered" style="position: fixed; margin-left:12px; margin-top:190px; margin-bottom:10px; width:87%">
                    <thead>
                        <tr>
                            <th style="padding-bottom:15px;">No.</th>
                            <th style="padding-bottom:15px;">ID Number</th>
                            <th style="padding-bottom:15px;">Name</th>
                            <th style="padding-bottom:15px;">Department</th>
                            <th style="padding-bottom:15px;">Position</th>
                            <th style="padding-bottom:15px;">Role</th>
                            <th style="padding-bottom:15px;">Option</th>
                        </tr>
                    </thead>
                    <tbody class="table-users">

 							<?php
		            		$stmt = $db->query('SELECT id, userid, name, department, position, role FROM tbl_user');
		            		$stmt->execute();
		            		for($i=0; $row = $stmt->fetch(); $i++){
							$id=$row['id'];
	            			?>
                        <tr>
							<td><?php echo $row['id']; ?></td>
							<td><?php echo $row['userid']; ?></td>
							<td><?php echo $row['name']; ?></td>
							<td><?php echo $row['department']; ?></td>
							<td><?php echo $row['position']; ?></td>
							<td><?php echo $row['role']; ?></td>
                            <td><a href="edit_submit.php" <?php echo '?id='.$id; ?> data-toggle="modal"><button class="btn btn-primary">Edit</button></a></td>
							<?php } ?>
						</tr>
                    </tbody>
                </table>
            </div>
        </div>  

<form action="../php/connection/user_account_submit.php" method="POST">
    <div class="modal fade" id="addUser" tabindex="-1" role="dialog" aria-labelledby="myModallabel" arial-hidden="true" style="margin-top:150px;">
			<div class="modal-dialog modal-md" role="document">
				<div class="modal-content">
					<div class="modal-header" style="background-color:#16811430;"><b>User Registration</b>
						<button type="button" class="close" class="btn btn-default" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					</div>
					<div class="body">

                        <div>
                            <?php
                                if(isset($_GET['msg']))
                            {       
                                echo "<p align='center' class='correct'>Data save successfully.</p>";
                            }
                            ?>
                        </div>  

						<form style="padding:20px;">
							<table class="modal-form">
								<tr>
									<td><b>ID Number:</b></td>
									<td><input type="text" id="userid" name="userid" required></td>
								</tr>
								<tr>
									<td><b>Name:</b></td>
									<td><input type="text" id="name" name="name" required></td>
								</tr>
								<tr>
									<td><b>Department:</b></td>
									<td class="dropdown-dept">
										<select name="department">
											<option></option>
											<?php     
              									$sql = "select department from tbl_department";
              									$stmt = $db->prepare($sql);
              									$stmt->execute();

              									while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                								echo '<option>'.$row['department'].'</option>'; 
              									}
            									?>
										</select>
									</td>
								</tr>
								<tr>
									<td><b>Position:</b></td>
									<td class="dropdown-dept">
										<select name="postion">
											<option></option>
											<?php     
              									$sql = "select position from tbl_position";
              									$stmt = $db->prepare($sql);
              									$stmt->execute();

              									while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                								echo '<option>'.$row['position'].'</option>'; 
              									}
            									?>
										</select>
									</td>
								</tr>
								<tr>
									<td><b>Role:</b></td>
									<td class="dropdown-role"> 
										<select name="role">
											<option></option>
											<?php     
              									$sql = "select role from tbl_role";
              									$stmt = $db->prepare($sql);
              									$stmt->execute();

              									while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                								echo '<option>'.$row['role'].'</option>'; 
              									}
            									?>
										</select>
									</td>
								</tr>
								<tr>
									<td><b>Password:</b></td>
									<td><input type="text" id="password" name="password" value="Aa123456" required disabled></td>
								</tr>
								<tr>
									<td></td>
									<td><button class="btn btn-success">Register</button></td>
								</tr>
							</table>
						</form>
                    </div>
</form>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal" style="font-size:15px;">Close</button>
					</div>
				</div>
			</div>
			</div>
		<!-- End of Modal -->

		<!-- Modal Add User-->

    <?php
		$stmt = $db->query('SELECT * FROM tbl_user WHERE id='$id'');
		$stmt->execute();
		for($i=0; $row = $stmt->fetch(); $i++){
		$id=$row['id'];
	?>

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
									<td><input type="text" name="userid" required value=<?php echo $row['userid']; ?>>></td>
								</tr>
								<tr>
									<td><b>Name:</b></td>
									<td><input type="text" name="name" required></td>
								</tr>
								<tr>
									<td><b>Department:</b></td>
									<td class="dropdown-dept">
										<select name="department">
											<option value="m5">----select department----</option>
											<option value="Marvin 5th">Marvin 5th</option>
											<option value="Marvin 10th">Marvin 10th</option>
											<option value="COP">COP</option>
											<option value="B2B">B2B</option>
											<option value="AT">AT</option>
											<option value="L8">L8</option>

										</select>
									</td>
								</tr>
								<tr>
									<td><b>Position:</b></td>
									<td><input type="text" required></td>
								</tr>
								<tr>
									<td><b>Role:</b></td>
									<td class="dropdown-role"> 
										<select name="role">
											<option value="admin"></option>
											<option value="admin">Administrator</option>
											<option value="staff">Staff</option>
										</select>
									</td>
                                </tr>
                                <tr class="reset-password">
                                    <td><b>Password:</b></td>
                                    <td><input id="default-pass" value="Aa123456" type="password" disabled></td> 
                                    <td>
                                        <div>
                                            <label class="checkbox-inline"><input type="checkbox" id="myCheck" onclick="resetPass()" style=" margin-left: -170px;">Reset password</label>
                                        </div>
                                    </td>
                                    <!-- <td>
                                        <input class="checkbox" type="checkbox" value="reset-pass">
                                    </td> 
                                    <td>
                                        <p>Reset password</p>
                                    </td>                 -->
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
		<!-- End of Modal -->

    <script type="text/javascript">
        $('#exampleModal').on('show.bs.modal', function (event) {
          var button = $(event.relatedTarget) // Button that triggered the modal
          var recipient = button.data('whatever') // Extract info from data-* attributes
          // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
          // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
          var modal = $(this)
          modal.find('.modal-title').text('New message to ' + recipient)
          modal.find('.modal-body input').val(recipient)
        })
        
        $(document).ready(function(){
         
         function load_unseen_notification(view = '')
         {
          $.ajax({
           url:"fetch.php",
           method:"POST",
           data:{view:view},
           dataType:"json",
           success:function(data)
           {
            $('.dropdown-menu').html(data.notification);
            if(data.unseen_notification > 0)
            {
             $('.count').html(data.unseen_notification);
            }
           }
          });
         }
         
         load_unseen_notification();
         
         $('#comment_form').on('submit', function(event){
          event.preventDefault();
          if($('#subject').val() != '' && $('#comment').val() != '')
          {
           var form_data = $(this).serialize();
           $.ajax({
            url:"insert.php",
            method:"POST",
            data:form_data,
            success:function(data)
            {
             $('#comment_form')[0].reset();
             load_unseen_notification();
            }
           });
          }
          else
          {
           alert("Both Fields are Required");
          }
         });
         
         $(document).on('click', '.dropdown-toggle', function(){
          $('.count').html('');
          load_unseen_notification('yes');
         });
         
         setInterval(function(){ 
          load_unseen_notification();; 
         }, 5000);
         
        });
        
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
	
</body>
</html>

