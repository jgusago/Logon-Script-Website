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
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    
    <link rel="stylesheet" href="general.css">
    <link rel="stylesheet" href="viewing.css">

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
		            <a href="admin_dashboard.php"><i class="glyphicon glyphicon-th-large" ></i> Dashboard</a>
		        </li>
		        <li>
		            <a href="admin_branch.php"><i class="glyphicon glyphicon-home"></i>Branch Settings</a>
		        </li>
		        <li class="active">
		            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false"><i class="glyphicon glyphicon-list-alt"></i>Computer List</a>
		            <ul class="collapse list-unstyled" id="homeSubmenu">
		                <li><a href="admin_viewing.php">Marvin 5th</a></li>
		                <li><a href="admin_viewing.php">Marvin 10th</a></li>
		                <li><a href="admin_viewing.php">COP</a></li>
		            </ul>
		        </li>
		        <li>
		            <a href="admin_users.php"><i class="glyphicon glyphicon-edit"></i>User Accounts</a>
		        </li>
		        <li>
		            <a href="admin_reports.php"><i class="glyphicon glyphicon-duplicate"></i>Reports</a>
		        </li>	  
	   		</ul>
        </nav>
        <div class="container" style="width:100%;">
            <div class="well" style="padding: 10px;">Computer List</div>
            <div class="col-lg-12">
                <div class="panel with-nav-tabs pane-default" style="margin-left: -30px; width: 105%;">
                    <div class="panel panel-body"> 
                        <div class="tab-pane fade in active" id="tab1default">
                            <div class="pane pane--1" style="margin-right: 0px; margin-left: 0px; width: 100%;">
                                <div class="col-md-4" style="padding-top:0px;">
                                    <select name="department" id="department" class="form-control">
                                        <option value="" selected>--All department--</option>
                                        <option value="Marvin 5th">Marvin 5th</option>
                                        <option value="Marvin 10th">Marvin 10th</option>
                                        <option value="AT">AT</option>
                                    </select> 
                                </div>
                                <div class="col-md-4" style="padding-top:0px;">

                                </div>
                                <div class="col-md-4" style="padding-top:0px;">
                                    <select name="dub_dept" id="sub_dept" class="form-control">
                                        <option value="" selected>--All sub department</option>
                                        <option value="OM">IT-OM</option>
                                        <option value="AUD">IT-AUD</option>
                                        <option value="WEB">IT-WEB</option>
                                    </select>
                                </div>
                                <div class="col-md-4" style="padding-top:0px; margin-top:15px;">
                                   <input type="text" class="form-control" name="search" value="Search ...">
                                </div>
                                <div class="col-md-4" style="padding-top:0px; margin-top:15px;"> </div>
                                <div class="col-md-4" style="padding-top:15px;">
                                    <input type="button" id="reset" name="clear" value="Clear" class="btn btn-default">
                                    <input type="button" name="btnExport" id="btnExport" value="Export as Excel" class="btn btn-success" onclick="fnExcelReport();">
                                    <input type="button" name="btn_print" id="btn_print" value="Print" class="btn btn-danger" onclick="javascript:printDiv('printablediv')" />
                                </div>
                                <div style="clear:both"></div>
                                <br>
                                <div class="table-responsive" style="overflow-x:auto; padding-right:5px;">
                                    <table class="table table-bordered" style="background: #ffffff;">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Computer Name</th>
                                                <th>IP Address</th>
                                                <th>Status</th>
                                                <th>Remarks</th>
                                                <th>Agent Version</th>
                                                <th>Options</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php
                                                $query = $db->prepare("SELECT compID, hostname, ip, status, remarks, agent_Version FROM tbl_computer_details");
                                                $query->execute();
                                                $query->setFetchMode(PDO::FETCH_ASSOC);
                                                while ($row = $query->fetch()) 
                                                {
                                                    echo '
                                                        <tr>
                                                            <td> '.$row['compID'].'</td>
                                                            <td> '.$row['hostname'].'</td>
                                                            <td>'.$row['ip'].'</td>
                                                            <td>'.$row['status'].'</td>
                                                            <td>'.$row['remarks'].'</td>
                                                            <td>'.$row['agent_Version'].'</td>
                                                            <td><a href="viewing.php"><input type="button" value="View" class="btn btn-primary"></a></td>
                                                        </tr>
                                                        ';
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

    <!-- Table -->
    <!-- <div class="container-body">
        <div class="info">
            <p><strong>MARVIN 5TH | COMPUTER LIST</strong></p>
        </div>
         <div class="container-table">
            <div class="row">
                <table class="table-viewing" style="margin-top: 80px; position:relative;">
                    <tr class="tr-dept">
                        <td><b>Sub Department:</b></td>
                        <td><select name="branches">
                            <option value="ad"></option>
                            <option value="ad">Admin</option>
                            <option value="hr">HR</option>
                            <option value="fn">Finance</option>
                            <option value="om">IT-OM</option>
                            <option value="aud">Audit</option>
                            <option value="devja">Java Developers</option>\
                            <option value="devios">iOS Developers</option>
                            <option value="devand">Android Developers</option>
                            <option value="omnet">Networks</option>
                            <option value="omweb">OM-Web</option>
                        </td>
                    </tr>
                    <tr class="tr-search">
                        <td><b>Search:</b></td>
                        <td><input class="form-control" id="inputSearch" type="text" placeholder="Search..."></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <a href="#logout" class="print-pdf"><u><i class="glyphicon glyphicon-print"> Print as PDF</i></u></a>
                        </td>
                        <td class="export">
                            <a href="#"><u><i class="glyphicon glyphicon-export"> Export as Excel File</i></u></a>
                        </td>
                    </tr>
                </table>
            </div>
            <!-- <div>
                <ul class="pagination pagination-sm">
                    <li><a href="">&laquo;</a></li>
                    <li><a class="active" href="" >1</a></li>
                    <li><a href="" >2</a></li>
                    <li><a href="" >3</a></li>
                    <li><a href="" >4</a></li>
                    <li><a href="" >5</a></li>
                    <li><a href="">&raquo;</a></li>
                </ul>
            </div>     -->
            <!-- <div class="container">
                <table class="table table-bordered" style="position: fixed; margin-left:2px; margin-top: 250px; margin-bottom:0px; width:88%;">
                    <thead>
                        <tr>
                            <th style="padding-bottom:15px;">No.</th>
                            <th style="padding-bottom:15px;">Computer Name</th>
                            <th style="padding-bottom:15px;">IP Address</th>
                            <th style="padding-bottom:15px;">Platform</th>
                            <th style="padding-bottom:15px;">Status</th>
                            <th style="padding-bottom:15px;">Remarks</th>
                            <th style="padding-bottom:15px;">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>ITOMAU03022</td>
                            <td>172.16.33.22</td>
                            <td>Windows PC</td>
                            <td>On-line</td>
                            <td>Active</td>
                            <td>
                                <a href="viewing.html"><button class="btn btn-primary">View</button></a>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>ITOMAU03022</td>
                            <td>172.16.33.22</td>
                            <td>Windows PC</td>
                            <td>On-line</td>
                            <td>Active</td>
                            <td>
                                <a href="viewing.html"><button class="btn btn-primary">View</button></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>           
    </div> --> -->

    <!-- Edit Modal -->
    <div id="myModalEdit" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"aria-hidden="true" style="width:100%; margin-left:0px; margin-top:50px; position:absolute; overflow:hidden;">
        <div class="modal-dialog modal-md" style="position:fixed; width:100%; height:100%;">
            <div class="modal-content" style="border:2px solid #3c7dcf; box-shadow:none;">
                <div class="modal-header" style="background-color:#f5f5f5;">
                    <button type ="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 style="font-size:2em;">Update Information</h4>
                </div>
                <div class="modal-body" style="margin-left:-180px; width:97%; ">
                    <div class="panel panel-default" style="margin-left:200px; padding-right:-30px; width:100%">
                        <div class="panel-heading" style="padding:20px; font-size:18px;"></div>
                        <div class="panel-body" style="padding:10px; margin-left:-200px; width:100%">
                            <div class="modal-container" style="margin: 10px; padding-left: 120px; margin-right: -80px;">
                                <table class="table table-bordered" style="margin-left:90px;">
                                    <thead>
                                        <tr style="padding:50px;">
                                            <th style="padding-bottom:15px;">No.</th>
                                            <th style="padding-bottom:15px;">Computer Name</th>
                                            <th style="padding-bottom:15px;">IP Address</th>
                                            <th style="padding-bottom:15px;">Platform</th>
                                            <th style="padding-bottom:15px;">Status</th>
                                            <th style="padding-bottom:15px;">Remarks</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style="padding-top:15px;">1</td>
                                            <td style="padding-top:15px;">ITOMAU033022</td>
                                            <td style="padding-top:15px;">172.16.33.22</td>
                                            <td style="padding-top:15px;">Windows PC</td>
                                            <td class="input-Status" style="padding-top:8px;">Online</td>
                                            <td class="input-Remarks "style="padding-top:8px;">
                                            <select name="remarks" id="">
                                                <option value="leave">Active</option>
                                                <option value="leave">On leave</option>
                                                <option value="resigned">Resigned</option>
                                                <option value="transferred">Transferred</option>
                                                <option value="renamed">Old PC name</option>
                                            </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" data-dismiss="modal">Update</button>
                </div>
            </div>   
        </div>
    </div>
    <!-- End of Edit Modal -->

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

