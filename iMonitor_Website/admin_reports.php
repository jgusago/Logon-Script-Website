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
		<nav id="sidebar" style="margin-top:30px;">
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
    <div class="info" style="margin-left:250px; margin-top:-10px;">
        <p><strong>Reports</strong></p>
    </div>
    </div>
    <div class="panel with-nav-tabs panel-default" style="width: 89.5%; position: relative; margin-top: -890px; margin-left: 252px;">
        <div class="panel-heading">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#tab0default" data-toggle="tab" style="padding-right:35px;">Computer Logs</a></li>
                <li><a href="#tab2default" data-toggle="tab" style="padding-right:35px;">Computer List</a></li>
            </ul>
        </div>
        <div class="panel-body">
            <div class="tab-content">
                <div class="tab-pane fade in active" id="tab0default">
                    <div class="pane pane--table1" style="padding-right: 55px;">
                        <div class="col-md-3">
                            <input type="text" id="from_date" name="from_date" class="form-control" placeholder="From Date"> 
                        </div>
                        <div class="col-md-3">
                            <input type="text" id="to_date" name="to_date" class="form-control" placeholder="To Date"> 
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
                                    <input type="text" id="user" name="user" class="form-control" placeholder="Search for user... ">
                        </div>
                        <div class="col-md-4">
                            <br>
                            <input type="button" id="reset" name="clear" value="Clear" class="btn btn-default">
                            <input type="button" name="btn_filter" id=btn_filter value="Filter" class="btn btn-success" onclick="">
                            <input type="button" name="btn_search" id=btn_search value="Search" class="btn btn-danger" onclick="">
                        </div>
                        <div style="clear:both; padding:15px;">
                            <table class="table table-bordered" id="comp_logs">
                            <thead>
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
                                    <th>Server IP</th>
                                    <th>Connection Status</th>
                                    <th>Branch</th>
                                    <th>Scan Time</th>
                                </tr>
                                </thead>
                                <tbody id = "load_data">
                                    <?php
                                       $sql = "select user, domain_name, hostname, ip_address, ip_date_modified, old_ip_address, old_ip_modified, 
                                       iMonitor_Status, services, sysSetting_File, serverIP, connection_status, branch, scan_time from tbl_log 
                                       WHERE user != 'Administrator' ";
                                       $stmt = $db->prepare($sql);
                                       $stmt->execute();
                                       $count = 1;
                                       foreach($stmt as $row) {
                                       //while($row=$stmt->fetch(PDO::FETCH_ASSOC)) {
	            	                 ?>
                                <tr> 
                                    <td><?php echo $count++ ?></td>
                                    <td><?php echo $row['user']; ?></td>
                                    <td><?php echo $row['domain_name']; ?></td>
                                    <td><?php echo $row['hostname']; ?></td>
                                    <td><?php echo $row['ip_address']; ?></td>
                                    <td><?php echo $row['ip_date_modified']; ?></td>
                                    <td><?php echo $row['old_ip_address']; ?></td>
                                    <td><?php echo $row['old_ip_modified']; ?></td>
                                    <td><?php echo $row['iMonitor_Status']; ?></td>
                                    <td><?php echo $row['services']; ?></td>
                                    <td><?php echo $row['sysSetting_File']; ?></td>
                                    <td><?php echo $row['serverIP']; ?></td>
                                    <td><?php echo $row['connection_status']?></td>
                                    <td><?php echo $row['branch']; ?></td>
                                    <td><?php echo $row['scan_time']; ?></td>
                                </tr>
                                <?php } ?>
                                </tbody>
                            </table>
                        </div>
                    </div>  
                </div>
                <div class="tab-pane fade" id="tab2default">
                    <div class="pane pane--table1" style="padding-right: 55px;">
                        <div class="col-md-3">
                            <input type="text" id="from_date2" name="from_date" class="form-control" placeholder="From Date"> 
                        </div>
                        <div class="col-md-3">
                            <input type="text" id="to_date2" name="to_date" class="form-control" placeholder="To Date"> 
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
                        <div class="col-md-4"><br>
                            <input type="text" id="user" name="user" class="form-control" placeholder="Search for user... ">
                        </div>
                        <div class="col-md-4"><br>
                            <select name="sub_status" id="sub_status" class="form-control">
                                <option value="" selected>--Status--</option>
                                <option value="OM">Active</option>
                                <option value="AUD">Inactive</option>
                            </select>
                        </div>
                        <div class="col-md-4">
                            <br>
                            <input type="button" name="clear" id="clear" value="Clear" class="btn btn-default">
                            <input type="button" name="Excel" id="Excel" value="Excel" class="btn btn-success" onclick="">
                            <input type="button" name="btn_search" id="btn_search" value="Search" class="btn btn-danger" onclick="">
                        </div>
                        <div style="clear:both; padding:15px;">
                            <table class="table table-bordered" id="comp_logs">
                                <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Computer Name</th>
                                    <th>IP Address</th>
                                    <th>Status</th>
                                    <th>Port Connection</th>
                                    <th>Remarks</th>
                                </tr>
                                <thead>
                                <tbody id = "load_data">
                                <?php
		            	               $sql = "select user,hostname, ip_address,iMonitor_Status,connection_status from tbl_log WHERE user != 'Administrator' ";
                                       $stmt = $db->prepare($sql);
                                       $stmt->execute();
                                       $count = 1;
                                       foreach($stmt as $row) {
                                       //while($row=$stmt->fetch(PDO::FETCH_ASSOC)) {
	            	                 ?>
                                <tr>
                                    <td><?php echo $count++ ?></td>
                                    <td><?php echo $row['hostname']; ?></td>
                                    <td><?php echo $row['ip_address']; ?></td>
                                    <td><?php echo $row['iMonitor_Status']; ?></td>
                                    <td><?php echo $row['connection_status']; ?></td>
                                    <td><?php
                                        if($row['iMonitor_Status'] == 'Running' AND $row['connection_status'] == 'ESTABLISHED')
                                            echo 'Active';
                                        else
                                            echo "Inactive";
                                    ?></td>
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
        

    </script>

    <script src = "../js/controller/report_ajax.js"></script>
    <script src = "ajax_byname.js"></script>
<!-- <script>
    function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*An array containing all the country names in the world:*/
var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("user"), countries);
</script> -->
</body>
</html>
    


