<?php 
//error_reporting(0);

session_start();
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

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
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js"></script>
    <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>  
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css"> 
    <!-- Our Custom CSS -->
    <link rel="stylesheet" href="style3.css">
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
	            	<a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="glyphicon glyphicon-user"></i>
                    
                    <?php
                        $query = $db->prepare("SELECT name FROM tbl_user WHERE userid=:userid");
                        $query->bindValue(':userid', $_SESSION['userid'], PDO::PARAM_STR);
                        $query->execute();
                        $query->setFetchMode(PDO::FETCH_ASSOC);
         
                        while ($row = $query->fetch()) {
                        echo 'Welcome: ' . $row['name'];
                        }
                    ?>

                    <span class="glyphicon glyphicon-down"></span>
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
					<a class="btn btn-success" href="index.php" style="font-size:15px;"><i class="glyphicon glyphicon-log-out"> Logout</i></a>
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
		                <li><a href="admin_viewing.php">Marvin 5th</a></li>
		                <li><a href="admin_viewing.php">Marvin 10th</a></li>
		                <li><a href="admin_viewing.php">COP</a></li>
		            </ul>
		        </li>
		        <li>
		            <a href="admin_users.php"><i class="glyphicon glyphicon-edit"></i> User Accounts</a>
		        </li>
		        <li class="active">
		            <a href="admin_reports.php"><i class="glyphicon glyphicon-duplicate"></i> Reports</a>
		        </li>	  
	   		</ul>
		</nav>
	</div>               
	<!-- End of Sidebar -->

    <!-- Table -->
    <div class="container-body">
        <div class="info">
            <p><strong>Reports</strong></p>
        </div>
    </div>
    <div class="panel with-nav-tabs panel-default" style="width: 89.5%; position: fixed; margin-top:-865px; margin-left: 252px;">
        <div class="panel-heading">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#tab0default" data-toggle="tab">Computer Logs</a></li>
                <li><a href="#tab2default" data-toggle="tab">Active List</a></li>
                <li><a href="#tab3default" data-toggle="tab">Inactive List</a></li>
            </ul>
        </div>
        <div class="panel-body">
            <div class="tab-content">
                <div class="tab-pane fade in active" id="tab0default">
                    <div class="pane pane--table1" style="padding-right: 55px;">
                        <div class="col-md-3">
                            <input type="text" name="from_date" class="form-control" id="from_date" placeholder="From Date"> 
                        </div>
                        <div class="col-md-3">
                            <input type="text" name="to_date" class="form-control" id="to_date" placeholder="To Date"> 
                        </div>
                        <div class="col-md-3">
                            <select name="department" id="department" class="form-control">
                                <option value="" selected>--All department--</option>
                                <option value="Marvin 5th">Marvin 5th</option>
                                <option value="Marvin 10th">Marvin 10th</option>
                                <option value="AT">AT</option>
                            </select> 
                        </div>
                        <div class="col-md-3">
                            <select name="dub_dept" id="sub_dept" class="form-control">
                                <option value="" selected>--All sub department</option>
                                <option value="OM">IT-OM</option>
                                <option value="AUD">IT-AUD</option>
                                <option value="WEB">IT-WEB</option>
                            </select>
                        </div>
                        <div class="col-md-8"><br>
                            <input type="text" id="search-user" name="search-user" class="form-control" placeholder="Search for user... ">
                        </div>
                        <div class="col-md-4">
                            <br>
                            <input type="button" name="clear" id="clear" value="Clear" class="btn btn-default">
                            <input type="button" name="Excel" id="Excel" value="Excel" class="btn btn-success" onclick="">
                            <input type="button" name="PDF" id="PDF" value="PDF" class="btn btn-danger" onclick="">
                        </div>
                        <div style="clear:both; padding:15px;">
                            <table class="table table-bordered" id="comp_logs">

                                <?php
		            	            $stmt = $db->query("SELECT * FROM tbl_log");
		            	            $stmt->execute();
		            	            for($i=0; $row = $stmt->fetch(); $i++){
	            	            ?>

                                <tr>
                                    <th>No.</th>
                                    <th>User</th>
                                    <th>Computer Name</th>
                                    <th>Domain</th>
                                    <th>IP Address</th>
                                    <th>Date Modified</th>
                                    <th>Old IP Address</th>
                                    <th>Date Modified</th>
                                    <th>iMonitor Status</th>
                                    <th>Services Not Found</th>
                                    <th>SysSetting File</th>
                                    <th>Connection Status</th>
                                    <th>Server IP</th>
                                    <th>Branch</th>
                                    <th>Scan Time</th>
                                </tr>
                                <tr>
                                    <td><?php echo $row['log_no']; ?></td>
                                    <td><?php echo $row['user']; ?></td>
                                    <td><?php echo $row['domain_name']; ?></td>
                                    <td><?php echo $row['hostname']; ?></td>
                                    <td><?php echo $row['ip_address']; ?></td>
                                    <td><?php echo $row['ip_date_modified']; ?></td>
                                    <td><?php echo $row['old_ip_address']; ?></td>
                                    <td><?php echo $row['old_ip_modified']; ?></td>
                                    <td><?php echo $row['iMonitor_Stauts']; ?></td>
                                    <td><?php echo $row['services']; ?></td>
                                    <td><?php echo $row['sysSetting_File']; ?></td>
                                    <td><?php echo $row['serverIP']; ?></td>
                                    <td><?php echo $row['branch']; ?></td>
                                    <td><?php echo $row['scan_time']; ?></td>
                                </tr>
                                <?php } ?>
                            </table>
                        </div>
                    </div>  
                </div>
                <div class="tab-pane fade" id="tab2default">
                    <div class="pane pane--table1" style="padding-right: 55px;">
                        <div class="col-md-3">
                            <input type="text" name="from_date" class="form-control" id="from_date2" placeholder="From Date"> 
                        </div>
                        <div class="col-md-3">
                            <input type="text" name="to_date" class="form-control" id="to_date2" placeholder="To Date"> 
                        </div>
                        <div class="col-md-3">
                            <select name="department" id="department" class="form-control">
                                <option value="" selected>--All department--</option>
                                <option value="Marvin 5th">Marvin 5th</option>
                                <option value="Marvin 10th">Marvin 10th</option>
                                <option value="AT">AT</option>
                            </select> 
                        </div>
                        <div class="col-md-3">
                            <select name="dub_dept" id="sub_dept" class="form-control">
                                <option value="" selected>--All sub department</option>
                                <option value="OM">IT-OM</option>
                                <option value="AUD">IT-AUD</option>
                                <option value="WEB">IT-WEB</option>
                            </select>
                        </div>
                        <div class="col-md-8"><br>
                            <input type="text" id="search-user" name="search-user" class="form-control" placeholder="Search for user... ">
                        </div>
                        <div class="col-md-4">
                            <br>
                            <input type="button" name="clear" id="clear" value="Clear" class="btn btn-default">
                            <input type="button" name="Excel" id="Excel" value="Excel" class="btn btn-success" onclick="">
                            <input type="button" name="PDF" id="PDF" value="PDF" class="btn btn-danger" onclick="">
                        </div>
                        <div style="clear:both; padding:15px;">
                            <table class="table table-bordered" id="comp_logs">
                                <tr>
                                    <th>No.</th>
                                    <th>Computer Name</th>
                                    <th>IP Address</th>
                                    <th>Status</th>
                                    <th>Remarks</th>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>ITOMPH033048</td>
                                    <td>192.168.33.48</td>
                                    <td>Running</td>
                                    <td>Active</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="tab3default">
                    <div class="pane pane--table1" style="padding-right: 55px;">
                        <div class="col-md-3">
                            <input type="text" name="from_date" class="form-control" id="from_date3" placeholder="From Date"> 
                        </div>
                        <div class="col-md-3">
                            <input type="text" name="to_date" class="form-control" id="to_date3" placeholder="To Date"> 
                        </div>
                        <div class="col-md-3">
                            <select name="department" id="department" class="form-control">
                                <option value="" selected>--All department--</option>
                                <option value="Marvin 5th">Marvin 5th</option>
                                <option value="Marvin 10th">Marvin 10th</option>
                                <option value="AT">AT</option>
                            </select> 
                        </div>
                        <div class="col-md-3">
                            <select name="dub_dept" id="sub_dept" class="form-control">
                                <option value="" selected>--All sub department</option>
                                <option value="OM">IT-OM</option>
                                <option value="AUD">IT-AUD</option>
                                <option value="WEB">IT-WEB</option>
                            </select>
                        </div>
                        <div class="col-md-8"><br>
                            <input type="text" id="search-user" name="search-user" class="form-control" placeholder="Search for user... ">
                        </div>
                        <div class="col-md-4">
                            <br>
                            <input type="button" name="clear" id="clear" value="Clear" class="btn btn-default">
                            <input type="button" name="Excel" id="Excel" value="Excel" class="btn btn-success" onclick="">
                            <input type="button" name="PDF" id="PDF" value="PDF" class="btn btn-danger" onclick="">
                        </div>
                        <div style="clear:both; padding:15px;">
                            <table class="table table-bordered" id="comp_logs">
                                <tr>
                                    <th>No.</th>
                                    <th>Computer Name</th>
                                    <th>IP Address</th>
                                    <th>Platform</th>
                                    <th>Status</th>
                                    <th>Remarks</th>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>ITOMAU033022</td>
                                    <td>192.168.33.22</td>
                                    <td>Windows PC</td>
                                    <td>End Task</td>
                                    <td>Trasferred</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        $( function()
        {
            $( "#from_date" ).datepicker();
            $( "#to_date" ).datepicker();
            $( "#from_date1" ).datepicker();
            $( "#to_date1" ).datepicker();
            $( "#from_date2" ).datepicker();
            $( "#to_date2" ).datepicker();
            $( "#from_date3" ).datepicker();
            $( "#to_date3" ).datepicker();
        } );
    </script>

</body>
</html>
    


