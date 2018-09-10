<?php 
session_start();
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
$ID=$_GET['id'];
?>

<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>SKYLUSTER</title>
    <link href="../css/user_account_style.css" rel="stylesheet" type="text/css" />
  
  </head>
  <body>
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
              //echo "<p align='center' class='error'>All fields are required.</p>";        
              //echo '<script language="javascript">';
              //echo 'alert("All fields are required.")';
              //echo '</script>';       
            }
          ?>
    </div>  

        <?php
		      $stmt = $db->query("SELECT * FROM tbl_user WHERE id='$ID'");
		      $stmt->execute();
		      for($i=0; $row = $stmt->fetch(); $i++){
		      $id=$row['id'];
	      ?>

      <form action="user_edit_account_submit.php <?php echo '?id='.$id; ?>" method="POST">
        <label for="username">Username:</label><br>
        <input type="text" id="username" name="username" value="<?php echo $row['username']; ?>" required placeholder="Username"><br>
        <label for="password">Password:</label><br>
        <input type="password" id="password" name="password" value="<?php echo $row['password']; ?>" required placeholder="Password"><br>
        <!--<label for="retypepassword">Re-type Password:</label><br>
        <input type="password" onblur="myFunction()" id="repassword" name="repassword" value="<?php //if (!empty($_POST["username"])) { echo $_POST["username"]; } else { echo ''; };  ?>" required placeholder="Password"><br>-->
        
        <label for="role">Account Type:</label><br>
            <select id="role" name="accounttype">

                          <?php     
              									$sql = "select account_type from sys_user WHERE id='$id'";
              									$stmt = $db->prepare($sql);
              									$stmt->execute();

              									while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                								echo '<option>'.$row['account_type'].'</option>'; 
              									}
            							?>

											    <?php     
              									$sql = "select account_type from sys_account_type";
              									$stmt = $db->prepare($sql);
              									$stmt->execute();

              									while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                								echo '<option>'.$row['account_type'].'</option>'; 
              									}
            							?>
					  </select><br>
        <input class="submit" type="submit" value="Create Account">
      </form>
      <?php } ?>                                                   
    </div>                                  
    </div>           
    <div class="footer">
    </div>
    </div>
  </body>
</html>
