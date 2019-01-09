<?php
//oldpassword:old_password,newpassword:password,confpassword:confirm_password
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
$oldpassword = md5(sha1($_POST["oldpassword"]));
$newpassword = md5(sha1($_POST["newpassword"]));
$conpassword = md5(sha1( $_POST["confpassword"]));

session_start();

$id = $_SESSION["userid"];
$query = "SELECT * FROM logonscript.tbl_user WHERE userid = $id";
foreach ($db->query($query) as $row) {
  $confirm = $row['password'];
}

if($confirm == $oldpassword){
  if($newpassword == $conpassword){
    $query = "UPDATE logonscript.tbl_user SET password = '$newpassword' WHERE userid = $id";
    if($db->query($query))
    {
      $query2 = "INSERT INTO logonscript.tbl_history (transact_name, transact_details,  user_id) VALUES ('Change password','Password: ********', '$id')";
      $db->query($query2);
      
      echo "success";
    }
    else{
      echo "Something went wrong";
    }
  }
  else{
    echo "New Password and Confirm password doesn't match";
  }
}
else{
  echo "Your current password is wrong";
}

 ?>
