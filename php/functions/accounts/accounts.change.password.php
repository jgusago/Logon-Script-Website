<?php
header("Content-Type: application/json; charset=UTF-8");
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
require "{$_SERVER['DOCUMENT_ROOT']}/php/functions/session/session.check.php";

$obj = json_decode($_POST["x"], false);
if($ssrole == "ADMINISTRATOR" || $ssrole == "SUPER ADMIN"){
  if($obj->newpass == $obj->conpass){
    $password = md5(sha1($obj->newpass));
    $query = $conn->prepare("
    UPDATE logonscript.tbl_user SET password = ? WHERE (userid = ?);
    ");
    $query->bind_param("ss",$password,$obj->id);
    if($query->execute()){
      echo "success";
    }
    else{
      echo "failed";
    }
  }
  else{
    echo "failed";
  }
}
else{
  echo "failed";
}
 ?>
