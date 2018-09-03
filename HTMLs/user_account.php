<?php 
include("../config/db_connection.php");
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
        <h3><p>Create User Account</p></h3>
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
           else
            {
              //echo "<p align='center' class='correct'>Data save successfully.</p>"; 
              //echo '<script language="javascript">';
              //echo 'alert("Data save successfully.")';
              //echo '</script>'; 
            }
          ?>
    </div>  
      <form action="user_account_submit.php" method="POST">
        <label for="username">Username:</label><br>
        <input type="text" id="username" name="username" value="<?php if (!empty($_POST["username"])) { echo $_POST["username"]; } else { echo ''; };  ?>" required placeholder="Username"><br>
        <label for="password">Password:</label><br>
        <input type="password" id="password" name="password" value="<?php if (!empty($_POST["username"])) { echo $_POST["username"]; } else { echo ''; };  ?>" required placeholder="Password"><br>
        <label for="retypepassword">Re-type Password:</label><br>
        <input type="password" onblur="myFunction()" id="repassword" name="repassword" value="<?php if (!empty($_POST["username"])) { echo $_POST["username"]; } else { echo ''; };  ?>" required placeholder="Password"><br>
        
        <script>
          function myFunction() {
            var a = document.getElementById("password").value;
            var b = document.getElementById("repassword").value;
            if (a!=b) {
               alert("Passwords do no match");
               return false;
            }
        }
        </script>
        
        
        <label for="firstname">Firstname:</label><br>
        <input type="text" id="firstname" name="firstname" value="<?php if (!empty($_POST["username"])) { echo $_POST["username"]; } else { echo ''; };  ?>" required placeholder="Firstname"><br>
        <label for="middlename">Middlename:</label><br>
        <input type="text" id="middlename" name="middlename" value="<?php if (!empty($_POST["username"])) { echo $_POST["username"]; } else { echo ''; };  ?>" required placeholder="Middlename"><br>
        <label for="lastname">Lastname:</label><br>
        <input type="text" id="lastname" name="lastname" value="<?php if (!empty($_POST["username"])) { echo $_POST["username"]; } else { echo ''; };  ?>" required placeholder="Lastname"><br>
        
        
        <label for="company">Company:</label><br>
        <select id="company" name="company" value="<?php if (!empty($_POST["company_name"])) { echo $_POST["company_name"]; } else { echo ''; };  ?>" required>
            <option></option>
            <?php     
              $sql = "select company_name from sys_company";
              $stmt = $db->prepare($sql);
              $stmt->execute();

              while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                echo '<option>'.$row['company_name'].'</option>'; 
              }
            ?>
        </select><br>

        <label for="company">Department:</label><br> 
        <select id="department" name="department" value="<?php if (!empty($_POST["department_name"])) { echo $_POST["department_name"]; } else { echo ''; };  ?>" required>
            <option></option>
            <?php     
              $sql = "select department_name from sys_department";
              $stmt = $db->prepare($sql);
              $stmt->execute();

              while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
              echo '<option>'.$row['department_name'].'</option>'; 
              }
            ?>    
        </select><br> 

        <label for="company">Account Type:</label><br>
        <select id="accounttype" name="accounttype" value="<?php if (!empty($_POST["account_type"])) { echo $_POST["account_type"]; } else { echo ''; };  ?>" required>
          <option></option>
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
    </div>                                  
    </div>           
    <div class="footer">
    </div>
    </div>
  </body>
</html>
