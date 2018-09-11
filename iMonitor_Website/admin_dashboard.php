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
    <!-- Our Custom CSS -->
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="styleIndex.css">
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
<<<<<<< HEAD
                    <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="glyphicon glyphicon-user"></i>
=======
	            	<a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="glyphicon glyphicon-user"></i>
>>>>>>> b1d9e493d856ef0c5a6bc10e712780045d7f849c
                    
                    <?php
                        $query = $db->prepare("SELECT name FROM tbl_user WHERE username=:username");
                        $query->bindValue(':username', $_SESSION['username'], PDO::PARAM_STR);
                        $query->execute();
                        $query->setFetchMode(PDO::FETCH_ASSOC);
         
                        while ($row = $query->fetch()) {
                        echo 'Welcome: ' . $row['name'];
                        }
                    ?>
<<<<<<< HEAD
                    
=======

>>>>>>> b1d9e493d856ef0c5a6bc10e712780045d7f849c
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
		        <li class="active">
		            <a href="#"><i class="glyphicon glyphicon-th-large" ></i> Dashboard</a>
		        </li>
		        <li>
		            <a href="#"><i class="glyphicon glyphicon-home"></i>Branch Settings</a>
		        </li>
		        <li >
		            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false"><i class="glyphicon glyphicon-list-alt"></i>Computer List</a>
		            <ul class="collapse list-unstyled" id="homeSubmenu">
		                <li><a href="admin_viewing.html">Marvin 5th</a></li>
		                <li><a href="admin_viewing.html">Marvin 10th</a></li>
		                <li><a href="admin_viewing.html">COP</a></li>
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
	</div>               
	<!-- End of Sidebar -->

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

</script>

	
</body>
</html>

