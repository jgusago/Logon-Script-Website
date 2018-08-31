<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
	<title>Skyluster Technology Inc.</title>
	<link rel="stylesheet" type="text/css" href="">
	<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
	<style type="text/css">
	body
	{
		background-color:#e3e3e3;
		font-family:Verdana, Tahoma, sans-serif;
	}
	.side-navbar
	{
		width:270px;
		position:fixed;
		height:100%;
		border-radius:0px;
		z-index: -1;
		overflow: hidden;
		background-color:#fffbfb;
		padding-top:65px;
	}
	.side-navbar a 
	{
		padding:10px 20px 10px 20px;
		font-size:20px;
		font-family: Century Gothic;
		text-decoration: none;
		color:black;
		display: block;
		background-color: #4ca51f8f;
		margin-top:5px;
		height:60px;
	}
	.side-navbar a:hover, .dropdown-btn:hover
	{
		background-color:#eae91796;
    	color: black;
	}
	.side-navbar img 
	{
		margin-right:10px;
		width: 35px;
    	height: 40px;
	}
	.side-navbar .active
	{
		background-color:#eae91796;
	}
	.dropbtn-active
	{
		background-color: #4ca51f8f;
		color: black;
		/* padding:10px 20px 10px 20px; */
		font-size: 20px;
		border: none;
		cursor: pointer;
		font-family: Century Gothic;
		height:60px;
		margin-top:5px;
		width:270px;
	}	
		/* Dropdown button on hover & focus */
	.dropbtn-active:hover, .dropbtn-active:focus 
	{
		background-color: #eae91796;
    }
    .dropbtn-active
    {
        background-color: #eae91796;
    }
	/* The container <div> - needed to position the dropdown content */
	.dropdown 
	{
		position: relative;
		display: inline-block;
	}
	/* Dropdown Content (Hidden by Default) */
	.dropdown-content 
	{
		display: none;
		position: absolute;
		background-color: #f1f1f1;
		min-width: 270px;
		box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
		z-index: 1;
		text-align: center;
	}
	/* Links inside the dropdown */
	.dropdown-content a 
	{
		color: black;
		padding: 12px 16px;
		text-decoration: none;
		display: block;
	}
	/* Change color of dropdown links on hover */
	.dropdown-content a:hover 
	{
		background-color: #ddd
	}
	/* Show the dropdown menu (use JS to add this class to the .dropdown-content container when the user clicks on the dropdown button) */
	.show 
	{
		display:block;
	}	
    .info
	{
		width:100%;
		background-color:#103d8a;
		position: absolute;
	    top: 7.6%;
		padding: 10px;
        margin-left: 273px;
        height:45px;
        position: fixed;
	}
	.info p
	{
		color: white;
		font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
	    padding-left:5px;
		font-size:18px;
    }
    .container table
	{
            width:1630px;
            height: 100%;
			margin-top:230px;
			margin-left:-105px;
			background-color:white;
	}
	.table-bordered th, td
	{
			text-align: center;
    }
	th
	{
			height:50px;
	}
	thead th
	{
			padding-bottom:15px;
    }
    td .btn-primary
    {
        width:90px;      
    }
    td .btn-success
    {
        width:90px; 
    }
    .modal-body .table-bordered
    {
        margin-left:80px;
    }
    .modal-body
    {
        padding:20px;
    }
    /* .table tbody tr td
    {
        text-align:left;
    } */
    .container
    {
        width:100%;
    }
    .row table td
    {
        padding-bottom:15px;
        padding-left:15px;
        text-align: left;
    }
    .tr-dept td
    {
        padding-top:15px;
    }
    tr:hover
    {
        background-color: #f5f5f5;
    }
    table select
    {
        height:25px;
        width:200px;
    }
	</style>
</head>
<body>
        <nav class="navbar navbar-default navbar-fixed-top" class="col-lg-12 col-md-12 col-sm-12" style="background-color:#fffbfb; height:70px; padding:10px;">
                <div class="navbar-header">
                    <img src="icons/sky_luster.png" style="width:50px; height: 55px; ">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
                <label style="font-family: Times New Roman; font-size: 28px; padding-left:8px; padding-top:8px;">iMonitoring</label>
        
                <div class="collapse bs-example-navbar-collapse" id="bs-example-navbar-collapse-1"></div>
                    <ul class="nav navbar-nav navbar-right" style="padding-left:-50px; padding-right:20px; padding-top:5px;">
                        <li><a href="login.html"><img src="icons/Mail02-512.png" style="margin-left:-40px; margin-top:-16px; width:40px; height:40px;"></a></li> 
                        <li><a href="login.html"><img src="icons/notification-512.png" style="width:40px; margin-top:-15px; height:35px; margin-right:15px; padding-top:5px;"></a></li>
                        <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" href="contacts.html" style = "font-family: Century Gothic; padding-top: 7px; padding-left: 20px; color: black;"><i class="glyphicon glyphicon-user" style="font-size:25px;"></i> Jerry Chen<span class="glyphicon glyphicon-down"></span>
                            <span class="caret"></span></a>
                                <ul class="dropdown-menu" role="menu">
                                    <li style="font-size:18px; font-family: Century Gothic;" class="dropdown-header"><i class="glyphicon glyphicon-cog"></i><b> Settings</b></li>
                                    <li style="font-size:18px; padding:10px;"><a href="#">Account Settings</a></li>
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
                        <div class="modal-header" style="background-color:#16811430;">
                            <button type="button" class="close" class="btn btn-default" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div class="body">
                            <form>
                                <p style="padding: 20px 20px 10px 15px; font-size: 18px;">Are you sure you want to logout?</p>
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
                    <a href="admin_dashboard.html"><img src="icons/dashboard.png" alt="dashboard"> Dashboard</a>
                    <div class="dropdown">
                        <button onclick="myFunction()" class="dropbtn-active"><img class="complist" src="icons/computer.png" alt="computer list"> Computer List</button>
                        <div id="myDropdown" class="dropdown-content">
                          <a href="admin_viewing.html">Marvin 5th</a>
                          <a href="admin_viewing.html">Marvin 10th</a>
                          <a href="admin_viewing.html">B2B</a>
                        </div>
                      </div>
        
                    <a href="admin_users.html"><img src="icons/settings.png"> User Accounts</a>
                    <a href=""><img src="icons/reports.png" style="margin-right:40px;"> Reports</a>
                </div>
        <!-- End of Sidebar -->

        <script>
            function myFunction() 
            {
                    document.getElementById("myDropdown").classList.toggle("show");
                    // document.getElementById("showButton").classList.toggle("show");
            }
    
                    // Close the dropdown menu if the user clicks outside of it
             window.onclick = function(event) 
            {
                    if (!event.target.matches('.dropbtn-active')) 
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

        <div class="info">
            <p><strong>MARVIN 5TH | COMPUTER LIST</strong></p>
        </div>
        <div class="container-table" style="overflow:hidden;">
            <div class="row">
                    <table style="margin-left:287px; margin-top:110px; background-color: white; width:90%; padding:10px; margin-right:100px;">
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
                            <td><input type="text" name="search" style="width:400px;"></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <a href="#" style="padding-left:600px;"><u><i class="glyphicon glyphicon-export"> Export as Excel File</i></u></a>
                            </td>
                        </tr>
                    </table>
            </div>
            <div class="container">
                    <table class="table table-bordered" style="position: sticky; margin-left:257px; margin-top:0px; margin-bottom:10px;">
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
                                <td>Administator</td>
                                <td>
                                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModalView">View</button>
                                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#myModalEdit">Edit</button>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>ITOMAU03022</td>
                                <td>172.16.33.22</td>
                                <td>Windows PC</td>
                                <td>On-line</td>
                                <td>Administator</td>
                                <td>
                                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModalView">View</button>
                                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#myModalEdit">Edit</button>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>ITOMAU03022</td>
                                <td>172.16.33.22</td>
                                <td>Windows PC</td>
                                <td>On-line</td>
                                <td>Administator</td>
                                <td>
                                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModalView">View</button>
                                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#myModalEdit">Edit</button>
                                </td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>ITOMAU03022</td>
                                <td>172.16.33.22</td>
                                <td>Windows PC</td>
                                <td>On-line</td>
                                <td>Administator</td>
                                <td>
                                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModalView">View</button>
                                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#myModalEdit">Edit</button>
                                </td>
                            </tr>
                            <tr>
                                    <td>5</td>
                                    <td>ITOMAU03022</td>
                                    <td>172.16.33.22</td>
                                    <td>Windows PC</td>
                                    <td>On-line</td>
                                    <td>Administator</td>
                                    <td>
                                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModalView">View</button>
                                        <button type="button" class="btn btn-success" data-toggle="modal" data-target="#myModalEdit">Edit</button>
                                    </td>
                                </tr>
                            <tr>
                                <td>6</td>
                                <td>ITOMAU03022</td>
                                <td>172.16.33.22</td>
                                <td>Windows PC</td>
                                <td>On-line</td>
                                <td>Administator</td>
                                <td>
                                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModalView">View</button>
                                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#myModalEdit">Edit</button>
                                </td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td>ITOMAU03022</td>
                                <td>172.16.33.22</td>
                                <td>Windows PC</td>
                                <td>On-line</td>
                                <td>Administator</td>
                                <td>
                                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModalView">View</button>
                                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#myModalEdit">Edit</button>
                                </td>
                            </tr>
                            <tr>
                                <td>8</td>
                                <td>ITOMAU03022</td>
                                <td>172.16.33.22</td>
                                <td>Windows PC</td>
                                <td>On-line</td>
                                <td>Administator</td>
                                <td>
                                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModalView">View</button>
                                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#myModalEdit">Edit</button>
                                </td>
                            </tr>
                            <tr>
                                <td>9</td>
                                <td>ITOMAU03022</td>
                                <td>172.16.33.22</td>
                                <td>Windows PC</td>
                                <td>On-line</td>
                                <td>Administator</td>
                                <td>
                                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModalView">View</button>
                                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#myModalEdit">Edit</button>
                                </td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>ITOMAU03022</td>
                                <td>172.16.33.22</td>
                                <td>Windows PC</td>
                                <td>On-line</td>
                                <td>Administator</td>
                                <td>
                                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModalView">View</button>
                                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#myModalEdit">Edit</button>
                                </td>
                            </tr>
                            <tr>
                                <td>11</td>
                                <td>ITOMAU03022</td>
                                <td>172.16.33.22</td>
                                <td>Windows PC</td>
                                <td>On-line</td>
                                <td>Administator</td>
                                <td>
                                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModalView">View</button>
                                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#myModalEdit">Edit</button>
                                </td>
                            </tr>
                             <tr>
                                <td>12</td>
                                <td>ITOMAU03022</td>
                                <td>172.16.33.22</td>
                                <td>Windows PC</td>
                                <td>On-line</td>
                                <td>Administator</td>
                                <td>
                                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModalView">View</button>
                                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#myModalEdit">Edit</button>
                                </td>
                            </tr>
                            <tr>
                                <td>13</td>
                                <td>ITOMAU03022</td>
                                <td>172.16.33.22</td>
                                <td>Windows PC</td>
                                <td>On-line</td>
                                <td>Administator</td>
                                <td>
                                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModalView">View</button>
                                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#myModalEdit">Edit</button>
                                </td>
                            </tr>
                        </tbody>
                     </table>
                </div>
        </div>

        <div id="myModalView" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true" style="width:100%; margin-left:0px; margin-top:50px; position:absolute; overflow:hidden;">
                <div class="modal-dialog modal-md" style="position:fixed; width:100%; height:100%;">
                    <div class="modal-content" style="border:2px solid #3c7dcf; box-shadow:none;">
                        <div class="modal-header" style="background-color:#f5f5f5;">
                            <button type ="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 style="font-size:2em;">Log Records / Computer Details</h4>
                        </div>
                        <div class="modal-body" style="margin-left:-180px; width:97%; ">
                            <div class="panel panel-default" style="margin-left:200px; padding-right:-30px; width:100%">
                                <div class="panel-heading" style="padding:20px; font-size:18px;">Computer Logs</div>
                                <div class="panel-body" style="padding:10px; margin-left:-200px; width:100%">
                                    <div class="modal-container" style="margin: 10px; padding-left: 120px; margin-right: -80px;">
                                        <table class="table table-bordered" style="margin-left:90px;">
                                            <thead>
                                                <tr style="padding:50px;">
                                                    <th style="padding-bottom:15px;">User</th>
                                                    <th style="padding-bottom:15px;">Domain</th>
                                                    <th style="padding-bottom:15px;">Hostname</th>
                                                    <th style="padding-bottom:15px;">IP Address</th>
                                                    <th style="padding-bottom:15px;">IP Address Modified</th>
                                                    <th style="padding-bottom:15px;">Old IP Address</th>
                                                    <th style="padding-bottom:15px;">Old IP Address Modified</th>
                                                    <th style="padding-bottom:15px;">iMonitor Status</th>
                                                    <th style="padding-bottom:15px;">Services</th>
                                                    <th style="padding-bottom:15px;">SysSetting File</th>
                                                    <th style="padding-bottom:15px;">Branch</th>
                                                    <th style="padding-bottom:15px;">Scan Time</th>
                                                    <th style="padding-bottom:15px;">Connection Status</th>
                                                </tr>
                                             </thead>
                                            <tbody>
                                                <tr>
                                                    <td style="padding-top:15px;">Camille</td>
                                                    <td style="padding-top:15px;">NN</td>
                                                    <td style="padding-top:15px;">ITOMAU033022</td>
                                                    <td style="padding-top:15px;">172.16.33.22</td>
                                                    <td style="padding-top:15px;">Aug-08-2018 02:00</td>
                                                    <td style="padding-top:15px;"></td>
                                                    <td style="padding-top:15px;"></td>
                                                    <td style="padding-top:15px;">Running</td>
                                                    <td style="padding-top:15px;">Msysys.exe<br>Mskes.exe</td>
                                                    <td style="padding-top:15px;">Found</td>
                                                    <td style="padding-top:15px;">Marvin(IT)</td>
                                                    <td style="padding-top:15px;">Aug-08-2018 02:00</td>
                                                    <td style="padding-top:15px;"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default" style="margin-left:200px; width:90%">
                                <div class="panel-heading" style="padding:20px; font-size:18px;">Computer Details</div>
                                <div class="panel-body" style="padding:20px; margin-left:-200px; width:100%">
                                    <div class="modal-container" style="margin: 10px; padding-left: 110px; padding-right: 50px;">
                                        <table class="table table-bordered" style="margin-left:90px;">
                                            <thead>
                                                <tr style="padding:50px;">
                                                    <th style="padding-bottom:15px;">Hostname</th>
                                                    <th style="padding-bottom:15px;">Processor</th>
                                                    <th style="padding-bottom:15px;">HDD Serial</th>
                                                    <th style="padding-bottom:15px;">MAC Address</th>
                                                    <th style="padding-bottom:15px;">Motherboard Manufacturer</th>
                                                    <th style="padding-bottom:15px;">Motherboard product</th>
                                                    <th style="padding-bottom:15px;">Scan time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style="padding:15px;">ITOMAU033022</td>
                                                    <td style="padding:15px;">Intel(R) Core(TM) i5-6400</td>
                                                    <td style="padding:15px;"></td>
                                                    <td style="padding:15px;">2C-FD-A1-74-0E-9C</td>
                                                    <td style="padding:15px;"></td>
                                                    <td style="padding:15px;"></td>
                                                    <td style="padding:15px;">Aug-08-2018 02:00</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>

                    </div>   
                </div>
        </div>
	<script src="Bootstrap/js/jquery.min.js"></script>
	<script src="Bootstrap/js/bootstrap.min.js"></script>
	
</body>
</html>

