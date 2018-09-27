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
?>

<!DOCTYPE html>
<html>
  <head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="refresh" content="300">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script> 
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <title>Imonitor Website</title>
    <link href="test.css" rel="stylesheet" type="text/css" />
  
  </head>
  <body onload="populateSecondTextBox();">
    <div class="container">
    <div class="banner">
    </div>
    
    <div class="mainbody">
      
    <div class="content">
      <center>
        <h3><p>Edit User Account</p></h3>
      </center>  
      <div>
          <?php
           if(isset($_GET['msg']))
            {       
              echo "<p align='center' class='correct'>Data save successfully.</p>";
            }
          ?>
    </div>  

        <?php
		      $stmt = $db->query("SELECT id, userid, name, department, position, status, role, status FROM tbl_user WHERE id='$ID'");
		      $stmt->execute();
		      for($i=0; $row = $stmt->fetch(); $i++){
		      $id=$row['id'];
	      ?>

										<script type="text/javascript">
											function isNumberKey(evt){
											var charCode = (evt.which) ? evt.which : evt.keyCode;
    										if (charCode > 31 && (charCode < 48 || charCode > 57))
        									return false;
    										return true;
											}
										</script>

										<script type="text/javascript">
        									function numberOnly(txt, e) {
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

      <form action="../php/connection/user_edit_account_submit.php <?php echo '?id='.$id; ?>" method="POST">
	    <input type="hidden" id="password2" name="password2"></td>
		<input type="hidden" id="userid2" name="userid2"></td>
        <label for="username">Username:</label><br>
        <input type="text" id="userid" pattern="[0-9]+" name="userid" value="<?php echo $row['userid']; ?>" required placeholder="Used ID" onkeypress="return isNumberKey(event)"/><br>
        <label for="username">Name:</label><br>
        <input type="text" id="name" name="name" value="<?php echo $row['name']; ?>" required placeholder="Name" onkeypress="return numberOnly(this, event)" maxlength="30"/><br>
        <label for="password">Password:</label><br>
        <input type="text" id="password" name="password" value="Aa123456" disabled><br>
        <label for="department">Department:</label><br>
            			<select id="department" name="department">

                          				<?php     
              								$sql = "select branch_name from tbl_department";
              								$stmt = $db->prepare($sql);
              								$stmt->execute();

              								while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                							echo '<option>'.$row['branch_name'].'</option>'; 
              								}
            							?>
										
					  	</select><br>

          	<label for="role">Position:</label><br>
             			<select id="position" name="position">

                          				

					  	</select><br>           
        	<label for="role">Role:</label><br>
            	<select id="role" name="role">
										<?php     
              								$sql = "select role from tbl_user WHERE id='$id'";
              								$stmt = $db->prepare($sql);
              								$stmt->execute();

              								while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                							echo '<option>'.$row['role'].'</option>'; 
              								}
            							?>
							<option>Admin</option>
							<option>Staff</option>
					  </select><br>
			<label for="status">Status:</label><br>
            			<select id="status" name="status">
										<?php     
              								$sql = "select status from tbl_user WHERE id='$id'";
              								$stmt = $db->prepare($sql);
              								$stmt->execute();

              								while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                							echo '<option>'.$row['status'].'</option>'; 
              								}
            							?>
							<option>Active</option>
							<option>Inactive</option>
					  	</select><br>
        <input class="submit" type="submit" value="Update">
      </form>
      <?php } ?>      

	  <script type="text/javascript">
						function populateSecondTextBox() {
   						document.getElementById('password2').value = document.getElementById('password').value;
						document.getElementById('userid2').value = document.getElementById('userid').value;
						}
					</script>                                             
    </div>                                  
    </div>           
    <div class="footer">
    </div>
	</div>
	
<!-- FOR SUB DEPARTMENT -->

<script type="text/javascript">
	$("#department").change(function() {
  	$("#position").load("get_sub_department.php?branch_name=" + $("#department").val());
	});
</script>

<!-- END -->

  </body>
</html>
