<?php
  $username = $_POST["username"];
  $password = $_POST["password"];
  //$enc = md5(sha1($password));
  
if (isset($_POST["userid"]) && isset($_POST["password"])){

  require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

  $stmt = $db->prepare("SELECT * FROM logonscript.tbl_user WHERE userid like :userid");
  $stmt->bindValue(':username', $username);
  $stmt->execute();
  $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

  if (count($row) > 0) {
    $hashed_password = $row[0]['password'];
    $status = $row[0]['status'];
    $role = $row[0]['role'];
    $name = $row[0]['name'];
    $department = $row[0]['department'];
      //check status

      //if($encrypt_password == $enc && $status == "Active") {
        if(($status == 'Active') && (password_verify($password, $hashed_password))) {
        session_start();
        $_SESSION["userid"] = $row[0]['userid'];
        $_SESSION["role"] = $role;
        $_SESSION["status"] = $status;
        $_SESSION["name"] = $name;
        $_SESSION["department"] = $department;
          //ROLE
          if($role == "ADMINISTRATOR"){
            echo "success:admin";
          }
          else if($role == "SUPER ADMIN"){
            echo "success:superadmin";
          }
          else{
            echo "success:user";
          }
          //ROLE
      }
      elseif($status == "Inactive"){
        echo "failed:inactive";
      }
      else{
        echo "failed:password";
      }
      //check status

  }//second if
  else{
    echo "failed:user";
  }
}//first if
else{
  echo "failed:unkown";
}

$stmt = null;
?>
