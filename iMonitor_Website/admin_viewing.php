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
    <!-- <link rel="stylesheet" href="viewing.css"> -->
    <link rel="stylesheet" href="style1.css">
    <!-- <link rel="stylesheet" href="styleIndex.css"> -->
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
                <li class="active">
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
                <li>
                    <a href="admin_reports.php"><i class="glyphicon glyphicon-duplicate"></i> Reports</a>
                </li>	  
            </ul>
        </nav>
    </div>                 
	<!-- End of Sidebar -->

    <!-- Table -->
    <div class="container-body">
        <div class="info">
            <p><strong>MARVIN 5TH | COMPUTER LIST</strong></p>
        </div>
         <div class="container-table">
            <div class="row">
                <table class="table-viewing" style="margin-top: 166px; position:relative;">
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
            <div class="container">
                <table class="table table-bordered" style="position: fixed; margin-left:2px; margin-top: 335px; margin-bottom:0px; width:88%;">
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
    </div>

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

    <script type="text/javascript">
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
        
        </script>
	
</body>
</html>

