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
    <link href="test.css" rel="stylesheet" type="text/css" />
  
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
        <input type="text" id="userid" name="userid" value="<?php echo $row['userid']; ?>" required placeholder="Used ID"><br>
        <label for="username">Name:</label><br>
        <input type="text" id="name" name="name" value="<?php echo $row['name']; ?>" required placeholder="Name"><br>
        <label for="password">Password:</label><br>
        <input type="password" id="password" name="password" value="<?php echo $row['password']; ?>" required placeholder="Password"><br>
        <label for="department">Department:</label><br>
            <select id="department" name="department">

                          <?php     
              									$sql = "select department from tbl_user WHERE id='$id'";
              									$stmt = $db->prepare($sql);
              									$stmt->execute();

              									while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                								echo '<option>'.$row['department'].'</option>'; 
              									}
            							?>

											    <?php     
              									$sql = "select department from tbl_department";
              									$stmt = $db->prepare($sql);
              									$stmt->execute();

              									while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                								echo '<option>'.$row['department'].'</option>'; 
              									}
            							?>
					  </select><br>

          <label for="role">Position:</label><br>
              <select id="position" name="position">

                          <?php     
              									$sql = "select position from tbl_user WHERE id='$id'";
              									$stmt = $db->prepare($sql);
              									$stmt->execute();

              									while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                								echo '<option>'.$row['position'].'</option>'; 
              									}
            							?>

											    <?php     
              									$sql = "select position from tbl_position";
              									$stmt = $db->prepare($sql);
              									$stmt->execute();

              									while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                								echo '<option>'.$row['position'].'</option>'; 
              									}
            							?>
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

											    <?php     
              									$sql = "select role from tbl_role";
              									$stmt = $db->prepare($sql);
              									$stmt->execute();

              									while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                								echo '<option>'.$row['role'].'</option>'; 
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
