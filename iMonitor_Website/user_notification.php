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
    <meta http-equiv="refresh" content="300">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <!-- Our Custom CSS -->
    <link rel="stylesheet" href="general.css">
    <!-- <link rel="stylesheet" href="styleIndex.css"> -->
</head>
<body>
    <!-- Top Navigation -->
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
                            <a href="user_notification.php"><small>Show all notifications</small></a>
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
				<div class="modal-header" style="background-color: #ffffff7a;">
					<button type="button" class="close" class="btn btn-default" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				</div>
				<div class="modal-body">
					<form>
						<p class="logout-modal">Are you sure you want to logout?</p>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal" style="font-size:12px;">Cancel</button>
					<a class="btn btn-warning" href="../php/connection/logout.php" style="font-size:12px;">Logout</i></a>
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
		            <a href="user_dashboard.php"><i class="glyphicon glyphicon-th-large" ></i> Dashboard</a>
		        </li>
		        <li>
		            <a href="user_branch.php"><i class="glyphicon glyphicon-home"></i>Branch Settings</a>
		        </li>
		        <li >
		            <a href="user_viewing.php" aria-expanded="false"><i class="glyphicon glyphicon-list-alt"></i>Computer List</a>
		        </li>
		        <li>
		            <a href="user_reports.php"><i class="glyphicon glyphicon-duplicate"></i>Reports</a>
		        </li>	  
	   		</ul>
        </nav>
        <div class="container" style="width:2000px;">
            <div class="panel" style="margin-top: 60px; background-color: #e3e5e3eb; margin-left:-15px;">
                <div class="col-lg-12">
                    <div class="panel with-nav-tabs pane-default" style="margin-left: -15px;  width: 102%;">
                        <div class="panel-heading">
                            <ul class="nav nav-tabs">
                                <li class="active">
                                    <a href="#tab1default" data-toggle="tab">Notifications</a>
                                </li>
                            </ul>
                        </div>
                        <div class="tab-pane fade in active" id="tab1default">
                            <div class="pane pane--1" style="margin-left: 20px; width: 100%; padding-right: 40px;">
                                <table class="table table-hover" style="background: #ffffff;">
                                    <thead>
                                        <tr>
                                            <th>Subject</th>
                                            <th>Details</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php
                                            $d=strtotime("Now");		
                                            $dateNow = date("M-d-Y", $d);
                                            $query = $db->prepare("SELECT user,hostname,iMonitor_Status,connection_status,branch,scan_time FROM tbl_log WHERE iMonitor_Status = 'End Task' AND user != 'Administrator' ");
                                            $query->execute();
                                            $query->setFetchMode(PDO::FETCH_ASSOC);
                                            while ($row = $query->fetch()) {
                                                echo '
                                                    <tr>
                                                        <td>iMonitor : '.$row['iMonitor_Status'].'<br/> Port Connection:'.$row['connection_status'].'<br/> Scan Time:'.$row['scan_time'].'</td>
                                                        <td>Hostname: '.$row['hostname'].' <br> User: '.$row['user'].'<br/> Building : '.$row['branch'].'</td>
                                                        <td>'.$row['scan_time'].'</td>
                                                    </tr>
                                                ';
                                            }
                                            $query2 = $db->prepare("SELECT user,hostname,iMonitor_Status,connection_status,branch,scan_time FROM tbl_log WHERE  user != 'Administrator' ");
                                            $query2->execute();
                                            $query2->setFetchMode(PDO::FETCH_ASSOC);
                                            
                                            while ($row2 = $query2->fetch()) {
                                                if(date("M-d-Y", strtotime($row2['scan_time'])) != $dateNow){
                                                    echo '
                                                    <tr>
                                                        <td>LogWindowsApp : Data Not Updated = '.$row2['scan_time'].'</td>
                                                        <td>Hostname: '.$row2['hostname'].' <br> User: '.$row2['user'].'<br/> Building : '.$row2['branch'].'</td>
                                                        <td>'.$row2['scan_time'].'</td>
                                                    </tr>
                                                    ';
                                                } 
                                            } 
                                        ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>               
    <!-- End of Sidebar -->



    
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

     var myVar = setInterval(myTimer ,1000);
function myTimer() {
    var d = new Date();
    document.getElementById("demo").innerHTML = d.toLocaleTimeString();
}
	
</body>
</html>